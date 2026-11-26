import {APPROVED_LIGHTING} from "./lighting-presets.js";

// Start a new draft after the user's chosen lighting is made the default.
const STORAGE_KEY = "sartexo-lighting-approved-20261126-v1";

const radians = degrees => degrees * Math.PI / 180;

function lightPosition(settings) {
  const azimuth = radians(settings.azimuth);
  const elevation = radians(settings.elevation);
  return [
    Math.sin(azimuth) * Math.cos(elevation),
    Math.sin(elevation),
    Math.cos(azimuth) * Math.cos(elevation)
  ].map(value => value * settings.distance);
}

// A neutral, high-dynamic-range softbox environment. Export this same HDR for
// offline rendering so the selected illumination need not be approximated.
export function studioHDR(settings, width = 256, height = 128) {
  const key = lightPosition(settings).map(value => value / settings.distance);
  const sigma = Math.atan(settings.size / (2 * settings.distance));
  const referenceArea = 1 - Math.cos(Math.atan(4 / 6));
  const radiance = settings.strength * (9 / settings.distance ** 2)
    * referenceArea / (1 - Math.cos(sigma));
  const header = new TextEncoder().encode(
    `#?RADIANCE\n# SARTEXO soft studio v1\nFORMAT=32-bit_rle_rgbe\n\n-Y ${height} +X ${width}\n`
  );
  const rowSize = 4 + 4 * (width + Math.ceil(width / 128));
  const bytes = new Uint8Array(header.length + height * rowSize);
  bytes.set(header);
  let offset = header.length;
  const mantissas = new Uint8Array(width);
  const exponents = new Uint8Array(width);
  for (let y = 0; y < height; y++) {
    const latitude = Math.PI * (0.5 - (y + 0.5) / height);
    const vertical = Math.sin(latitude);
    const horizontal = Math.cos(latitude);
    for (let x = 0; x < width; x++) {
      const longitude = 2 * Math.PI * ((x + 0.5) / width - 0.5);
      const dot = horizontal * Math.cos(longitude) * key[0]
        + vertical * key[1] + horizontal * Math.sin(longitude) * key[2];
      const angle = Math.acos(Math.max(-1, Math.min(1, dot)));
      const ambient = settings.fill * (0.8 + 0.2 * vertical);
      const value = ambient + radiance * Math.exp(-0.5 * (angle / sigma) ** 2);
      if (value < 1e-20) {
        mantissas[x] = 0;
        exponents[x] = 0;
      } else {
        const exponent = Math.floor(Math.log2(value)) + 1;
        mantissas[x] = Math.min(255, Math.floor(value * 2 ** (8 - exponent)));
        exponents[x] = exponent + 128;
      }
    }
    bytes.set([2, 2, width >> 8, width & 255], offset);
    offset += 4;
    for (let channel = 0; channel < 4; channel++) {
      const values = channel === 3 ? exponents : mantissas;
      for (let x = 0; x < width; x += 128) {
        const count = Math.min(128, width - x);
        bytes[offset++] = count;
        bytes.set(values.subarray(x, x + count), offset);
        offset += count;
      }
    }
  }
  return new Blob([bytes], {type: "application/octet-stream"});
}

function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

