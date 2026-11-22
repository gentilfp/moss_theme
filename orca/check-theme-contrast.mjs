#!/usr/bin/env node
// Checks themes/moss.json against the contrast rules Orca applies to plugin
// app themes. Orca silently drops a token that fails its gate and paints a
// built-in colour instead, so a failing pair is a visible port bug, not a nit.
//
// Values are read literally from the theme (no Orca derivation), and chat
// surfaces are composited over the canvas the same way Orca paints them:
//   canvas   = 5% of --foreground over --background
//   bubble   = --chat-user-message over canvas
//   code     = --chat-code-block over canvas
//   inline   = --chat-inline-code over canvas
//   link     = 30% of --foreground over --text-link (Orca's --chat-link)
//
// Run: node orca/check-theme-contrast.mjs
import { readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const theme = JSON.parse(readFileSync(join(here, "themes/moss.json"), "utf8"));

const PUBLIC_TOKENS = `--background --editor-surface --foreground --card
--card-foreground --popover --popover-foreground --primary --primary-foreground
--secondary --secondary-foreground --muted --muted-foreground --accent
--accent-foreground --border --input --ring --chart-1 --chart-2 --chart-3
--chart-4 --chart-5 --sidebar --sidebar-foreground --sidebar-primary
--sidebar-primary-foreground --sidebar-accent --sidebar-accent-foreground
--sidebar-border --sidebar-ring --worktree-sidebar --worktree-sidebar-foreground
--worktree-sidebar-accent --worktree-sidebar-accent-foreground
--worktree-sidebar-border --worktree-sidebar-ring --worktree-sidebar-active
--worktree-sidebar-active-border --host-badge --host-badge-foreground --tab-bar
--tab-active --tab-active-foreground --tab-active-indicator --tab-inactive
--tab-inactive-foreground --split-divider --split-divider-hover
--chat-user-message --chat-bold-foreground --chat-muted-foreground
--chat-inline-code --chat-inline-code-foreground --chat-code-block
--chat-selection --chat-selection-foreground --text-link --editor-selection
--diff-added --diff-added-background --diff-added-emphasis --diff-added-gutter
--diff-removed --diff-removed-background --diff-removed-emphasis
--diff-removed-gutter --git-decoration-added --git-decoration-modified
--git-decoration-deleted --git-decoration-renamed --git-decoration-untracked
--git-decoration-copied --git-decoration-ignored`.split(/\s+/);

const parse = (value) => {
  const v = value.trim().toLowerCase();
  const hex = /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/.exec(v);
  if (hex) {
    let h = hex[1];
    if (h.length <= 4) h = [...h].map((c) => c + c).join("");
    return [
      parseInt(h.slice(0, 2), 16),
      parseInt(h.slice(2, 4), 16),
      parseInt(h.slice(4, 6), 16),
      h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1,
    ];
  }
  const fn = /^rgba?\(([^)]*)\)$/.exec(v);
  if (!fn) throw new Error(`cannot parse colour: ${value}`);
  const parts = fn[1].trim().split(/[\s,/]+/).filter(Boolean).map(Number);
  return [parts[0], parts[1], parts[2], parts.length > 3 ? parts[3] : 1];
};

