import {designs} from "./designs.js";
import {createLightingTool} from "./lighting.js";
import {updateStudyNotes} from "./study.js";
import {equipmentViews} from "./equipment-views.js";

const viewer = document.querySelector("#model-viewer");
const designTabs = [...document.querySelectorAll("[data-design]")];
const modelVariantButtons = [...document.querySelectorAll("[data-model-variant]")];
const topicButtons = [...document.querySelectorAll(".detail-button")];
const viewButtons = [...document.querySelectorAll("[data-view]")];
const hotspots = [...document.querySelectorAll(".hotspot")];
const loadingOverlay = document.querySelector("#loading-overlay");
const loadError = document.querySelector("#load-error");
const referenceDialog = document.querySelector("#reference-dialog");
const aboutDialog = document.querySelector("#about-dialog");
const fullscreenButton = document.querySelector("#fullscreen-button");
const zoomToggle = document.querySelector("#zoom-toggle");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const narrowViewport = window.matchMedia("(max-width: 800px)");

let selectedDesign = "B";
let selectedModelVariant = "with-body";
let selectedTopic = "overview";
let selectedView = "overview";
let referenceView = "front-rear";
let loadingTimer;
let cameraLimitTimer;
const lightingTool = createLightingTool(viewer, designs, () => selectedDesign);

function setText(selector, text) {
  document.querySelector(selector).textContent = text;
}

function activeModel() {
  const design = designs[selectedDesign];
  return selectedModelVariant === "with-body" ? design.model : design.equipmentModel;
}

function updateZoomEnabled() {
  viewer.toggleAttribute("disable-zoom", !zoomToggle.checked);
  document.querySelectorAll("[data-zoom-hint]").forEach(hint => {
    hint.hidden = !zoomToggle.checked;
  });
}

