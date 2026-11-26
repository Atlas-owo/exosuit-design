// Per-design model, camera and hotspot settings.
// Camera targets and hotspot positions use metres in each GLB's coordinate system.
const neutralTheme = {accent: "#646464", dark: "#373737", soft: "#f0f0f0"};

export const overviewCamera = {
  target: "0m 1.06m 0m",
  orbit: "45deg 83deg 3.65m",
  fieldOfView: "33deg"
};

const batteryTopic = {
  title: ["Power within reach."],
  description: "The external battery sits on the wearer's left chest, with a defined mounting base and a protected cable route into the garment.",
  principle: "Keep the controls, charge indicators, connector, and release accessible while the suit is worn.",
  keywords: ["External battery", "Visible controls", "Protected routing"],
  contextTitle: "Interface to develop",
  context: "The production model can show the battery dock, strap retention, and electrical connection in more detail.",
  camera: {target: "0.135m 1.45m 0.16m", orbit: "-25deg 80deg 0.72m", fieldOfView: "33deg"}
};

export const designs = {
  B: {
    code: "B",
    label: "Modular Harness Exosuit",
    model: "assets/models/GREEN_v3-web.glb",
    modelLabel: "GREEN v3 · 3D design model",
    viewAngles: {front: "0deg", back: "180deg", side: "90deg"},
    reference: "assets/references/B-v3-reference.jpg",
    sideReference: "assets/references/B-v3-side.jpg",
    referenceKind: "model",
    referenceLabel: "Model reference",
    referenceNote: "Front, back, and left-side views rendered from GREEN v3 with your selected soft studio lighting.",
    alt: "Textured GREEN v3 open-harness exosuit with two independent rear textile modules, local fans, adjustable chest straps, and separate thigh cuffs over white work clothing.",
    theme: neutralTheme,
    hotspots: {
      module: "0.07m 0.76m -0.144m",
      cooling: "0.065m 0.59m -0.144m",
      anchors: "0.17m 0.31m -0.079m",
      battery: "0.09m 0.8m 0.14m"
    },
    hotspotNormals: {
      module: "0m 0m -1m",
      cooling: "0m 0m -1m",
      anchors: "0m 0m -1m",
      battery: "0m 0m 1m"
    },
    topics: {
      overview: {
        title: ["Independent modules,", "an open harness."],
        description: "Two protected textile modules connect individually to a shoulder harness and high thigh cuffs. Open chest and side areas keep the carrier visually light.",
        principle: "Keep each module, attachment, and fit adjustment identifiable.",
        keywords: ["Modular", "Adjustable", "Open coverage"],
        contextTitle: "Proposed applications",
        context: "Warehouse picking, event installation, and horticulture.",
        camera: {
          target: "0m 0.49m 0m", orbit: "45deg 83deg 2.65m", fieldOfView: "33deg",
          mobile: {target: "0m 0.445m 0m", orbit: "45deg 83deg 2.95m"}
        }
      },
      module: {
        title: ["Two individually", "mounted modules."],
        description: "Each long unit has its own upper attachment, a flexible protected textile span, and a lower connection to the passive transfer band.",
        principle: "Make the module boundary and both connection ends readable while leaving room for the textile span to gather.",
        keywords: ["Independent mounting", "Flexible span", "Defined terminals"],
        contextTitle: "Detail to evaluate",
        context: "Alignment, movement relative to the harness, and access for inspection or replacement.",
        camera: {target: "0m 0.74m -0.1m", orbit: "160deg 82deg 1.4m", fieldOfView: "33deg"}
      },
      cooling: {
        title: ["Local fans,", "defined outputs."],
        description: "Each module ends in a local fan and output assembly. A separate passive band carries the connection toward the same-side thigh anchor.",
        principle: "Keep the fan mount and transmission fitting local so the middle of the module can remain flexible.",
        keywords: ["Local cooling", "Output fitting", "Passive transfer"],
        contextTitle: "Detail to evaluate",
        context: "The airflow route through each long textile region and the clearance around the moving lower terminal.",
        camera: {target: "0m 0.59m -0.11m", orbit: "180deg 85deg 0.9m", fieldOfView: "33deg"}
      },
      anchors: {
        title: ["Independent fit", "at each thigh."],
        description: "Two high cuffs close at the front and connect to the rear transfer bands. Each cuff has its own circumference adjustment.",
        principle: "Concentrate contact and padding at the anchors, with clear routes from the modules to the legs.",
        keywords: ["High cuffs", "Separate adjustment", "Open pelvis"],
        contextTitle: "Detail to evaluate",
        context: "Cuff migration during walking and bending, and the balance between the two transmission routes.",
        camera: {target: "0m 0.31m -0.025m", orbit: "145deg 83deg 1.4m", fieldOfView: "33deg"}
      },
      battery: {
        ...batteryTopic,
        description: "The external battery sits on the wearer's left shoulder rail, with visible front controls and a retaining strap above the waist belt.",
        context: "Evaluate docking, cable retention, and release access alongside the harness adjustments.",
        camera: {target: "0.09m 0.8m 0.11m", orbit: "-20deg 83deg 0.9m", fieldOfView: "33deg"}
      }
    }
  },
  A: {
    code: "A",
    label: "Vest-Mounted Exosuit",
    model: "assets/models/BLUE_v3-web.glb",
    modelLabel: "BLUE v3 · 3D design model",
    reference: "assets/references/A-v3-reference.jpg",
    sideReference: "assets/references/A-v3-side.jpg",
    referenceKind: "model",
    referenceLabel: "Model reference",
    referenceNote: "Front, back, and left-side views rendered from BLUE v3 with your selected soft studio lighting.",
    alt: "Textured BLUE v3 semi-independent blue vest design, with a white carrier garment, rear assistance module, external chest battery, and front waist pouch.",
    theme: neutralTheme,
    hotspots: {
      module: "0.075m 0.815m -0.13m",
      cooling: "0m 0.715m -0.14m",
      anchors: "0.21m 0.25m -0.052m",
      battery: "0.08m 0.775m 0.14m"
    },
    topics: {
      overview: {
        title: ["A contoured module,", "a shared vest."],
        description: "A blue zip-front vest carries a separate rear module over work clothing. A front waist pouch, lateral thigh panels, and adjustable bands organize the upper and lower interfaces.",
        principle: "Use the vest as a common support while preserving a readable interface around the flexible module.",
        keywords: ["Shared carrier", "Contoured", "Semi-independent"],
        contextTitle: "Proposed applications",
        context: "Manufacturing, facility maintenance, and workshop tasks.",
        camera: {
          target: "0m 0.49m 0m", orbit: "45deg 83deg 2.65m", fieldOfView: "33deg",
          mobile: {target: "0m 0.445m 0m", orbit: "45deg 83deg 2.95m"}
        }
      },
      module: {
        title: ["A curved outline,", "a distinct boundary."],
        description: "The blue rear panel has a defined bound edge, an upper retention strap, and a central fan. It sits on the shared vest carrier, with separate straps continuing toward the thigh anchors.",
        principle: "Follow the back contour while allowing the flexible module and its backing to move relative to each other.",
        keywords: ["Contoured cover", "Bound edge", "Local mounting"],
        contextTitle: "Detail to evaluate",
        context: "Working-component clearance, airflow space, and lower-terminal travel through a bend.",
        camera: {target: "0m 0.71m -0.08m", orbit: "160deg 82deg 1.35m", fieldOfView: "33deg"}
      },
      cooling: {
        title: ["A central fan,", "distinct load paths."],
        description: "A central fan and lower outlet sit on the external blue back panel. Separate posterior straps continue from the lower vest toward the thigh anchors.",
        principle: "Let the fan, outlet, and load connections express their own roles within the assembly.",
        keywords: ["Central fan", "Lower outlet", "Posterior straps"],
        contextTitle: "Detail to evaluate",
        context: "Airflow through the rear module and clearance around the straps as the wearer bends.",
        camera: {target: "0m 0.715m -0.12m", orbit: "180deg 85deg 0.84m", fieldOfView: "33deg"}
      },
      anchors: {
        title: ["Long lateral panels,", "lower thigh anchors."],
        description: "Narrow outer-thigh panels extend to lower anchor bands. The seat and the main front and rear thigh surfaces stay open.",
        principle: "Continue the connection along the sides while giving each lower band a defined adjustment and attachment.",
        keywords: ["Lateral support", "Lower bands", "Open seat"],
        contextTitle: "Detail to evaluate",
        context: "Panel rotation, contact pressure, and alignment between the posterior straps and lower anchors.",
        camera: {target: "0m 0.27m 0m", orbit: "130deg 83deg 1.4m", fieldOfView: "33deg"}
      },
      battery: {
        ...batteryTopic,
        description: "The external battery sits on the wearer's left chest, with front-facing controls and a retaining band above the waist pouch.",
        context: "The current model shows the battery housing and front controls. Docking, cable retention, and release access remain details to develop.",
        camera: {target: "0.08m 0.775m 0.11m", orbit: "-20deg 83deg 0.84m", fieldOfView: "33deg"}
      }
    }
  },
  D: {
    code: "D",
    label: "Garment-Integrated Exosuit",
    model: "assets/models/D.glb",
    reference: "assets/references/D-model-reference.jpg",
    sideReference: "assets/references/D-model-side.jpg",
    referenceKind: "model",
    referenceLabel: "Schematic model reference",
    referenceNote: "Front, back, and left-side views rendered from the schematic garment model with your selected soft studio lighting.",
    alt: "Schematic orange side-opening tabard with an embedded rear textile working region, upper fan, and reinforced support shorts.",
    theme: neutralTheme,
    hotspots: {
      module: "0.1m 1.35m -0.178m",
      cooling: "0m 1.49m -0.205m",
      anchors: "0.14m 0.81m -0.125m",
      battery: "0.135m 1.45m 0.185m"
    },
    topics: {
      overview: {
        title: ["Assistance within", "the garment."],
        description: "A side-opening tabard contains the protected working region within its layered back panel. Output bands continue through waist guides to support-shorts anchors.",
        principle: "Build containment, positioning, and transmission routes into the garment construction.",
        keywords: ["Embedded", "Layered textile", "Integrated anchors"],
        contextTitle: "Proposed applications",
        context: "Laundry, housekeeping, production stations, and hospital support logistics.",
        camera: overviewCamera
      },
      module: {
        title: ["Flexible volume", "within a back panel."],
        description: "A shallow side section reserves space for the internal assembly. Continuous cloth, soft edges, and sewn transitions connect the working region to the tabard.",
        principle: "Allow internal movement and contraction within a continuous garment construction.",
        keywords: ["Textile volume", "Continuous panel", "Sewn transitions"],
        contextTitle: "Detail to evaluate",
        context: "Layer movement, usable internal space, and service access. The profile reference shows the intended thickness.",
        camera: {target: "0m 1.35m -0.13m", orbit: "125deg 82deg 1.5m", fieldOfView: "33deg"}
      },
      cooling: {
        title: ["Airflow through", "the back panel."],
        description: "The upper fan and lower mesh outlet form local interfaces in the integrated textile region. Output bands leave below the outlet toward the waist guides.",
        principle: "Provide a defined cooling passage while keeping the long working span flexible.",
        keywords: ["Upper fan", "Integrated passage", "Lower mesh outlet"],
        contextTitle: "Detail to evaluate",
        context: "The internal air passage and textile clearance when the wearer bends or sits.",
        camera: {target: "0m 1.32m -0.15m", orbit: "160deg 82deg 1.35m", fieldOfView: "33deg"}
      },
      anchors: {
        title: ["Transmission guided", "into support shorts."],
        description: "Passive output bands pass through waist guides and continue toward reinforced thigh hems in the openable shorts.",
        principle: "Use the lower garment to organize the contact surfaces, guidance, and leg anchoring.",
        keywords: ["Waist guides", "Reinforced hems", "Support shorts"],
        contextTitle: "Detail to evaluate",
        context: "Alignment between the tabard and shorts, donning over work clothing, and pressure during movement.",
        camera: {target: "0m 0.88m -0.03m", orbit: "145deg 85deg 1.4m", fieldOfView: "33deg"}
      },
      battery: batteryTopic
    }
  }
};