const luminance = ([r, g, b]) => {
  const channel = (c) => {
    const x = c / 255;
    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};

const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const over = (fg, bg) => [
  ...fg.slice(0, 3).map((c, i) => c * fg[3] + bg[i] * (1 - fg[3])),
  1,
];

const mix = (fg, bg, percent) =>
  over([...fg.slice(0, 3), percent / 100], bg);

const T = Object.fromEntries(
  Object.entries(theme.tokens).map(([token, value]) => [token, parse(value)]),
);

const missing = PUBLIC_TOKENS.filter((t) => !(t in T));
const extra = Object.keys(theme.tokens).filter((t) => !PUBLIC_TOKENS.includes(t));

const canvas = mix(T["--foreground"], T["--background"], 5);
const bubble = over(T["--chat-user-message"], canvas);
const code = over(T["--chat-code-block"], canvas);
const inline = over(T["--chat-inline-code"], canvas);
const link = mix(T["--foreground"], T["--text-link"], 30);
const chatForeground = mix(T["--foreground"], canvas, 88);
const chatCodeForeground = mix(T["--foreground"], canvas, 85);

const pairs = [
  // [label, surface, text, minimum]
  ["background / foreground", T["--background"], T["--foreground"], 4.5],
  ["background / muted-foreground", T["--background"], T["--muted-foreground"], 4.5],
  ["editor / foreground", T["--editor-surface"], T["--foreground"], 4.5],
  ["editor / muted-foreground", T["--editor-surface"], T["--muted-foreground"], 4.5],
  ["card / card-foreground", T["--card"], T["--card-foreground"], 4.5],
  ["popover / popover-foreground", T["--popover"], T["--popover-foreground"], 4.5],
  ["primary / primary-foreground", T["--primary"], T["--primary-foreground"], 4.5],
  ["secondary / secondary-foreground", T["--secondary"], T["--secondary-foreground"], 4.5],
  ["muted / muted-foreground", T["--muted"], T["--muted-foreground"], 4.5],
  ["accent / accent-foreground", T["--accent"], T["--accent-foreground"], 4.5],
  ["sidebar / sidebar-foreground", T["--sidebar"], T["--sidebar-foreground"], 4.5],
  ["sidebar-accent / sidebar-accent-foreground", T["--sidebar-accent"], T["--sidebar-accent-foreground"], 4.5],
  ["worktree sidebar / foreground", T["--worktree-sidebar"], T["--worktree-sidebar-foreground"], 4.5],
  ["worktree sidebar-active / foreground", over(T["--worktree-sidebar-active"], T["--worktree-sidebar"]), T["--worktree-sidebar-foreground"], 4.5],
  ["host badge / host-badge-foreground", T["--host-badge"], T["--host-badge-foreground"], 4.5],
  ["tab active / active-foreground", T["--tab-active"], T["--tab-active-foreground"], 4.5],
  ["tab inactive / inactive-foreground", T["--tab-inactive"], T["--tab-inactive-foreground"], 4.5],
  ["tab inactive / active-foreground", T["--tab-inactive"], T["--tab-active-foreground"], 4.5],
  ["editor / text-link", T["--editor-surface"], T["--text-link"], 4.5],
  ["editor / editor-selection + foreground", over(T["--editor-selection"], T["--editor-surface"]), T["--foreground"], 4.5],

  // Chat, composited the way Orca paints it.
  ["chat canvas / bold", canvas, T["--chat-bold-foreground"], 4.5],
  ["chat canvas / muted", canvas, T["--chat-muted-foreground"], 4.5],
  ["chat bubble / bold", bubble, T["--chat-bold-foreground"], 4.5],
  ["chat bubble / link", bubble, link, 4.5],
  ["chat inline / inline-foreground", inline, T["--chat-inline-code-foreground"], 4.5],
  ["chat inline / link", inline, link, 4.5],
  ["chat code / code-foreground", code, chatCodeForeground, 4.5],
  ["chat code / chat-foreground", code, chatForeground, 4.5],
  ["chat code / muted", code, T["--chat-muted-foreground"], 4.5],
  ["chat selection + foreground (canvas)", over(T["--chat-selection"], canvas), T["--chat-selection-foreground"], 4.5],
  ["chat selection + foreground (bubble)", over(T["--chat-selection"], bubble), T["--chat-selection-foreground"], 4.5],
  ["chat selection + foreground (code)", over(T["--chat-selection"], code), T["--chat-selection-foreground"], 4.5],
  ["chat selection + foreground (inline)", over(T["--chat-selection"], inline), T["--chat-selection-foreground"], 4.5],

  // Decorations are gated at 3:1.
  ...["added", "modified", "deleted", "renamed", "untracked", "copied", "ignored"].map((kind) => [
    `sidebar / git ${kind}`,
    T["--sidebar"],
    T[`--git-decoration-${kind}`],
    3,
  ]),
];

let failed = 0;
if (missing.length) {
  failed += missing.length;
  console.error(`missing tokens: ${missing.join(", ")}`);
}
if (extra.length) {
  failed += extra.length;
  console.error(`not public tokens: ${extra.join(", ")}`);
}
for (const [label, surface, text, minimum] of pairs) {
  const ratio = contrast(surface, text);
  const ok = ratio >= minimum;
  if (!ok) failed += 1;
  console.log(`${ok ? "ok  " : "FAIL"} ${label}: ${ratio.toFixed(2)} (min ${minimum})`);
}
const wallpaper = theme.background;
if (wallpaper) {
  const path = join(here, wallpaper.path ?? "");
  const bytes = (() => {
    try {
      return statSync(path).size;
    } catch {
      return null;
    }
  })();
  const checks = [
    ["file exists", bytes !== null],
    ["image format", /\.(png|jpe?g|webp)$/i.test(wallpaper.path ?? "")],
    ["file size <= 2 MB", bytes !== null && bytes <= 2 * 1024 * 1024],
    ["opacity 0..1", typeof wallpaper.opacity === "number" && wallpaper.opacity >= 0 && wallpaper.opacity <= 1],
    ["size cover|contain|tile", ["cover", "contain", "tile"].includes(wallpaper.size)],
    ["position center|top|bottom|left|right", ["center", "top", "bottom", "left", "right"].includes(wallpaper.position)],
  ];
  for (const [label, ok] of checks) {
    if (!ok) failed += 1;
    console.log(`${ok ? "ok  " : "FAIL"} wallpaper ${label}`);
  }
}
process.exit(failed === 0 ? 0 : 1);