export function createLightingTool(viewer, designs, getSelectedDesign) {
  const inputs = [...document.querySelectorAll("[data-light]")];
  const status = document.querySelector("#lighting-status");
  const exportField = document.querySelector("#lighting-export");
  let saved = {};
  try {
    saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {};
  } catch {
    // Browser storage is optional; copying/downloading remains available.
  }
  const settings = Object.fromEntries(Object.keys(designs).map(code => {
    const values = {...APPROVED_LIGHTING[code]};
    for (const input of inputs) {
      const value = saved[code]?.[input.dataset.light];
      if (typeof value === "number" && Number.isFinite(value)) {
        values[input.dataset.light] = Math.max(Number(input.min), Math.min(Number(input.max), value));
      }
    }
    return [code, values];
  }));
  let activeDesign;
  let environmentTimer;
  let ready = false;
  let environmentURL;
  const retiredURLs = new Set();

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      status.textContent = "Use Copy or Download to keep your settings; browser storage is unavailable.";
    }
  }

  function display() {
    const values = settings[getSelectedDesign()];
    for (const input of inputs) {
      const name = input.dataset.light;
      input.value = values[name];
      const suffix = ["azimuth", "elevation"].includes(name) ? "°"
        : ["distance", "size"].includes(name) ? "× height" : "";
      const number = Number(input.step) >= 1 ? values[name].toFixed(0) : values[name].toFixed(2);
      document.querySelector(`[data-light-output="${name}"]`).value = `${number}${suffix ? ` ${suffix}` : ""}`;
    }
    const [x, y, z] = lightPosition(values).map(value => value.toFixed(2));
    document.querySelector("#lighting-position").textContent =
      `${designs[getSelectedDesign()].label} · Light position: X ${x}, Y ${y}, Z ${z} (model heights). `
      + "Distance controls light falloff and apparent size in the environment; the ground uses a soft contact shadow.";
  }

  function updateEnvironment() {
    clearTimeout(environmentTimer);
    if (!ready) return;
    const code = getSelectedDesign();
    const values = settings[code];
    const approved = APPROVED_LIGHTING[code];
    const matchesApproved = ["azimuth", "elevation", "distance", "size", "strength", "fill"]
      .every(key => values[key] === approved[key]);
    if (matchesApproved) {
      if (environmentURL) retiredURLs.add(environmentURL);
      environmentURL = null;
      viewer.environmentImage = `assets/lighting/${code}-studio.hdr`;
      return;
    }
    // The .hdr fragment selects model-viewer's HDR loader for this local Blob.
    const nextURL = URL.createObjectURL(studioHDR(values));
    if (environmentURL) retiredURLs.add(environmentURL);
    environmentURL = nextURL;
    viewer.environmentImage = `${nextURL}#studio.hdr`;
  }

  function apply(immediate = false, environmentChanged = true) {
    const values = settings[getSelectedDesign()];
    if (ready) {
      viewer.exposure = values.exposure;
      viewer.shadowIntensity = values.shadow;
      viewer.shadowSoftness = 1;
    }
    if (!environmentChanged) return;
    clearTimeout(environmentTimer);
    if (immediate) updateEnvironment();
    else environmentTimer = setTimeout(updateEnvironment, 250);
  }

  function exportSettings() {
    return JSON.stringify({
      schema: "sartexo-lighting-studio-v1",
      environment: "Neutral Gaussian softbox, studioHDR in dist/lighting.js",
      coordinates: "Y up; +Z front; +X right; azimuth 0 front, +90 right; distances in model heights",
      renderer: {toneMapping: "neutral", shadowSoftness: 1},
      designs: Object.fromEntries(Object.entries(settings).map(([code, values]) => [
        designs[code].label,
        {...values, positionInModelHeights: lightPosition(values)}
      ]))
    }, null, 2);
  }

  inputs.forEach(input => {
    input.addEventListener("input", () => {
      settings[getSelectedDesign()][input.dataset.light] = Number(input.value);
      exportField.hidden = true;
      status.textContent = "Settings saved for this design in this browser.";
      display();
      apply(false, !["exposure", "shadow"].includes(input.dataset.light));
      persist();
    });
    if (!["exposure", "shadow"].includes(input.dataset.light)) {
      input.addEventListener("change", updateEnvironment);
    }
  });

  viewer.addEventListener("environment-change", () => {
    // The loader has finished reading prior Blob URLs. The active environment
    // remains alive, and its HDR can also be downloaded directly from settings.
    retiredURLs.forEach(url => URL.revokeObjectURL(url));
    retiredURLs.clear();
  });

  document.querySelector("#lighting-copy").addEventListener("click", async () => {
    const value = exportSettings();
    try {
      await navigator.clipboard.writeText(value);
      status.textContent = "Copied all three designs. Paste the settings into the chat when ready.";
    } catch {
      exportField.value = value;
      exportField.hidden = false;
      exportField.focus();
      exportField.select();
      status.textContent = "Copy the selected settings below and paste them into the chat.";
    }
  });
  document.querySelector("#lighting-download").addEventListener("click", () => {
    download(new Blob([exportSettings()], {type: "application/json"}), "exosuit-lighting-settings.json");
    status.textContent = "Downloaded the lighting settings for all three designs.";
  });
  document.querySelector("#lighting-hdr").addEventListener("click", () => {
    const code = getSelectedDesign();
    download(studioHDR(settings[code], 512, 256), `${designs[code].label.toLowerCase().replaceAll(" ", "-")}-studio.hdr`);
    status.textContent = "Downloaded this design's HDR environment for rendering. Keep the settings JSON as well.";
  });
  document.querySelector("#lighting-reset").addEventListener("click", () => {
    settings[getSelectedDesign()] = {...APPROVED_LIGHTING[getSelectedDesign()]};
    display();
    apply(true);
    persist();
    exportField.hidden = true;
    status.textContent = "Restored your approved lighting for this design.";
  });

  customElements.whenDefined("model-viewer").then(() => {
    ready = true;
    apply(true);
  });

  return {
    selectDesign() {
      const code = getSelectedDesign();
      if (activeDesign === code) return;
      activeDesign = code;
      display();
      apply(true);
      exportField.hidden = true;
      status.textContent = "Adjust the sliders, then copy or download your chosen settings.";
    }
  };
}
