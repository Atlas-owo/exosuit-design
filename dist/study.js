// Content transcribed and edited from wearable.pdf, November 2026.
// B = green harness, A = blue vest, D = orange garment; display names live in designs.js.
const studyContent = {
  B: {
    summary: "An open shoulder harness and a separate waist belt organize the assistance system around individually fitted thigh cuffs. The development combines the Harness and High Supports concept with the Equipment Harness workwear study.",
    development: [
      ["Structural starting point", "Harness and High Supports", "Open shoulder straps, a separate belt and high thigh interfaces establish the body-contact regions while leaving the centre of the torso exposed."],
      ["Occupational reference", "Equipment Harness", "The logistics study gives the chest device a defined shoulder-strap mount and keeps the waist belt available for adjustment."],
      ["Selected refinement", "Independent thigh interfaces", "Narrow thigh cuffs replace the earlier high hip wraps. Rear working modules and passive transfer straps clarify the connection to the lower anchors."]
    ],
    palette: [["Olive green", "#737A42"], ["Pale sage", "#B0B28C"], ["Graphite", "#414142"], ["Charcoal", "#282829"], ["Signal yellow", "#E5B83D"]],
    materials: "Woven module covers, open mesh, load-bearing webbing and molded local housings.",
    finishes: "Bound edges, diamond quilting, Box-X reinforcement stitching and matte hardware surfaces.",
    inspiration: "Landscape colors, leaf structure and spacer knit inform the material character; localized padding, strap adjustment and tactile controls inform the body interfaces.",
    interfaces: [
      ["Shoulders", "A reinforced shoulder yoke connects the carrier to two distinct rear module mounts."],
      ["Back", "Continuous textile covers protect the flexible working spans. Local hardware is kept separate from the changing-length regions."],
      ["Waist", "A separate adjustable belt establishes torso fit without combining it with the thigh-cuff closures."],
      ["Thighs", "Each padded cuff has its own opening, circumference adjustment and reinforced transfer-strap attachment."],
      ["Power access", "The chest-mounted battery and its controls remain identifiable on the shoulder strap."]
    ],
    priorities: ["Refine upper and lower module attachment boundaries.", "Maintain flexible clearance along each working span.", "Develop cuff retention and independent fitting during movement.", "Resolve local fan packaging and the lower output connection."],
    cmfImages: {
      material: ["Woven shell", "Open mesh", "Webbing", "Molded housing"],
      finish: ["Bound edge", "Diamond quilting", "Box-X stitching", "Matte texture"],
      mood: ["Landscape palette", "Leaf structure", "Spacer knit", "Airflow", "Soft padding", "Strap adjustment", "Tactile control", "Trail use"]
    },
    cmfPage: 29,
    source: "Wearable Exosuit Visual Design · PDF pages 24 and 28–32"
  },
  A: {
    summary: "A front-opening vest provides a common carrier for the assistance system. A wide waist flap establishes the torso fit, while lateral strips connect the vest to separately adjustable thigh cuffs.",
    development: [
      ["Structural starting point", "Continuous Carrier", "The initial carrier extends past the hips into broad thigh sections, establishing a continuous upper-to-lower garment relationship."],
      ["Occupational reference", "Care and Service Vest", "A familiar front opening, mesh panels and a defined chest-device position inform the dressing sequence and equipment access."],
      ["Selected refinement", "Vest, waist flap and thigh cuffs", "The vest overlaps a wide adjustable waist panel. Narrow side strips continue toward buckled thigh cuffs, retaining separate adjustment at the lower interfaces."]
    ],
    palette: [["Deep blue", "#005895"], ["Mesh white", "#E4E5E7"], ["Graphite", "#44474B"], ["Charcoal", "#26282B"], ["Aqua", "#58A9C5"]],
    materials: "Woven shell panels, open mesh, webbing and molded housings organize the garment and its equipment interfaces.",
    finishes: "Bound edges, topstitching, reinforced cross details and an aqua zipper pull.",
    inspiration: "Water tones, care settings and open knit inform the CMF direction. Easy-grip details, soft layers and assisted fitting inform the access points.",
    interfaces: [
      ["Shoulders and chest", "The shared vest positions the rear assembly and provides an identifiable front battery mount."],
      ["Back", "The defined external working region accommodates the central cooling fan and local airflow interface."],
      ["Waist", "The overlapping waist flap gives torso fit its own adjustable closure."],
      ["Outer hips and thighs", "Lateral connecting strips lead to separately buckled thigh cuffs, organizing the lower attachment without a continuous seat panel."],
      ["Entry and operation", "The front opening and visible operating controls make dressing, adjustment and battery access distinct actions."]
    ],
    priorities: ["Coordinate the vest opening with the overlapping waist adjustment.", "Maintain movement clearance between the rear working region and its carrier.", "Refine fan, airflow opening and transmission-strap packaging.", "Review the component envelopes against the reference drawing."],
    cmfImages: {
      material: ["Woven shell", "Open mesh", "Webbing", "Molded housing"],
      finish: ["Bound edge", "Topstitching", "Cross detail", "Aqua zipper pull"],
      mood: ["Water palette", "Care setting", "Open knit", "Easy grip", "Airflow", "Soft layers", "Tactile control", "Assisted fit"]
    },
    cmfPage: 35,
    dimensions: [
      ["Battery module", "80 × 160 mm"],
      ["Cooling fan", "Ø 100 mm"],
      ["Waist flap", "205 × 155 mm"],
      ["Air intake", "175 × 35 mm"]
    ],
    source: "Wearable Exosuit Visual Design · PDF pages 25 and 34–38"
  },
  D: {
    summary: "A side-fastening top and wrapover support shorts organize the assistance system as two coordinated garments. The layered back region contains the working span, while waist guides connect it to the lower garment interfaces.",
    development: [
      ["Structural starting point", "Tabard and Support Shorts", "Broad torso panels pair with a lower garment that brings the waist, seat and thigh interfaces together."],
      ["Occupational reference", "Side Opening Tabard", "Side closures preserve a continuous front panel and allow equipment to occupy a defined chest zone."],
      ["Selected refinement", "Top and adjustable support shorts", "The side-fastening top pairs with wrapover shorts. Waist and thigh adjustments are organized on the lower garment, with transfer guidance at the waist."]
    ],
    palette: [["Sport orange", "#E76B3D"], ["Mesh grey", "#899098"], ["Silver trim", "#C2C3C2"], ["Graphite", "#414347"], ["Charcoal", "#27282A"]],
    materials: "Woven shell, shoulder mesh, webbing and molded local housings combine garment surfaces with identifiable equipment interfaces.",
    finishes: "Bound armholes and hems, topstitching and silver trim define the garment edges.",
    inspiration: "Running apparel, track markings and a citrus palette inform the visual direction. Engineered mesh, strap adjustment and reflective details inform the functional detailing.",
    interfaces: [
      ["Shoulders", "Mesh panels and bound armholes define the upper garment contact and ventilation zones."],
      ["Back", "A flexible embedded actuator region sits within the garment layers, with local fan hardware at the back."],
      ["Waist", "Transfer guides organize the route between the upper working region and the support shorts."],
      ["Lower garment", "The shorts combine the seat and thigh contact areas, with adjustable bands and defined thigh interfaces."],
      ["Entry and power", "Side fastenings retain the continuous front panel; the chest device remains accessible as a separate operating interface."]
    ],
    priorities: ["Define the internal layer structure and allowance for textile movement.", "Coordinate the top, waist guides and shorts during bending and sitting.", "Refine independent waist and thigh adjustments on the lower garment.", "Develop component access and cleaning as part of garment construction."],
    cmfImages: {
      material: ["Woven shell", "Shoulder mesh", "Webbing", "Molded housing"],
      finish: ["Bound armhole", "Topstitching", "Silver trim", "Bound hem"],
      mood: ["Track markings", "Running apparel", "Citrus palette", "Airflow", "Engineered mesh", "Strap adjustment", "Reflective detail", "Cycling"]
    },
    cmfPage: 41,
    source: "Wearable Exosuit Visual Design · PDF pages 26 and 40–43"
  }
};

