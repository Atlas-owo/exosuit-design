import {cp, mkdir, rm} from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "dist");
const output = path.join(root, "build");

await rm(output, {recursive: true, force: true});
await mkdir(output, {recursive: true});
await cp(source, output, {
  recursive: true,
  filter(filename) {
    const relative = path.relative(source, filename);
    // Keep authoring files local; publish the optimised model under assets/models.
    return path.basename(filename) !== ".DS_Store"
      && !/\.blend\d*$/i.test(filename)
      && relative !== path.join("assets", "BLUE_v1.glb");
  }
});
console.log("Built the website in build/ with the web model and without source GLB/Blender files.");
