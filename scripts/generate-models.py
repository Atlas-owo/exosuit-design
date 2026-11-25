#!/usr/bin/env python3
"""Generate three lightweight, schematic exosuit GLB placeholders."""
from pathlib import Path
import json
import math
import struct

ROOT = Path(__file__).resolve().parents[1]
TAU = 2 * math.pi


def color(hex_value):
    rgb = [int(hex_value[index:index + 2], 16) / 255 for index in (0, 2, 4)]
    return [value / 12.92 if value <= 0.04045 else ((value + 0.055) / 1.055) ** 2.4 for value in rgb] + [1]


class Model:
    def __init__(self, code, accent):
        self.data = bytearray()
        self.doc = {
            "asset": {"version": "2.0", "generator": "SARTEXO schematic placeholder generator"},
            "scene": 0, "scenes": [{"nodes": []}], "nodes": [], "meshes": [],
            "materials": [], "bufferViews": [], "accessors": [], "buffers": [],
            "extras": {"design": code, "status": "Schematic placeholder", "units": "metres"}
        }
        self.materials = {}
        palette = {
            "mannequin": ("CDD1D3", 0.8, 0),
            "underlayer": ("E1E4E6", 0.95, 0),
            "trousers": ("C3C9CD", 0.95, 0),
            "fabric": (accent, 0.88, 0),
            "mesh": ({"B": "A2AD91", "A": "8299A6", "D": "8E999D"}[code], 0.98, 0),
            "webbing": ("313B40", 0.9, 0),
            "hardware": ("252E33", 0.43, 0.06),
            "fan": ("151F24", 0.45, 0.08),
            "indicator": ("F5F7EE", 0.5, 0),
            "control": ({"B": "D5A74B", "A": "43B5B2", "D": "D9DCD3"}[code], 0.6, 0),
        }
        for name, (hex_value, roughness, metallic) in palette.items():
            self.materials[name] = len(self.doc["materials"])
            self.doc["materials"].append({
                "name": name, "doubleSided": True,
                "pbrMetallicRoughness": {
                    "baseColorFactor": color(hex_value),
                    "metallicFactor": metallic, "roughnessFactor": roughness
                }
            })

    def accessor(self, values, component_type, shape, target, bounds=False):
        count = len(values)
        flattened = [component for value in values for component in value] if isinstance(values[0], (list, tuple)) else values
        fmt = "f" if component_type == 5126 else "I"
        while len(self.data) % 4:
            self.data.append(0)
        offset = len(self.data)
        self.data.extend(struct.pack("<" + fmt * len(flattened), *flattened))
        view_index = len(self.doc["bufferViews"])
        self.doc["bufferViews"].append({
            "buffer": 0, "byteOffset": offset, "byteLength": len(flattened) * 4, "target": target
        })
        accessor = {"bufferView": view_index, "componentType": component_type, "count": count, "type": shape}
        if bounds:
            accessor["min"] = [min(value[axis] for value in values) for axis in range(3)]
            accessor["max"] = [max(value[axis] for value in values) for axis in range(3)]
        self.doc["accessors"].append(accessor)
        return len(self.doc["accessors"]) - 1

    def mesh(self, name, positions, faces, material):
        normals = [[0.0, 0.0, 0.0] for _ in positions]
        for a, b, c in faces:
            u = [positions[b][axis] - positions[a][axis] for axis in range(3)]
            v = [positions[c][axis] - positions[a][axis] for axis in range(3)]
            normal = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]
            for vertex in (a, b, c):
                for axis in range(3):
                    normals[vertex][axis] += normal[axis]
        for normal in normals:
            length = math.sqrt(sum(value * value for value in normal)) or 1
            for axis in range(3):
                normal[axis] /= length
        position_accessor = self.accessor(positions, 5126, "VEC3", 34962, True)
        normal_accessor = self.accessor(normals, 5126, "VEC3", 34962)
        index_accessor = self.accessor([index for face in faces for index in face], 5125, "SCALAR", 34963)
        self.doc["meshes"].append({
            "name": name, "primitives": [{
                "attributes": {"POSITION": position_accessor, "NORMAL": normal_accessor},
                "indices": index_accessor, "material": self.materials[material]
            }]
        })
        node_index = len(self.doc["nodes"])
        self.doc["nodes"].append({"name": name, "mesh": len(self.doc["meshes"]) - 1})
        self.doc["scenes"][0]["nodes"].append(node_index)

    def ellipsoid(self, name, center, radius, material, segments=28, rings=18):
        vertices = []
        for ring in range(rings + 1):
            phi = math.pi * ring / rings
            for segment in range(segments + 1):
                theta = TAU * segment / segments
                vertices.append((
                    center[0] + radius[0] * math.sin(phi) * math.cos(theta),
                    center[1] + radius[1] * math.cos(phi),
                    center[2] + radius[2] * math.sin(phi) * math.sin(theta)
                ))
        faces = []
        for ring in range(rings):
            for segment in range(segments):
                a = ring * (segments + 1) + segment
                b = a + segments + 1
                faces.extend([(a, a + 1, b), (a + 1, b + 1, b)])
        self.mesh(name, vertices, faces, material)

    def tube(self, name, start, end, radius_start, radius_end, material, segments=16):
        direction = [end[axis] - start[axis] for axis in range(3)]
        length = math.sqrt(sum(value * value for value in direction))
        axis = [value / length for value in direction]
        helper = [0, 0, 1] if abs(axis[2]) < 0.9 else [1, 0, 0]
        tangent = [axis[1] * helper[2] - axis[2] * helper[1], axis[2] * helper[0] - axis[0] * helper[2], axis[0] * helper[1] - axis[1] * helper[0]]
        tangent_length = math.sqrt(sum(value * value for value in tangent))
        tangent = [value / tangent_length for value in tangent]
        bitangent = [axis[1] * tangent[2] - axis[2] * tangent[1], axis[2] * tangent[0] - axis[0] * tangent[2], axis[0] * tangent[1] - axis[1] * tangent[0]]
        vertices = []
        for center, radius in ((start, radius_start), (end, radius_end)):
            for segment in range(segments):
                angle = TAU * segment / segments
                vertices.append(tuple(center[d] + radius * (tangent[d] * math.cos(angle) + bitangent[d] * math.sin(angle)) for d in range(3)))
        vertices.extend([start, end])
        faces = []
        for segment in range(segments):
            nxt = (segment + 1) % segments
            faces.extend([(segment, nxt, segments + segment), (nxt, segments + nxt, segments + segment)])
            faces.extend([(2 * segments, nxt, segment), (2 * segments + 1, segments + segment, segments + nxt)])
        self.mesh(name, vertices, faces, material)

    def band(self, name, center, rx, rz, height, material, start=0, end=TAU, segments=48):
        vertices = []
        for y in (center[1] - height / 2, center[1] + height / 2):
            for step in range(segments + 1):
                angle = start + (end - start) * step / segments
                vertices.append((center[0] + rx * math.sin(angle), y, center[2] + rz * math.cos(angle)))
        faces = []
        for step in range(segments):
            top = segments + 1 + step
            faces.extend([(step, top, step + 1), (step + 1, top, top + 1)])
        self.mesh(name, vertices, faces, material)

    def panel(self, name, outline, z, depth, material):
        cx = sum(point[0] for point in outline) / len(outline)
        cy = sum(point[1] for point in outline) / len(outline)
        outward = 1 if z >= 0 else -1
        count = len(outline)
        vertices = []
        for scale, dz in ((1, 0), (0.96, outward * depth * 0.7), (0.87, outward * depth)):
            vertices.extend((cx + (x - cx) * scale, cy + (y - cy) * scale, z + dz) for x, y in outline)
        vertices.append((cx, cy, z + outward * depth * 1.03))
        faces = []
        for ring in range(2):
            for step in range(count):
                nxt = (step + 1) % count
                faces.extend([(ring * count + step, ring * count + nxt, (ring + 1) * count + step), (ring * count + nxt, (ring + 1) * count + nxt, (ring + 1) * count + step)])
        for step in range(count):
            faces.append((2 * count + step, 2 * count + (step + 1) % count, 3 * count))
        if outward < 0:
            faces = [(a, c, b) for a, b, c in faces]
        self.mesh(name, vertices, faces, material)

    def rectangle(self, name, x, y, width, height, z, depth, material, bevel=0.012):
        b = min(bevel, width / 3, height / 3)
        outline = [
            (x - width / 2 + b, y - height / 2), (x + width / 2 - b, y - height / 2),
            (x + width / 2, y - height / 2 + b), (x + width / 2, y + height / 2 - b),
            (x + width / 2 - b, y + height / 2), (x - width / 2 + b, y + height / 2),
            (x - width / 2, y + height / 2 - b), (x - width / 2, y - height / 2 + b)
        ]
        self.panel(name, outline, z, depth, material)

    def ribbon(self, name, start, end, width, material, depth=0.006):
        dx, dy = end[0] - start[0], end[1] - start[1]
        length = math.hypot(dx, dy)
        ox, oy = -dy / length * width / 2, dx / length * width / 2
        z = (start[2] + end[2]) / 2
        self.panel(name, [(start[0] - ox, start[1] - oy), (end[0] - ox, end[1] - oy), (end[0] + ox, end[1] + oy), (start[0] + ox, start[1] + oy)], z, depth, material)

    def fan(self, x, y, z, size=0.046):
        self.rectangle("Fan mounting frame", x, y, size * 2.25, size * 2.25, z, 0.008, "hardware", 0.014)
        outer_z = z - 0.013
        self.tube("Fan recessed cavity", (x, y, outer_z + 0.003), (x, y, outer_z - 0.003), size, size, "fan", 36)
        for ring in (0.5, 0.78, 1.0):
            last = None
            for step in range(49):
                angle = TAU * step / 48
                point = (x + size * ring * math.cos(angle), y + size * ring * math.sin(angle), outer_z - 0.008)
                if last is not None:
                    self.tube("Fan protective grille", last, point, 0.0012, 0.0012, "mesh", 5)
                last = point
        for step in range(6):
            angle = TAU * step / 6
            self.tube("Fan grille support", (x, y, outer_z - 0.008), (x + size * math.cos(angle), y + size * math.sin(angle), outer_z - 0.008), 0.0015, 0.0015, "hardware", 6)
        self.ellipsoid("Fan hub", (x, y, outer_z - 0.01), (0.009, 0.009, 0.004), "hardware", 12, 8)

    def save(self, filename):
        self.doc["buffers"] = [{"byteLength": len(self.data)}]
        encoded = json.dumps(self.doc, separators=(",", ":")).encode()
        encoded += b" " * ((-len(encoded)) % 4)
        binary = bytes(self.data)
        binary += b"\x00" * ((-len(binary)) % 4)
        total = 12 + 8 + len(encoded) + 8 + len(binary)
        output = struct.pack("<4sII", b"glTF", 2, total)
        output += struct.pack("<I4s", len(encoded), b"JSON") + encoded
        output += struct.pack("<I4s", len(binary), b"BIN\x00") + binary
        filename.write_bytes(output)
        print(f"{filename.name}: {len(output):,} bytes, {len(self.doc['meshes'])} meshes")