let displayedDesign;
const text = (selector, value) => { document.querySelector(selector).textContent = value; };

function renderCMFGallery(selector, labels, code, group, design) {
  document.querySelector(selector).replaceChildren(...labels.map((label, index) => {
    const source = `assets/study/cmf/${code}-${group}-${String(index + 1).padStart(2, "0")}.jpg`;
    const item = document.createElement("li");
    const figure = document.createElement("figure");
    const link = document.createElement("a");
    link.href = source;
    link.target = "_blank";
    link.rel = "noopener";
    link.setAttribute("aria-label", `${label}: open image`);
    const image = document.createElement("img");
    image.src = source;
    image.alt = `${design.label}: ${label}`;
    image.loading = "lazy";
    image.decoding = "async";
    image.width = 720;
    image.height = 480;
    const caption = document.createElement("figcaption");
    caption.textContent = label;
    link.append(image);
    figure.append(link, caption);
    item.append(figure);
    return item;
  }));
}

export function updateStudyNotes(code, design) {
  if (displayedDesign === code) return;
  displayedDesign = code;
  const study = studyContent[code];
  text("#study-design-name", `${design.number} · ${design.label}`);
  text("#study-summary", study.summary);
  text("#study-source", study.source);
  document.querySelector("#development-steps").replaceChildren(...study.development.map(([label, title, description]) => {
    const item = document.createElement("li");
    const kicker = document.createElement("p");
    kicker.className = "development-label";
    kicker.textContent = label;
    const heading = document.createElement("h3");
    heading.textContent = title;
    const body = document.createElement("p");
    body.textContent = description;
    item.append(kicker, heading, body);
    return item;
  }));
  document.querySelector("#study-palette").replaceChildren(...study.palette.map(([name, color]) => {
    const item = document.createElement("li");
    const swatch = document.createElement("span");
    swatch.className = "palette-swatch";
    swatch.style.backgroundColor = color;
    swatch.setAttribute("aria-hidden", "true");
    const label = document.createElement("strong");
    label.textContent = name;
    const hex = document.createElement("span");
    hex.textContent = color;
    item.append(swatch, label, hex);
    return item;
  }));
  renderCMFGallery("#study-material-images", study.cmfImages.material, code, "material", design);
  renderCMFGallery("#study-finish-images", study.cmfImages.finish, code, "finish", design);
  renderCMFGallery("#study-mood-images", study.cmfImages.mood, code, "mood", design);
  document.querySelector("#study-interfaces").replaceChildren(...study.interfaces.map(([name, description]) => {
    const row = document.createElement("div");
    const term = document.createElement("dt");
    term.textContent = name;
    const detail = document.createElement("dd");
    detail.textContent = description;
    row.append(term, detail);
    return row;
  }));
  document.querySelector("#study-priorities").replaceChildren(...study.priorities.map(value => {
    const item = document.createElement("li");
    item.textContent = value;
    return item;
  }));
  const dimensions = document.querySelector("#study-dimensions");
  dimensions.hidden = !study.dimensions;
  dimensions.open = false;
  document.querySelector("#study-dimension-rows").replaceChildren(...(study.dimensions || []).map(([name, value]) => {
    const row = document.createElement("tr");
    const label = document.createElement("th");
    label.scope = "row";
    label.textContent = name;
    const cell = document.createElement("td");
    cell.textContent = value;
    row.append(label, cell);
    return row;
  }));
}
