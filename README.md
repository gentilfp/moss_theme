# MOSS

A very dark, muted colorscheme.

MOSS is a near-black theme built around a muted green family — moss, forest, olive —
with ochre for warmth and red reserved for errors. Low saturation, low noise,
designed for long coding sessions.

## Status

**Specification phase.** This repository contains the theme specification and its ports:

- `SPEC.md` — the source of truth: palette, semantic roles, porting rules
- `tokens/moss.json` — the palette as data: core and derived tokens, diff tints, ANSI slots
- `tokens/moss.css` — `:root` custom properties, **generated** from `moss.json`
- `index.html` — visual reference / palette preview (open directly in a browser)
- `ghostty/MOSS` — Ghostty theme (see [Ports](#ports))

`moss.json` is the machine-readable projection of `SPEC.md` §3, §8 and §9 — the file a
port should read rather than re-typing hexes. `moss.css` is generated from it, so the
two can never drift:

```sh
node tokens/build.mjs   # rewrites tokens/moss.css after any palette revision
```

`index.html` links `moss.css` and declares no hex of its own. Opened with JavaScript
enabled it also verifies every printed hex against the loaded tokens, computes the
contrast ratios live, and offers the palette as CSS or JSON on the clipboard.

## Ports

Ports live in this repository, one top-level folder each, built from `SPEC.md`.
Each port records its spec version and deviation log in its own files.

| Port    | Folder     | Install |
| ------- | ---------- | ------- |
| Ghostty | `ghostty/` | Copy `ghostty/MOSS` to `~/.config/ghostty/themes/MOSS`, then set `theme = MOSS` in your Ghostty config. |

Neovim, Zed, VS Code, Orca, and other integrations will follow.

## Design philosophy

- very dark, never pure black
- muted and desaturated; no neon
- green is the identity — used intentionally, not everywhere
- hierarchy over brightness: normal text is the brightest thing in the editor

See [SPEC.md](SPEC.md) for the full specification.