def mannequin(model):
    model.ellipsoid("Faceless presentation mannequin", (0, 1.775, 0.005), (0.095, 0.128, 0.09), "mannequin")
    model.tube("Neck", (0, 1.59, 0), (0, 1.69, 0), 0.058, 0.054, "mannequin")
    model.ellipsoid("Neutral shirt torso", (0, 1.365, 0), (0.23, 0.265, 0.125), "underlayer")
    model.ellipsoid("Neutral trousers pelvis", (0, 1.02, -0.01), (0.18, 0.16, 0.12), "trousers")
    for sign in (-1, 1):
        model.ellipsoid("Shirt sleeve", (sign * 0.246, 1.475, 0), (0.081, 0.115, 0.085), "underlayer")
        model.tube("Upper arm", (sign * 0.25, 1.49, 0), (sign * 0.30, 1.23, 0.005), 0.061, 0.045, "mannequin")
        model.ellipsoid("Elbow", (sign * 0.30, 1.23, 0.005), (0.045, 0.05, 0.045), "mannequin", 20, 12)
        model.tube("Forearm", (sign * 0.30, 1.23, 0.005), (sign * 0.335, 0.99, 0.03), 0.046, 0.029, "mannequin")
        model.ellipsoid("Hand", (sign * 0.337, 0.94, 0.035), (0.033, 0.071, 0.024), "mannequin", 18, 12)
        model.tube("Trouser leg upper", (sign * 0.095, 1.05, 0), (sign * 0.106, 0.58, 0.005), 0.087, 0.064, "trousers", 24)
        model.ellipsoid("Trouser knee", (sign * 0.106, 0.58, 0.005), (0.064, 0.07, 0.066), "trousers", 20, 12)
        model.tube("Trouser leg lower", (sign * 0.106, 0.58, 0.005), (sign * 0.11, 0.15, 0.01), 0.063, 0.042, "trousers", 24)
        model.ellipsoid("Neutral shoe", (sign * 0.11, 0.085, 0.04), (0.056, 0.06, 0.11), "hardware", 24, 12)


