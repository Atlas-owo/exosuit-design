# SARTEXO Design Explorer

Interactive English presentation of Modular Harness Exosuit, Vest-Mounted Exosuit, and Garment-Integrated Exosuit.

Run `npm start` and open the printed local address. Run `npm run check` to verify the page resources and model structures. The editable website is in `dist/`. Run `npm run build` to prepare `build/` for publication, then `node scripts/check.mjs build` to verify the packaged resources.

## Current models

Modular Harness Exosuit uses `dist/assets/models/GREEN_v3-web.glb` and Vest-Mounted Exosuit uses `dist/assets/models/BLUE_v3-web.glb`. They are exported from the matching v3 Blender files in `dist/assets/`. Garment-Integrated Exosuit uses its schematic model.

| Design | Web model | Triangles | File size |
| --- | --- | ---: | ---: |
| Modular Harness Exosuit | GREEN v3 | 376,280 | 18,491,108 bytes |
| Vest-Mounted Exosuit | BLUE v3 | 474,002 | 22,520,364 bytes |

The v3 models retain their original 4K colour maps; normal and metallic/roughness maps use 2K JPEG. Mesh simplification targets a ratio of 0.05 with a relative error limit of 0.0005, preserving more triangles when topology or the error limit requires it. No external geometry decoder is needed.

Both exports retain metre scale, face +Z, have their bottom at y = 0, and are centred horizontally at x = z = 0. Approximate bounds:

- GREEN v3: x = ±0.321 m, y = 0–0.981 m, z = ±0.142 m.
- BLUE v3: x = ±0.324 m, y = 0–0.981 m, z = ±0.137 m.

`dist/designs.js` defines model paths, per-design camera targets and orbits, mobile framing, hotspot coordinates and normals, descriptions, and references. Front, back, and side presets inherit the selected design's overview framing. View presets and detail buttons share one horizontally scrolling row. Each selected camera framing allows 1×–2× zoom, with a fixed field of view and camera distance limited to half its initial radius.

Original Blender/GLB files, the authoring material pack, and local conversion tools remain local. The publication build includes only the three active models; previous web models and schematic backups remain in the source assets. Conversion scripts and reports are in the ignored `output/model-tools/` directory.

All three designs have paired front/back and left-side reference images rendered from their active web models with the user's chosen studio lighting. Garment-Integrated Exosuit uses its schematic model. The interface uses a neutral gray theme across all three designs.

## Temporary lighting studio

The collapsed panel below the model controls adjusts a neutral softbox environment. The approved per-design defaults are in `dist/lighting-presets.js`, and the complete user selection is archived in `dist/assets/lighting/approved-settings.json`. The three local HDR files are generated with the same `studioHDR` function in `dist/lighting.js` used by the temporary controls. No external assets or service are required. Direction, elevation, distance, source size, key intensity, ambient fill, exposure, and contact-shadow intensity are editable. Distance affects inverse-square falloff and the angular size of the source; this is image-based illumination, with a separate soft ground contact shadow.

Further edits are stored separately for each design in browser local storage, with the approved selection used on first load and reset. Copy or download the JSON settings for all three designs, and optionally download the current design's HDR for offline rendering. The JSON records the coordinate convention, normalized light position, exposure, and tone mapping. The reference renders use the selected HDR and Khronos PBR Neutral tone mapping, with exposure converted to Blender's logarithmic scale. Offline ray tracing and the viewer's real-time rendering can differ slightly in highlights and contact shadows. The former page footer has been removed.

## Components

- Google model-viewer 4.1.0 is included locally in `dist/vendor/`.
- DM Sans is included locally in `dist/assets/`.
- The site runs with local assets and browser JavaScript.
