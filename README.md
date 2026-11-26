# Exosuit Design

SARTEXO's interactive design explorer presents open (B), semi-open (A), and embedded (D) soft exosuit concepts with rotating 3D models and guided detail views.

## Local development

Use Node.js 22 or later. No dependency installation is needed.

```sh
npm start
npm run check
npm run build
node scripts/check.mjs build
```

`npm start` prints the local preview address. Edit the website in `dist/`; the build copies the deployable files into `build/`.

## GitHub Pages

The workflow in `.github/workflows/pages.yml` checks, builds, and publishes the website on every push to `main`. It can also be run manually from the repository's Actions tab.

In **Settings > Pages > Build and deployment**, the publishing source is **GitHub Actions**. The generated website is served at:

https://atlas-owo.github.io/exosuit-design/

All website assets use relative paths so the model viewer works under the repository's URL path.

## Current models

The open B design uses `dist/assets/models/GREEN_v3-web.glb` and the semi-open A design uses `dist/assets/models/BLUE_v3-web.glb`. They are exported from the matching v3 Blender files in `dist/assets/`. D uses its schematic model.

| Design | Web model | Triangles | File size |
| --- | --- | ---: | ---: |
| Open B | GREEN v3 | 376,280 | 18,491,108 bytes |
| Semi-open A | BLUE v3 | 474,002 | 22,520,364 bytes |

The v3 models retain their original 4K colour maps; normal and metallic/roughness maps use 2K JPEG. Mesh simplification targets a ratio of 0.05 with a relative error limit of 0.0005, preserving more triangles when topology or the error limit requires it. No external geometry decoder is needed.

Both exports retain metre scale, face +Z, have their bottom at y = 0, and are centred horizontally at x = z = 0. Approximate bounds:

- GREEN v3: x = ±0.321 m, y = 0–0.981 m, z = ±0.142 m.
- BLUE v3: x = ±0.324 m, y = 0–0.981 m, z = ±0.137 m.

`dist/designs.js` defines model paths, per-design camera targets and orbits, mobile framing, zoom limits, hotspot coordinates and normals, descriptions, and references. Front, back, and side presets inherit the selected design's overview framing.

Original Blender/GLB files, the authoring material pack, and local conversion tools remain local. The publication build includes only the three active models; previous web models and schematic backups remain in the source assets. Conversion scripts and reports are in the ignored `output/model-tools/` directory.

The reference images show the earlier design concepts; the interactive v3 models show the current supplied geometry.

## Components

- Google model-viewer 4.1.0 is included locally in `dist/vendor/`.
- DM Sans is included locally in `dist/assets/`.
- The site runs with local assets and browser JavaScript.
