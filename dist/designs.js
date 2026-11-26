// Per-design model, camera and hotspot settings.
// Camera targets and hotspot positions use metres in each GLB's coordinate system.
import {orangeHumanView} from "./orange-human-view.js";
import {greenHumanView} from "./green-human-view.js";

const neutralTheme = {accent: "#646464", dark: "#373737", soft: "#f0f0f0"};

export const overviewCamera = orangeHumanView.cameras.overview;

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
    number: "Design 01",
    label: "Modular Harness Exosuit",
    model: "assets/models/GREEN_v4-web.glb",
    equipmentModel: "assets/models/GREEN_K-web.glb",
    modelLabel: "GREEN v4 · 3D design model",
    viewAngles: {front: "0deg", back: "180deg", side: "90deg"},
    reference: "assets/references/design-01-reference.png",
    referenceWidth: 1550,
    referenceHeight: 1166,
    sideReference: "assets/references/B-v3-side.jpg",
    referenceKind: "model",
    referenceLabel: "Design reference",
    referenceNote: "Front and rear three-quarter design views supplied by the designer.",
    alt: "Green modular harness exosuit worn on a neutral human mannequin, with two rear textile modules, local fans, an adjustable waist belt and separate thigh cuffs.",
    theme: neutralTheme,
    hotspots: greenHumanView.hotspots,
    hotspotNormals: greenHumanView.hotspotNormals,
    topics: {
      overview: {
        title: ["Independent modules,", "an open harness."],
        description: "An open shoulder harness and a separate waist belt carry two protected rear working modules. Passive transfer straps continue to independently adjustable thigh cuffs, keeping the torso centre open.",
        principle: "Separate upper support, waist fit and thigh closures while keeping the rear assistance path understandable.",
        keywords: ["Open harness", "Independent fit", "Defined mounts"],
        contextTitle: "Workwear reference",
        context: "Logistics equipment harnesses inform the chest-device mount, accessible waist belt and independently adjustable lower interfaces.",
        camera: greenHumanView.cameras.overview
      },
      module: {
        title: ["Two individually", "mounted modules."],
        description: "The shoulder yoke connects to two distinct rear module mounts through reinforced textile interfaces. Each continuous cover protects a flexible working span, with local hardware at its ends.",
        principle: "Keep the mounting boundary visible and local hardware separate from the changing-length textile region.",
        keywords: ["Independent mounting", "Flexible span", "Defined terminals"],
        contextTitle: "Detail to evaluate",
        context: "Alignment, movement relative to the harness, and access for inspection or replacement.",
        camera: greenHumanView.cameras.module
      },
      cooling: {
        title: ["Local fans,", "defined outputs."],
        description: "Each module ends in a local fan and output assembly. A separate passive band carries the connection toward the same-side thigh anchor.",
        principle: "Keep the fan mount and transmission fitting local so the middle of the module can remain flexible.",
        keywords: ["Local cooling", "Output fitting", "Passive transfer"],
        contextTitle: "Detail to evaluate",
        context: "The airflow route through each long textile region and the clearance around the moving lower terminal.",
        camera: greenHumanView.cameras.cooling
      },
      anchors: {
        title: ["Independent fit", "at each thigh."],
        description: "Narrow thigh cuffs replace the earlier high hip wraps. Each cuff has a separate opening and fit adjustment, with reinforced attachments joining the rear transfer straps to the padded contact area.",
        principle: "Give each thigh an identifiable closure and a direct connection to its transfer path.",
        keywords: ["Narrow cuffs", "Separate adjustment", "Padded contact"],
        contextTitle: "Detail to evaluate",
        context: "Cuff migration during walking and bending, and the balance between the two transmission routes.",
        camera: greenHumanView.cameras.anchors
      },
      battery: {
        ...batteryTopic,
        description: "A defined shoulder-strap mount carries the chest battery, with visible controls and tactile operating details. Its placement leaves the separate waist belt available for fitting.",
        principle: "Separate equipment access from the waist closure and keep the operating surface easy to identify.",
        contextTitle: "Access to review",
        context: "Battery retention, connector access and release should be developed alongside the independent harness adjustments.",
        camera: greenHumanView.cameras.battery
      }
    }
  },
  A: {
    code: "A",
    number: "Design 02",
    label: "Vest-Mounted Exosuit",
    model: "assets/models/BLUE_v3-web.glb",
    equipmentModel: "assets/models/BLUE_K-web.glb",
    modelLabel: "BLUE v3 · 3D design model",
    reference: "assets/references/design-02-reference.png",
    referenceWidth: 1598,
    referenceHeight: 1118,
    sideReference: "assets/references/A-v3-side.jpg",
    referenceKind: "model",
    referenceLabel: "Design reference",
    referenceNote: "Front and rear three-quarter design views supplied by the designer.",
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
        description: "A front-opening vest carries the rear working region and overlaps a wide adjustable waist flap. Lateral strips extend along the outer hips to separately buckled thigh cuffs.",
        principle: "Use a familiar garment opening and shared carrier while giving torso and thigh fit their own adjustments.",
        keywords: ["Front opening", "Shared carrier", "Waist overlap"],
        contextTitle: "Workwear reference",
        context: "The Continuous Carrier and Care and Service Vest studies inform the front opening, mesh panels, chest-device placement and coordinated upper-to-lower fit.",
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
        description: "The rear working region groups a central cooling fan and a lower airflow opening. Separate posterior straps continue toward the thigh interfaces so ventilation and transmission remain identifiable.",
        principle: "Let the fan, outlet, and load connections express their own roles within the assembly.",
        keywords: ["Central fan", "Lower outlet", "Posterior straps"],
        contextTitle: "Drawing reference",
        context: "The concept drawing specifies a Ø 100 mm cooling fan and a 175 × 35 mm air intake. Airflow and clearance remain topics for further development.",
        camera: {target: "0m 0.715m -0.12m", orbit: "180deg 85deg 0.84m", fieldOfView: "33deg"}
      },
      anchors: {
        title: ["Long lateral panels,", "lower thigh anchors."],
        description: "Narrow side strips connect the shared vest to buckled thigh cuffs along the outer hips. The lower closures retain their own fitting adjustment while the seat remains open.",
        principle: "Coordinate the lateral connection with independent cuff adjustment and clear attachment boundaries.",
        keywords: ["Lateral connection", "Buckled cuffs", "Open seat"],
        contextTitle: "Detail to evaluate",
        context: "Panel rotation, contact pressure, and alignment between the posterior straps and lower anchors.",
        camera: {target: "0m 0.27m 0m", orbit: "130deg 83deg 1.4m", fieldOfView: "33deg"}
      },
      battery: {
        ...batteryTopic,
        description: "The chest battery occupies a defined front mount above the adjustable waist flap. Its front-facing controls and retention detail keep operation separate from dressing and fit adjustment.",
        contextTitle: "Drawing reference",
        context: "The drawing gives an 80 × 160 mm battery-module envelope and a 205 × 155 mm waist flap. Mounting, cable retention and release require further refinement.",
        camera: {target: "0.08m 0.775m 0.11m", orbit: "-20deg 83deg 0.84m", fieldOfView: "33deg"}
      }
    }
  },
  D: {
    code: "D",
    number: "Design 03",
    label: "Garment-Integrated Exosuit",
    model: "assets/models/Orange_H-web.glb",
    equipmentModel: "assets/models/ORANGE_K-web.glb",
    reference: "assets/references/design-03-reference.png",
    referenceWidth: 1556,
    referenceHeight: 1112,
    sideReference: "assets/references/D-model-side.jpg",
    referenceKind: "model",
    referenceLabel: "Design reference",
    referenceNote: "Front and rear three-quarter design views supplied by the designer.",
    alt: "Orange garment-integrated exosuit and support shorts worn on a neutral human mannequin, with a rear working region, cooling fan and chest battery.",
    theme: neutralTheme,
    hotspots: orangeHumanView.hotspots,
    hotspotNormals: orangeHumanView.hotspotNormals,
    topics: {
      overview: {
        title: ["Assistance within", "the garment."],
        description: "A side-fastening top pairs with wrapover support shorts. The working region sits within the layered back garment, while waist guides organize the transfer route toward adjustable thigh interfaces.",
        principle: "Develop containment, entry and lower-body fitting as parts of a coordinated two-garment system.",
        keywords: ["Layered top", "Support shorts", "Waist guides"],
        contextTitle: "Garment references",
        context: "The Tabard and Support Shorts structure combines side-opening servicewear with activewear cues, shoulder mesh and bound garment edges.",
        camera: overviewCamera
      },
      module: {
        title: ["Flexible volume", "within a back panel."],
        description: "The embedded working region occupies the layered back panel, with continuous textile surfaces, soft edges and sewn transitions. The garment reserves internal volume for the flexible assembly.",
        principle: "Allow internal movement and contraction within a continuous garment construction.",
        keywords: ["Textile volume", "Continuous panel", "Sewn transitions"],
        contextTitle: "Detail to evaluate",
        context: "Internal layer movement, working clearance and component access need refinement. The mannequin view shows garment placement; Exosuit Only allows separate inspection of the equipment.",
        camera: orangeHumanView.cameras.module
      },
      cooling: {
        title: ["Airflow through", "the back panel."],
        description: "The upper fan and lower mesh outlet form local interfaces in the integrated textile region. Output bands leave below the outlet toward the waist guides.",
        principle: "Provide a defined cooling passage while keeping the long working span flexible.",
        keywords: ["Upper fan", "Integrated passage", "Lower mesh outlet"],
        contextTitle: "Detail to evaluate",
        context: "The internal air passage and textile clearance when the wearer bends or sits.",
        camera: orangeHumanView.cameras.cooling
      },
      anchors: {
        title: ["Transmission guided", "into support shorts."],
        description: "The support shorts bring the waist, seat and thigh contact regions into one lower garment. Transfer guides connect the upper working region to adjustable bands and defined thigh interfaces.",
        principle: "Coordinate the transfer route with separately identifiable waist and thigh adjustments on the shorts.",
        keywords: ["Waist guides", "Adjustable bands", "Support shorts"],
        contextTitle: "Detail to evaluate",
        context: "Alignment between the tabard and shorts, donning over work clothing, and pressure during movement.",
        camera: orangeHumanView.cameras.anchors
      },
      battery: {...batteryTopic, camera: orangeHumanView.cameras.battery}
    }
  }
};
