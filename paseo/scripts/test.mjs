import { readFileSync } from "node:fs";

// Smoke test: the theme must be declared, every color must be a 6-digit hex,
// and the seed colors must match tokens/moss.json.
const source = readFileSync(new URL("../index.client.tsx", import.meta.url), "utf8");
const tokens = JSON.parse(
  readFileSync(new URL("../../tokens/moss.json", import.meta.url), "utf8"),
);

const block = source.match(/const dark = \{([^}]*)\}/)?.[1] ?? "";
const colors = Object.fromEntries(
  [...block.matchAll(/(\w+):\s*"([^"]*)"/g)].map((m) => [m[1], m[2]]),
);
const keys = ["background", "foreground", "raised", "control", "border", "accent", "mutedForeground", "ring"];
for (const k of keys) {
  if (!/^#[0-9a-fA-F]{6}$/.test(colors[k] ?? "")) throw new Error(`Invalid or missing color: ${k}`);
}

const expected = {
  background: tokens.core.bg.hex,
  foreground: tokens.core.fg.hex,
  raised: tokens.core.overlay.hex,
  border: tokens.derived.border.hex,
  accent: tokens.core.moss.hex,
  mutedForeground: tokens.core.muted.hex,
};
for (const [k, v] of Object.entries(expected)) {
  if (colors[k].toLowerCase() !== v.toLowerCase()) throw new Error(`${k} ${colors[k]} != ${v}`);
}
if (!source.includes('id: "moss"')) throw new Error("Missing theme declaration: moss");

console.log("ok: 8 valid colors, matching tokens/moss.json");
