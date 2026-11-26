import {cp, mkdir, rm} from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {designs} from "../dist/designs.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "dist");
const output = path.join(root, "build");
const publishedModels = new Set(Object.values(designs).flatMap(design => [design.model, design.equipmentModel].filter(Boolean)));

await rm(output, {recursive: true, force: true});
await mkdir(output, {recursive: true});
await cp(source, output, {
  recursive: true,
  filter(filename) {
    const relative = path.relative(source, filename);
    // Publish the active models; keep source files and the authoring material pack local.
    return path.basename(filename) !== ".DS_Store"
      && !/\.blend\d*$/i.test(filename)
      && relative !== path.join("assets", "三套配色_中文材质包")
      && (!/\.glb$/i.test(filename) || publishedModels.has(relative.split(path.sep).join("/")));
  }
});
console.log("Built the website in build/ with the web model and without source GLB/Blender files.");