def battery(model):
    model.rectangle("External left chest battery dock", 0.135, 1.44, 0.085, 0.185, 0.115, 0.019, "webbing")
    model.rectangle("Battery housing", 0.135, 1.445, 0.072, 0.165, 0.142, 0.035, "hardware")
    model.rectangle("Battery stepped top", 0.135, 1.533, 0.067, 0.018, 0.145, 0.029, "hardware", 0.004)
    for index in range(4):
        model.ellipsoid("Battery charge indicator", (0.12 + index * 0.01, 1.49, 0.18), (0.0024, 0.0024, 0.0015), "indicator", 8, 6)
    model.ellipsoid("Battery power control", (0.135, 1.457, 0.18), (0.007, 0.007, 0.003), "fan", 12, 8)
    model.tube("Protected battery cable", (0.14, 1.36, 0.16), (0.11, 1.27, 0.13), 0.005, 0.005, "hardware")


def common_anchors(model, code):
    model.band("Broad padded waist interface", (0, 1.105, -0.003), 0.198, 0.139, 0.105, "fabric" if code != "D" else "webbing")
    model.band("Waist support webbing", (0, 1.10, -0.003), 0.202, 0.143, 0.038, "webbing")
    model.rectangle("Waist closure", 0, 1.10, 0.062, 0.05, 0.145, 0.009, "hardware", 0.006)
    for sign in (-1, 1):
        y = 0.82 if code == "B" else 0.67
        x = sign * 0.101
        model.band("Thigh anchor padded interface", (x, y, 0.003), 0.091, 0.092, 0.061, "fabric" if code == "B" else "webbing")
        model.band("Thigh anchor retaining band", (x, y - 0.008, 0.003), 0.093, 0.094, 0.027, "webbing")
        model.rectangle("Thigh closure buckle", x, y - 0.008, 0.046, 0.035, 0.098, 0.008, "hardware", 0.004)
        model.rectangle("Thigh operating tab", x + sign * 0.028, y - 0.008, 0.008, 0.026, 0.099, 0.009, "control", 0.003)
        start_x = sign * (0.09 if code == "B" else 0.135)
        end_x = sign * (0.10 if code == "B" else 0.15)
        model.ribbon("Passive posterior transmission band", (start_x, 1.045, -0.143), (end_x, y + 0.018, -0.11), 0.032, "webbing")
    battery(model)


