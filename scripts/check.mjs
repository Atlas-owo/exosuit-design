import assert from "node:assert/strict";
import {readFile, stat} from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {execFileSync} from "node:child_process";
import {designs} from "../dist/designs.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, process.argv[2] || "dist");
for (const file of ["app.js", "designs.js"]) {
  execFileSync(process.execPath, ["--check", path.join(dist, file)], {stdio: "inherit"});
}

const html = await readFile(path.join(dist, "index.html"), "utf8");
for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  const relative = match[1];
  if (/^(https?:|data:)/.test(relative) || relative === "./") continue;
  assert.ok((await stat(path.join(dist, relative))).isFile(), `Missing resource ${relative}`);
}

for (const design of Object.values(designs)) {
  const model = await readFile(path.join(dist, design.model));
  assert.equal(model.toString("ascii", 0, 4), "glTF");
  assert.equal(model.readUInt32LE(4), 2);
  assert.equal(model.readUInt32LE(8), model.length);
  const jsonLength = model.readUInt32LE(12);
  const document = JSON.parse(model.toString("utf8", 20, 20 + jsonLength));
  assert.ok(document.meshes.length > 0);
  assert.ok(document.materials.length > 0);
  const binaryOffset = 20 + jsonLength + 8;
  for (const accessor of document.accessors) {
    const view = document.bufferViews[accessor.bufferView];
    assert.ok(binaryOffset + view.byteOffset + view.byteLength <= model.length);
  }
  for (const topic of ["overview", "module", "cooling", "anchors", "battery"]) {
    assert.ok(design.topics[topic].camera.target);
    assert.ok(design.topics[topic].camera.orbit);
  }
  for (const reference of [design.reference, design.sideReference]) {
    assert.ok((await stat(path.join(dist, reference))).isFile());
  }
}
console.log("Verified JavaScript syntax, all page resources, three GLB structures, and all 15 design views.");
