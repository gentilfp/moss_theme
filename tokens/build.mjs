#!/usr/bin/env node
// Generates moss.css from moss.json so the two can never drift.
// moss.json is the data source of truth (itself a projection of SPEC.md).
// Run after any palette revision:  node tokens/build.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const t = JSON.parse(readFileSync(join(here, "moss.json"), "utf8"));

const pad = (entries) => Math.max(...entries.map(([k]) => k.length));
const block = (entries, width, comment) =>
  entries
    .map(([k, v, note]) => {
      const decl = `  --moss-${k}:`.padEnd(width + 12) + v + ";";
      return note ? decl.padEnd(46) + ` /* ${note} */` : decl;
    })
    .join("\n");

const core = Object.entries(t.core).map(([k, v]) => [k, v.hex, v.role.toLowerCase()]);
const derived = Object.entries(t.derived).map(([k, v]) => [k, v.hex, v.role.toLowerCase()]);
const tints = Object.entries(t.tints)
  .filter(([k]) => k !== "comment")
  .map(([k, v]) => [`tint-${k}`, v]);
const width = pad([...core, ...derived, ...tints]);

const css = `/* ============================================================
   MOSS ${t.version} — palette tokens.
   GENERATED FROM tokens/moss.json by tokens/build.mjs — do not edit by hand.
   Prose source of truth: ${t.canonicalSource} (§3 palette, §8 diff tints).
   Token names map 1:1 to the spec in kebab-case; token "moss" binds
   to --moss-moss.
   ============================================================ */
:root {
  /* core — fixed identity (SPEC §3.1) */
${block(core, width)}

  /* derived — anchored to core, revisionable (SPEC §3.2) */
${block(derived, width)}

  /* diff tints — rendering parameters, not palette entries (SPEC §8) */
${block(tints, width)}
}
`;

writeFileSync(join(here, "moss.css"), css);
console.log(`moss.css written — ${core.length} core + ${derived.length} derived + ${tints.length} tints`);