function updatePanel() {
  const design = designs[selectedDesign];
  lightingTool.selectDesign();
  updateStudyNotes(selectedDesign, design);
  const topic = design.topics[selectedTopic];
  const rootStyle = document.documentElement.style;
  rootStyle.setProperty("--accent", design.theme.accent);
  rootStyle.setProperty("--accent-dark", design.theme.dark);
  rootStyle.setProperty("--accent-soft", design.theme.soft);
  document.body.dataset.design = selectedDesign;
  document.body.dataset.topic = selectedTopic;
  document.querySelector("#design-panel").setAttribute("aria-labelledby", `tab-${selectedDesign}`);
  setText("#detail-eyebrow", `${design.number} · ${design.label}`);
  const heading = document.querySelector("#detail-title");
  heading.replaceChildren();
  topic.title.forEach((line, index) => {
    if (index) heading.append(document.createTextNode(" "), document.createElement("br"));
    heading.append(document.createTextNode(line));
  });
  setText("#detail-description", topic.description);
  setText("#principle-title", selectedTopic === "overview" ? "Design principle" : "Design intent");
  setText("#principle-description", topic.principle);
  setText("#context-title", topic.contextTitle);
  setText("#context-description", topic.context);
  const thumbnail = document.querySelector("#reference-thumbnail");
  thumbnail.src = design.reference;
  thumbnail.width = design.referenceWidth || 1600;
  thumbnail.height = design.referenceHeight || 1100;
  thumbnail.alt = `${design.label}, front and rear three-quarter design views`;
  viewer.alt = selectedModelVariant === "with-body" ? design.alt : `${design.label}, exosuit only`;
  const variantLabel = selectedModelVariant === "with-body" ? "Human + Exosuit" : "Exosuit Only";
  setText("#model-label", `${design.number} · ${variantLabel}`);
  modelVariantButtons.forEach(button => {
    const active = button.dataset.modelVariant === selectedModelVariant;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.body.dataset.modelVariant = selectedModelVariant;
  designTabs.forEach(button => {
    const active = button.dataset.design === selectedDesign;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;
  });
  for (const button of [...topicButtons, ...hotspots]) {
    const active = button.dataset.topic === selectedTopic;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  }
  viewButtons.forEach(button => {
    const active = selectedTopic === "overview" && button.dataset.view === selectedView;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function updateCamera(jump = false) {
  clearTimeout(cameraLimitTimer);
  if (!activeModel()) return;
  const design = designs[selectedDesign];
  const topicCamera = selectedModelVariant === "equipment-only"
    ? equipmentViews[selectedDesign].cameras[selectedTopic]
    : design.topics[selectedTopic].camera;
  const camera = {...topicCamera, ...(narrowViewport.matches ? topicCamera.mobile : {})};
  if (selectedTopic === "overview" && selectedView !== "overview") {
    const angles = design.viewAngles || {front: "0deg", back: "180deg", side: "90deg"};
    camera.orbit = camera.orbit.replace(/^\S+/, angles[selectedView]);
  }
  // Keep the chosen framing at 1× and allow up to 2× zoom through camera distance.
  const radius = parseFloat(camera.orbit.trim().split(/\s+/).at(-1));
  const immediate = jump || reducedMotion.matches || !viewer.loaded;
  const currentRadius = viewer.getCameraOrbit?.().radius ?? radius;
  const applyFinalLimits = () => {
    viewer.minCameraOrbit = `auto 20deg ${radius / 2}m`;
    viewer.maxCameraOrbit = `auto 155deg ${radius}m`;
  };
  // Let the current and destination distances coexist during the transition;
  // clamping to the new zoom range first would snap between detail views.
  viewer.minCameraOrbit = `auto 20deg ${immediate ? radius / 2 : Math.min(radius / 2, currentRadius)}m`;
  viewer.maxCameraOrbit = `auto 155deg ${immediate ? radius : Math.max(radius, currentRadius)}m`;
  viewer.setAttribute("interpolation-decay", reducedMotion.matches ? "0" : "180");
  viewer.minFieldOfView = camera.fieldOfView;
  viewer.maxFieldOfView = camera.fieldOfView;
  viewer.cameraTarget = camera.target;
  viewer.cameraOrbit = camera.orbit;
  viewer.fieldOfView = camera.fieldOfView;
  if (immediate) viewer.jumpCameraToGoal?.();
  else cameraLimitTimer = window.setTimeout(applyFinalLimits, 1000);
}

function updateHotspots() {
  const design = selectedModelVariant === "equipment-only" ? equipmentViews[selectedDesign] : designs[selectedDesign];
  const positions = design.hotspots;
  for (const button of hotspots) {
    const position = positions[button.dataset.topic];
    const normal = design.hotspotNormals?.[button.dataset.topic]
      || (button.dataset.topic === "battery" ? "0m 0m 1m" : "0m 0m -1m");
    button.dataset.position = position;
    button.dataset.normal = normal;
    viewer.updateHotspot?.({name: button.slot, position, normal});
  }
}

function beginLoading() {
  clearTimeout(loadingTimer);
  loadError.hidden = true;
  loadingOverlay.classList.remove("is-complete");
  document.querySelector("#loading-bar").style.width = "0%";
  loadingTimer = window.setTimeout(showLoadError, 45000);
}

function finishLoading() {
  if (!activeModel()) return;
  clearTimeout(loadingTimer);
  loadError.hidden = true;
  loadingOverlay.classList.add("is-complete");
  updateHotspots();
  updateCamera(true);
}

function showLoadError() {
  if (!activeModel()) return;
  clearTimeout(loadingTimer);
  loadingOverlay.classList.add("is-complete");
  loadError.hidden = false;
}

function loadSelectedModel() {
  clearTimeout(cameraLimitTimer);
  const model = activeModel();
  viewer.hidden = !model;
  document.querySelector(".interaction-hint").hidden = !model;
  if (!model) {
    clearTimeout(loadingTimer);
    loadingOverlay.classList.add("is-complete");
    loadError.hidden = true;
    viewer.removeAttribute("src");
    return;
  }
  beginLoading();
  viewer.setAttribute("src", model);
  updateHotspots();
  updateCamera(true);
}

function chooseDesign(code) {
  if (code === selectedDesign || !designs[code]) return;
  selectedDesign = code;
  selectedTopic = "overview";
  selectedView = "overview";
  updatePanel();
  loadSelectedModel();
  setText("#announcement", `${designs[code].number}. ${designs[code].label}. Overview.`);
}

function chooseModelVariant(variant) {
  if (variant === selectedModelVariant || !["with-body", "equipment-only"].includes(variant)) return;
  selectedModelVariant = variant;
  selectedTopic = "overview";
  selectedView = "overview";
  updatePanel();
  loadSelectedModel();
  const label = variant === "with-body" ? "Human plus exosuit" : "Exosuit only";
  setText("#announcement", `${label}. Overview.${activeModel() ? "" : " No model uploaded."}`);
}

function chooseTopic(topic) {
  if (!designs[selectedDesign].topics[topic]) return;
  selectedTopic = topic;
  selectedView = "overview";
  updatePanel();
  updateCamera();
  setText("#announcement", designs[selectedDesign].topics[topic].title.join(" "));
  if (window.matchMedia("(max-width: 800px)").matches) {
    document.querySelector(".viewer-panel").scrollIntoView({
      behavior: reducedMotion.matches ? "auto" : "smooth",
      block: "start"
    });
  }
}

function chooseView(view) {
  selectedTopic = "overview";
  selectedView = view;
  updatePanel();
  updateCamera();
}

function updateReference() {
  const design = designs[selectedDesign];
  setText("#reference-dialog-kicker", `${design.number} · Design reference`);
  setText("#reference-dialog-title", design.label);
  const image = document.querySelector("#reference-full-image");
  image.src = referenceView === "side" ? design.sideReference : design.reference;
  image.alt = `${design.label}, ${referenceView === "side" ? "left profile model render" : "front and rear three-quarter design views"}`;
  setText(".reference-footnote", referenceView === "side"
    ? "Left-side view rendered from the human and exosuit model with your selected studio lighting."
    : design.referenceNote);
  for (const button of document.querySelectorAll("[data-reference-view]")) {
    const active = button.dataset.referenceView === referenceView;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  }
}

function openReference() {
  referenceView = "front-rear";
  updateReference();
  referenceDialog.showModal();
}

designTabs.forEach(button => button.addEventListener("click", () => chooseDesign(button.dataset.design)));
modelVariantButtons.forEach(button => button.addEventListener("click", () => chooseModelVariant(button.dataset.modelVariant)));
document.querySelector(".design-tabs").addEventListener("keydown", event => {
  const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
  if (!keys.includes(event.key)) return;
  event.preventDefault();
  const currentIndex = designTabs.findIndex(button => button.dataset.design === selectedDesign);
  let nextIndex = currentIndex;
  if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % designTabs.length;
  if (event.key === "ArrowLeft") nextIndex = (currentIndex + designTabs.length - 1) % designTabs.length;
  if (event.key === "Home") nextIndex = 0;
  if (event.key === "End") nextIndex = designTabs.length - 1;
  chooseDesign(designTabs[nextIndex].dataset.design);
  designTabs[nextIndex].focus({preventScroll: true});
});

for (const button of [...topicButtons, ...hotspots]) {
  button.addEventListener("click", () => chooseTopic(button.dataset.topic));
}
viewButtons.forEach(button => button.addEventListener("click", () => chooseView(button.dataset.view)));
document.querySelector("#reset-button").addEventListener("click", () => chooseView("overview"));
document.querySelector("#reference-preview").addEventListener("click", openReference);
document.querySelector("#reference-open").addEventListener("click", openReference);
document.querySelectorAll("[data-reference-view]").forEach(button => {
  button.addEventListener("click", () => {
    referenceView = button.dataset.referenceView;
    updateReference();
  });
});
document.querySelectorAll(".about-trigger").forEach(button => button.addEventListener("click", () => aboutDialog.showModal()));
document.querySelectorAll(".close-dialog").forEach(button => button.addEventListener("click", () => button.closest("dialog").close()));
document.querySelectorAll("dialog").forEach(dialog => {
  dialog.addEventListener("click", event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
});

fullscreenButton.hidden = !document.fullscreenEnabled;
zoomToggle.addEventListener("change", updateZoomEnabled);
fullscreenButton.addEventListener("click", async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.querySelector(".viewer-panel").requestFullscreen();
  } catch {
    setText("#announcement", "Full screen is unavailable in this browser.");
  }
});
document.addEventListener("fullscreenchange", () => {
  const label = document.fullscreenElement ? "Exit full screen" : "Enter full screen";
  fullscreenButton.setAttribute("aria-label", label);
  fullscreenButton.title = label;
});

viewer.addEventListener("load", finishLoading);
narrowViewport.addEventListener("change", () => updateCamera(true));
viewer.addEventListener("error", showLoadError);
viewer.addEventListener("progress", event => {
  if (!activeModel()) return;
  document.querySelector("#loading-bar").style.width = `${Math.round(event.detail.totalProgress * 100)}%`;
  if (!loadingOverlay.classList.contains("is-complete")) {
    clearTimeout(loadingTimer);
    loadingTimer = window.setTimeout(showLoadError, 45000);
  }
});
document.querySelector("#retry-button").addEventListener("click", () => {
  const model = activeModel();
  if (!model) return;
  beginLoading();
  viewer.setAttribute("src", `${model}?retry=${Date.now()}`);
});

zoomToggle.checked = true;
updateZoomEnabled();
updatePanel();
beginLoading();
customElements.whenDefined("model-viewer").then(() => {
  if (reducedMotion.matches) viewer.setAttribute("interpolation-decay", "0");
  updateHotspots();
  updateCamera(true);
  if (viewer.loaded) finishLoading();
});