def create(code, accent):
    model = Model(code, accent)
    mannequin(model)
    if code == "B":
        for sign in (-1, 1):
            x = sign * 0.14
            model.ribbon("Front padded shoulder rail", (x, 1.57, 0.078), (sign * 0.13, 1.37, 0.119), 0.07, "fabric", 0.018)
            model.ribbon("Front harness webbing", (sign * 0.13, 1.42, 0.13), (sign * 0.145, 1.16, 0.13), 0.034, "webbing")
            model.tube("Shoulder bridge", (x, 1.56, -0.09), (x, 1.56, 0.09), 0.033, 0.033, "fabric", 12)
            model.rectangle("Independent module perimeter", sign * 0.092, 1.315, 0.112, 0.47, -0.125, 0.033, "webbing")
            model.rectangle("Independent flexible working cover", sign * 0.092, 1.315, 0.101, 0.449, -0.145, 0.017, "fabric")
            model.rectangle("Independent upper module attachment", sign * 0.092, 1.56, 0.041, 0.051, -0.11, 0.014, "hardware", 0.006)
            model.rectangle("Upper ventilation panel", sign * 0.092, 1.505, 0.076, 0.021, -0.165, 0.004, "mesh", 0.005)
            model.fan(sign * 0.092, 1.12, -0.174, 0.033)
            model.rectangle("Lower output terminal", sign * 0.092, 1.062, 0.044, 0.032, -0.163, 0.014, "hardware", 0.006)
        model.rectangle("Shoulder yoke", 0, 1.585, 0.33, 0.065, -0.08, 0.02, "fabric")
        model.rectangle("Chest strap", 0, 1.45, 0.24, 0.025, 0.13, 0.009, "webbing", 0.004)
        model.rectangle("Chest buckle", 0, 1.45, 0.044, 0.036, 0.143, 0.01, "hardware", 0.004)
    else:
        for sign in (-1, 1):
            model.band("Garment front panel", (0, 1.36, 0), 0.22, 0.137, 0.43, "fabric", -1.05 if sign < 0 else 0.025, -0.025 if sign < 0 else 1.05, 24)
            model.tube("Garment shoulder bridge", (sign * 0.15, 1.57, -0.085), (sign * 0.15, 1.57, 0.085), 0.032, 0.032, "mesh", 12)
        model.band("Garment back carrier", (0, 1.36, -0.003), 0.218, 0.138, 0.43, "fabric", 2.08, 4.20, 40)
        if code == "A":
            model.rectangle("Center front zip", 0, 1.36, 0.009, 0.43, 0.143, 0.003, "hardware", 0.002)
            model.rectangle("Zipper operating pull", 0, 1.56, 0.012, 0.025, 0.148, 0.005, "control", 0.004)
            outline = [(-0.16, 1.075), (0.16, 1.075), (0.174, 1.105), (0.15, 1.24), (0.145, 1.32), (0.175, 1.49), (0.155, 1.555), (-0.155, 1.555), (-0.175, 1.49), (-0.145, 1.32), (-0.15, 1.24), (-0.174, 1.105)]
            model.panel("Semi-independent bound module edge", outline, -0.15, 0.032, "webbing")
            inner = [(x * 0.94, 1.315 + (y - 1.315) * 0.96) for x, y in outline]
            model.panel("Contoured flexible module cover", inner, -0.173, 0.015, "fabric")
            for sign in (-1, 1):
                model.rectangle("Upper vest module mount", sign * 0.12, 1.555, 0.037, 0.045, -0.151, 0.015, "hardware", 0.004)
                model.rectangle("Lower module output fitting", sign * 0.132, 1.065, 0.043, 0.034, -0.17, 0.018, "hardware", 0.004)
                model.band("Long outer-side thigh support panel", (sign * 0.10, 0.835, 0), 0.095, 0.093, 0.30, "fabric", -2.05 if sign < 0 else 1.08, -1.08 if sign < 0 else 2.05, 16)
                model.ribbon("Mesh front flank", (sign * 0.18, 1.51, 0.09), (sign * 0.18, 1.22, 0.095), 0.035, "mesh", 0.008)
            model.fan(0, 1.345, -0.194, 0.047)
            model.rectangle("Lower module ventilation outlet", 0, 1.105, 0.17, 0.022, -0.193, 0.005, "mesh", 0.008)
        else:
            model.rectangle("Continuous front tabard panel", 0, 1.355, 0.37, 0.43, 0.113, 0.025, "fabric", 0.025)
            model.rectangle("Embedded working-region textile volume", 0, 1.325, 0.33, 0.48, -0.134, 0.028, "fabric", 0.035)
            for sign in (-1, 1):
                model.band("Support shorts", (sign * 0.095, 0.875, -0.003), 0.096, 0.11, 0.355, "webbing")
                model.band("Shorts leg mesh insert", (sign * 0.095, 0.728, -0.003), 0.098, 0.112, 0.055, "mesh", -2.1 if sign < 0 else 1.05, -1.05 if sign < 0 else 2.1, 12)
                for y in (1.25, 1.40):
                    model.band("Tabard side closure webbing", (0, y, 0), 0.226, 0.148, 0.026, "webbing", -1.97 if sign < 0 else 1.15, -1.15 if sign < 0 else 1.97, 10)
                model.rectangle("Waist transmission guide", sign * 0.13, 1.08, 0.047, 0.032, -0.147, 0.012, "hardware", 0.004)
            model.fan(0, 1.49, -0.17, 0.046)
            model.rectangle("Integrated lower mesh outlet", 0, 1.105, 0.225, 0.029, -0.169, 0.006, "mesh", 0.01)
    common_anchors(model, code)
    model.save(ROOT / "dist" / "assets" / "models" / f"{code}.glb")


for design, accent in (("B", "73835A"), ("A", "366688"), ("D", "B96645")):
    create(design, accent)
