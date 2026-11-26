import {designs} from "./designs.js";

const viewer = document.querySelector("#model-viewer");
const designTabs = [...document.querySelectorAll("[data-design]")];
const topicButtons = [...document.querySelectorAll(".detail-button")];
const viewButtons = [...document.querySelectorAll("[data-view]")];
const hotspots = [...document.querySelectorAll(".hotspot")];
const loadingOverlay = document.querySelector("#loading-overlay");
const loadError = document.querySelector("#load-error");
const referenceDialog = document.querySelector("#reference-dialog");
const aboutDialog = document.querySelector("#about-dialog");
const fullscreenButton = document.querySelector("#fullscreen-button");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const narrowViewport = window.matchMedia("(max-width: 800px)");

let selectedDesign = "B";
let selectedTopic = "overview";
let selectedView = "overview";
let referenceView = "front-rear";
let loadingTimer;

function setText(selector, text) {
  document.querySelector(selector).textContent = text;
}

function updatePanel() {
  const design = designs[selectedDesign];
  const topic = design.topics[selectedTopic];
  const rootStyle = document.documentElement.style;
  rootStyle.setProperty("--accent", design.theme.accent);
  rootStyle.setProperty("--accent-dark", design.theme.dark);
  rootStyle.setProperty("--accent-soft", design.theme.soft);
  document.body.dataset.design = selectedDesign;
  document.body.dataset.topic = selectedTopic;
  document.querySelector("#design-panel").setAttribute("aria-labelledby", `tab-${selectedDesign}`);
  setText("#detail-eyebrow", `${design.label.toUpperCase()} INTEGRATION · DESIGN ${selectedDesign}`);
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
  const keywordList = document.querySelector("#keyword-list");
  keywordList.replaceChildren(...topic.keywords.map(keyword => {
    const item = document.createElement("li");
    item.textContent = keyword;
    return item;
  }));
  const thumbnail = document.querySelector("#reference-thumbnail");
  const showProfile = selectedTopic === "module" && selectedDesign === "D";
  thumbnail.src = showProfile ? design.sideReference : design.reference;
  thumbnail.alt = `Design ${selectedDesign} ${showProfile ? "left-profile" : "front and back"} concept reference`;
  viewer.alt = design.alt;
  setText("#model-label", design.modelLabel || "Schematic 3D placeholder");
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
  const design = designs[selectedDesign];
  const topicCamera = design.topics[selectedTopic].camera;
  const camera = {...topicCamera, ...(narrowViewport.matches ? topicCamera.mobile : {})};
  if (selectedTopic === "overview" && selectedView !== "overview") {
    const angles = design.viewAngles || {front: "0deg", back: "180deg", side: "90deg"};
    camera.orbit = camera.orbit.replace(/^\S+/, angles[selectedView]);
  }
  viewer.minCameraOrbit = design.cameraLimits?.min || "auto 20deg 0.35m";
  viewer.maxCameraOrbit = design.cameraLimits?.max || "auto 155deg 5m";
  viewer.cameraTarget = camera.target;
  viewer.cameraOrbit = camera.orbit;
  viewer.fieldOfView = camera.fieldOfView;
  if (jump || reducedMotion.matches) viewer.jumpCameraToGoal?.();
}

function updateHotspots() {
  const design = designs[selectedDesign];
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
  clearTimeout(loadingTimer);
  loadError.hidden = true;
  loadingOverlay.classList.add("is-complete");
  updateHotspots();
  updateCamera(true);
}

function showLoadError() {
  clearTimeout(loadingTimer);
  loadingOverlay.classList.add("is-complete");
  loadError.hidden = false;
}

function chooseDesign(code) {
  if (code === selectedDesign || !designs[code]) return;
  selectedDesign = code;
  updatePanel();
  beginLoading();
  viewer.src = designs[code].model;
  updateHotspots();
  updateCamera();
  setText("#announcement", `${designs[code].label} integration, Design ${code}. ${designs[code].topics[selectedTopic].title.join(" ")}`);
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
  setText("#reference-dialog-kicker", `DESIGN ${selectedDesign}`);
  setText("#reference-dialog-title", `${design.label} integration`);
  const image = document.querySelector("#reference-full-image");
  image.src = referenceView === "side" ? design.sideReference : design.reference;
  image.alt = `Design ${selectedDesign} ${referenceView === "side" ? "left profile" : "front and back"} concept render`;
  for (const button of document.querySelectorAll("[data-reference-view]")) {
    const active = button.dataset.referenceView === referenceView;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  }
}

function openReference() {
  referenceView = selectedTopic === "module" && selectedDesign === "D" ? "side" : "front-rear";
  updateReference();
  referenceDialog.showModal();
}

designTabs.forEach(button => button.addEventListener("click", () => chooseDesign(button.dataset.design)));
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
  document.querySelector("#loading-bar").style.width = `${Math.round(event.detail.totalProgress * 100)}%`;
  if (!loadingOverlay.classList.contains("is-complete")) {
    clearTimeout(loadingTimer);
    loadingTimer = window.setTimeout(showLoadError, 45000);
  }
});
document.querySelector("#retry-button").addEventListener("click", () => {
  beginLoading();
  viewer.src = `${designs[selectedDesign].model}?retry=${Date.now()}`;
});

updatePanel();
beginLoading();
customElements.whenDefined("model-viewer").then(() => {
  if (reducedMotion.matches) viewer.setAttribute("interpolation-decay", "0");
  updateHotspots();
  updateCamera(true);
  if (viewer.loaded) finishLoading();
});
