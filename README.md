# SARTEXO Design Explorer

Interactive English presentation of Modular Harness Exosuit, Vest-Mounted Exosuit, and Garment-Integrated Exosuit.

Run `npm start` and open the printed local address. Run `npm run check` to verify the page resources and model structures. The editable website is in `dist/`. Run `npm run build` to prepare `build/` for publication, then `node scripts/check.mjs build` to verify the packaged resources.

## Current models

The Human + Exosuit versions use `dist/assets/models/GREEN_v4-web.glb` for Modular Harness Exosuit, `dist/assets/models/BLUE_v3-web.glb` for Vest-Mounted Exosuit, and `dist/assets/models/Orange_H-web.glb` for Garment-Integrated Exosuit. Design 01 uses the supplied GREEN_v4.glb, Design 02 is exported from its v3 Blender file, and Design 03 uses Orange_H.glb in place of the earlier schematic model.

| Design | Web model | Triangles | File size |
| --- | --- | ---: | ---: |
| Modular Harness Exosuit | GREEN v4 | 468,140 | 21,946,584 bytes |
| Vest-Mounted Exosuit | BLUE v3 | 474,002 | 22,520,364 bytes |
| Garment-Integrated Exosuit | Orange H | 489,242 | 22,555,764 bytes |

The web models retain their original color maps; normal and metallic/roughness maps use 2K JPEG. Mesh simplification targets a ratio of 0.05, with a relative error limit of 0.0005 for BLUE v3 and 0.0003 for GREEN v4 and Orange_H, preserving more triangles when topology or the error limit requires it. No external geometry decoder is needed.

The exports retain their input scale, face +Z, have their bottom at y = 0, and are centred horizontally at x = z = 0. Approximate green and blue bounds:

- GREEN v4: x = ±0.271 m, y = 0–0.981 m, z = ±0.137 m.
- BLUE v3: x = ±0.324 m, y = 0–0.981 m, z = ±0.137 m.

`dist/designs.js` defines model paths, design numbers, per-design camera targets and orbits, mobile framing, hotspot coordinates and normals, descriptions, and references. Designs are numbered 01–03 in the current green, blue and orange order. Front, back, and side presets inherit the selected design's overview framing. View presets and detail buttons share one horizontally scrolling row. Each selected camera framing allows 1×–2× zoom by default; it can be disabled in Lighting studio. View changes use camera interpolation, with temporary distance limits that permit a smooth move between overview and detail framing. System reduced-motion preferences are respected.

The model-version control switches between Human + Exosuit and Exosuit Only. `model` is the existing version with a human figure. The three supplied standalone models are assigned to `equipmentModel`:

| Design | Exosuit Only web model | Triangles | File size |
| --- | --- | ---: | ---: |
| Design 01 · Modular Harness Exosuit | GREEN_K-web.glb | 619,986 | 30,061,552 bytes |
| Design 02 · Vest-Mounted Exosuit | BLUE_K-web.glb | 723,998 | 34,514,960 bytes |
| Design 03 · Garment-Integrated Exosuit | ORANGE_K-web.glb | 687,514 | 30,866,560 bytes |

The standalone web files are generated directly from the supplied K GLBs, including BLUE_K.glb; conversion from BLUE_K.blend is unnecessary. They retain their original color textures, with 2K JPEG data maps and mesh simplification constrained by a relative error of 0.0003. `dist/equipment-views.js` supplies separate overview/detail cameras and surface-projected hotspots for the standalone geometry. The input scale is retained, with horizontal centering and the model bottom at y = 0. Changing the design or model version resets the topic and viewpoint to Overview. The former keyword badges below Design intent have been removed.

Original Blender/GLB files, the authoring material pack, and local conversion tools remain local. The publication build includes the six configured model versions; previous web models and schematic backups remain in the source assets. The large original K GLBs are ignored by Git. Conversion scripts and reports are in the ignored `output/model-tools/` directory.

Design 03's Human + Exosuit view has separate camera and surface-hotspot data in `dist/orange-human-view.js`. Orange_H is centered horizontally and placed at y = 0 without changing its input scale. Its light web export retains the original color texture and uses 2K JPEG data maps, with mesh simplification constrained by a relative error of 0.0003. The large source Orange_H.glb is ignored by Git and excluded from the publication build.

Design 01's updated Human + Exosuit view uses `dist/green-human-view.js` for GREEN v4 camera framing and surface-projected hotspots, including the default 45-degree overview. The large source GREEN_v4.glb remains local and is ignored by Git. The Exosuit Only model and supplied Design reference PNG remain unchanged.

The main Design reference images are the three supplied PNGs: `design-01-reference.png` (green), `design-02-reference.png` (blue), and `design-03-reference.png` (orange). Their original pixels and aspect ratios are preserved. Thumbnails and the default reference-dialog view always use these images, including when inspecting Design 03's module. The left-profile option retains the separate model renders with the user's chosen studio lighting. The interface uses a neutral gray theme across all three designs.

## Temporary lighting studio

The collapsed panel below the model controls adjusts a neutral softbox environment. The approved per-design defaults are in `dist/lighting-presets.js`, and the complete user selection is archived in `dist/assets/lighting/approved-settings.json`. The three local HDR files are generated with the same `studioHDR` function in `dist/lighting.js` used by the temporary controls. No external assets or service are required. Direction, elevation, distance, source size, key intensity, ambient fill, exposure, and contact-shadow intensity are editable. Distance affects inverse-square falloff and the angular size of the source; this is image-based illumination, with a separate soft ground contact shadow.

Further edits are stored separately for each design in browser local storage, with the approved selection used on first load and reset. Copy or download the JSON settings for all three designs, and optionally download the current design's HDR for offline rendering. The JSON records the coordinate convention, normalized light position, exposure, and tone mapping. The reference renders use the selected HDR and Khronos PBR Neutral tone mapping, with exposure converted to Blender's logarithmic scale. Offline ray tracing and the viewer's real-time rendering can differ slightly in highlights and contact shadows. The former page footer has been removed.

## Presentation content

The design introduction, component descriptions, study information and downloadable design notes have been updated from the supplied November 2026 `wearable.pdf`. `dist/study.js` contains the per-design development lineage, color references, material and finish direction, body interfaces and development priorities. These notes update when the selected design changes.

Figures extracted from PDF pages 29, 35 and 41 are in `dist/assets/study/`. The Materials, colors & finishes section uses 48 individual images in `dist/assets/study/cmf/`: four material samples, four finish details and eight mood-board references for each design. The source images are rendered directly from their PDF regions, with separate HTML captions and links to open each image. Material and Finish share the upper row; Mood board spans the full row below. The galleries use matching image sizes and aligned gutters, with responsive wrapping on smaller screens. The reusable extraction script is in the ignored `output/model-tools/extract-cmf-tiles.swift`.

The blue vest also includes the page-38 reference drawing and its four labeled component envelopes, with the 180 cm reference figure recorded. Dimensions are drawing references, not measurements of the display mesh. The document's concept illustrations remain separate from the interactive models.

The user confirmed retaining the existing website naming: green harness = Modular Harness Exosuit; blue vest = Vest-Mounted Exosuit; orange garment = Garment-Integrated Exosuit. Content is matched to model color and construction rather than the PDF's conflicting green/blue titles. Unfinished placeholder and force-analysis pages are not presented as completed engineering results. The full source PDF remains outside the website assets.

## Components

- Google model-viewer 4.1.0 is included locally in `dist/vendor/`.
- DM Sans is included locally in `dist/assets/`.
- The site runs with local assets and browser JavaScript.
