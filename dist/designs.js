// Per-design model, camera and hotspot settings.
// Camera targets and hotspot positions use metres in each GLB's coordinate system.
export const overviewCamera = {
  target: "0m 1.06m 0m",
  orbit: "145deg 83deg 3.65m",
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
    label: "Open",
    model: "assets/models/B.glb",
    reference: "assets/references/B-reference.jpg",
    sideReference: "assets/references/B-side.jpg",
    alt: "Schematic open-harness exosuit with two independent rear textile modules, each with a local fan, and separate high thigh cuffs.",
    theme: {accent: "#607347", dark: "#435532", soft: "#edf1e7"},
    hotspots: {
      module: "0.092m 1.37m -0.18m",
      cooling: "0.092m 1.12m -0.21m",
      anchors: "0.1m 0.82m -0.11m",
      battery: "0.135m 1.45m 0.185m"
    },
    topics: {
      overview: {
        title: ["Independent modules,", "an open harness."],
        description: "Two protected textile modules connect individually to a shoulder harness and high thigh cuffs. Open chest and side areas keep the carrier visually light.",
        principle: "Keep each module, attachment, and fit adjustment identifiable.",
        keywords: ["Modular", "Adjustable", "Open coverage"],
        contextTitle: "Proposed applications",
        context: "Warehouse picking, event installation, and horticulture.",
        camera: overviewCamera
      },
      module: {
        title: ["Two individually", "mounted modules."],
        description: "Each long unit has its own upper attachment, a flexible protected textile span, and a lower connection to the passive transfer band.",
        principle: "Make the module boundary and both connection ends readable while leaving room for the textile span to gather.",
        keywords: ["Independent mounting", "Flexible span", "Defined terminals"],
        contextTitle: "Detail to evaluate",
        context: "Alignment, movement relative to the harness, and access for inspection or replacement.",
        camera: {target: "0m 1.35m -0.15m", orbit: "160deg 81deg 1.45m", fieldOfView: "33deg"}
      },
      cooling: {
        title: ["Local fans,", "defined outputs."],
        description: "Each module ends in a local fan and output assembly. A separate passive band carries the connection toward the same-side thigh anchor.",
        principle: "Keep the fan mount and transmission fitting local so the middle of the module can remain flexible.",
        keywords: ["Local cooling", "Output fitting", "Passive transfer"],
        contextTitle: "Detail to evaluate",
        context: "The airflow route through each long textile region and the clearance around the moving lower terminal.",
        camera: {target: "0.055m 1.12m -0.17m", orbit: "150deg 82deg 0.88m", fieldOfView: "33deg"}
      },
      anchors: {
        title: ["Independent fit", "at each thigh."],
        description: "Two high cuffs close at the front and connect to the rear transfer bands. Each cuff has its own circumference adjustment.",
        principle: "Concentrate contact and padding at the anchors, with clear routes from the modules to the legs.",
        keywords: ["High cuffs", "Separate adjustment", "Open pelvis"],
        contextTitle: "Detail to evaluate",
        context: "Cuff migration during walking and bending, and the balance between the two transmission routes.",
        camera: {target: "0m 0.87m -0.03m", orbit: "145deg 85deg 1.15m", fieldOfView: "33deg"}
      },
      battery: batteryTopic
    }
  },
  A: {
    code: "A",
    label: "Semi-open",
    model: "assets/models/BLUE_v1-web.glb",
    modelLabel: "BLUE v1 · 3D design model",
    cameraLimits: {min: "auto 20deg 0.15m", max: "auto 155deg 3m"},
    reference: "assets/references/A-reference.jpg",
    sideReference: "assets/references/A-side.jpg",
    alt: "Textured BLUE v1 semi-independent blue vest design, with a white carrier garment, rear assistance module, and external chest battery.",
    theme: {accent: "#3b6c89", dark: "#294e64", soft: "#eaf1f5"},
    hotspots: {
      module: "0.055m 0.565m -0.095m",
      cooling: "0m 0.48m -0.115m",
      anchors: "0.16m 0.105m -0.07m",
      battery: "0.08m 0.525m 0.105m"
    },
    topics: {
      overview: {
        title: ["A contoured module,", "a shared vest."],
        description: "A blue zip-front vest carries a separate rear module over work clothing. Lateral thigh panels and adjustable bands connect the vest to the lower anchors.",
        principle: "Use the vest as a common support while preserving a readable interface around the flexible module.",
        keywords: ["Shared carrier", "Contoured", "Semi-independent"],
        contextTitle: "Proposed applications",
        context: "Manufacturing, facility maintenance, and workshop tasks.",
        camera: {
          target: "0m 0.34m 0m", orbit: "145deg 83deg 1.85m", fieldOfView: "33deg",
          mobile: {target: "0m 0.31m 0m", orbit: "145deg 83deg 2.05m"}
        }
      },
      module: {
        title: ["A curved outline,", "a distinct boundary."],
        description: "The blue rear panel has a defined bound edge, an upper retention strap, and a central fan. It sits on the shared vest carrier, with separate straps continuing toward the thigh anchors.",
        principle: "Follow the back contour while allowing the flexible module and its backing to move relative to each other.",
        keywords: ["Contoured cover", "Bound edge", "Local mounting"],
        contextTitle: "Detail to evaluate",
        context: "Working-component clearance, airflow space, and lower-terminal travel through a bend.",
        camera: {target: "0m 0.49m -0.06m", orbit: "160deg 82deg 0.95m", fieldOfView: "33deg"}
      },
      cooling: {
        title: ["A central fan,", "distinct load paths."],
        description: "A central fan sits on the external blue back panel. Separate posterior straps continue from the lower vest toward the thigh anchors.",
        principle: "Let the fan, outlet, and load connections express their own roles within the assembly.",
        keywords: ["Central fan", "External module", "Posterior straps"],
        contextTitle: "Detail to evaluate",
        context: "Airflow through the rear module and clearance around the straps as the wearer bends.",
        camera: {target: "0m 0.48m -0.09m", orbit: "180deg 85deg 0.58m", fieldOfView: "33deg"}
      },
      anchors: {
        title: ["Long lateral panels,", "lower thigh anchors."],
        description: "Narrow outer-thigh panels extend to lower anchor bands. The seat and the main front and rear thigh surfaces stay open.",
        principle: "Continue the connection along the sides while giving each lower band a defined adjustment and attachment.",
        keywords: ["Lateral support", "Lower bands", "Open seat"],
        contextTitle: "Detail to evaluate",
        context: "Panel rotation, contact pressure, and alignment between the posterior straps and lower anchors.",
        camera: {target: "0m 0.17m 0m", orbit: "130deg 83deg 1m", fieldOfView: "33deg"}
      },
      battery: {
        ...batteryTopic,
        description: "The external battery sits on the wearer's left chest, with front-facing controls and a cable route toward the lower vest.",
        context: "The current model shows the battery housing and front controls. Docking, cable retention, and release access remain details to develop.",
        camera: {target: "0.08m 0.525m 0.075m", orbit: "-20deg 83deg 0.58m", fieldOfView: "33deg"}
      }
    }
  },
  D: {
    code: "D",
    label: "Embedded",
    model: "assets/models/D.glb",
    reference: "assets/references/D-reference.jpg",
    sideReference: "assets/references/D-side.jpg",
    alt: "Schematic orange side-opening tabard with an embedded rear textile working region, upper fan, and reinforced support shorts.",
    theme: {accent: "#ad6243", dark: "#80472f", soft: "#f7eee9"},
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
