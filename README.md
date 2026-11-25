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

## Models and editing

The semi-open design uses `dist/assets/models/BLUE_v1-web.glb`: an 18 MB version of BLUE v1 with 366,146 triangles and the original 4K colour map. Open and embedded designs retain their schematic models. The previous A placeholder is retained in `assets/models/A.glb`.

Only web assets are included in this repository. Original Blender files, the full-resolution source GLB, generated builds, and local conversion tools are ignored and excluded from the publication build.

`dist/designs.js` contains model paths, descriptions, camera targets, zoom limits, hotspot coordinates, and reference images. BLUE v1 uses its own overview and mobile framing. Its web model retains metre scale, with its bottom at y = 0 and its horizontal centre at x = z = 0.

Google model-viewer and DM Sans are bundled locally, with their licenses in `dist/vendor/` and `dist/assets/`.
