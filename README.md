# MOSS

A very dark, muted colorscheme.

MOSS is a near-black theme built around a muted green family — moss, forest, olive —
with ochre for warmth and red reserved for errors. Low saturation, low noise,
designed for long coding sessions.

**Preview:** https://gentilfp.github.io/moss_theme/ — palette, syntax sample, UI states,
terminal colors, contrast ratios, and install steps for every port.

## Status

**Specification phase.** This repository contains the theme specification and its ports:

- `SPEC.md` — the source of truth: palette, semantic roles, porting rules
- `tokens/moss.json` — the palette as data: core and derived tokens, diff tints, ANSI slots
- `tokens/moss.css` — `:root` custom properties, **generated** from `moss.json`
- `index.html` — visual reference / palette preview ([live](https://gentilfp.github.io/moss_theme/), or open it locally in a browser)
- `ghostty/MOSS` — Ghostty theme (see [Ports](#ports))
- `zed/moss.json` — Zed theme (see [Ports](#ports))
- `claude-code/moss.json` — Claude Code theme (see [Ports](#ports))
- `pi/moss.json` — Pi theme (see [Ports](#ports))

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

| Port    | Folder     | Deviation log      |
| ------- | ---------- | ------------------ |
| Ghostty | `ghostty/` | in `ghostty/MOSS`  |
| Zed     | `zed/`     | `zed/README.md`    |
| Claude Code | `claude-code/` | `claude-code/README.md` |
| Pi      | `pi/`      | `pi/README.md`     |

## Usage

Clone the repository once, then symlink the port files into each app's config.
Symlinks mean a `git pull` updates the theme everywhere; no re-copying.

```sh
git clone https://github.com/gentilfp/moss_theme.git ~/Developer/moss_theme
```

### Ghostty

```sh
mkdir -p ~/.config/ghostty/themes
ln -sf ~/Developer/moss_theme/ghostty/MOSS ~/.config/ghostty/themes/MOSS
```

Add to `~/.config/ghostty/config`:

```
theme = MOSS
```

Reload with `cmd+shift+,` (or restart Ghostty). `ghostty +list-themes` should list MOSS.

### Zed

```sh
mkdir -p ~/.config/zed/themes
ln -sf ~/Developer/moss_theme/zed/moss.json ~/.config/zed/themes/moss.json
```

Open the theme selector (`cmd-k cmd-t`) and pick **MOSS**, or set it in
`~/.config/zed/settings.json`:

```json
"theme": { "mode": "dark", "dark": "MOSS", "light": "MOSS" }
```

Zed reloads theme files on save. If MOSS is missing from the selector, run
**zed: open log** and look for a theme error.

### Claude Code

```sh
mkdir -p ~/.claude/themes
ln -sf ~/Developer/moss_theme/claude-code/moss.json ~/.claude/themes/moss.json
```

Pick **MOSS** in `/theme`, or set it in `~/.claude/settings.json`:

```json
"theme": "custom:moss"
```

Claude Code watches the themes folder, so edits apply without a restart. This only
works if the folder existed when Claude Code started.

### Pi

```sh
mkdir -p ~/.pi/agent/themes
ln -sf ~/Developer/moss_theme/pi/moss.json ~/.pi/agent/themes/moss.json
```

Pick **MOSS** in `/settings` → Theme, or set it in `~/.pi/agent/settings.json`:

```json
"theme": "MOSS"
```

Pi hot-reloads the active user theme; run `/reload` after a `git pull` if the
theme file changed.

### Updating

```sh
git -C ~/Developer/moss_theme pull
```

Ghostty picks up the change on reload; Zed and Claude Code on their own.

Neovim, VS Code, Orca, and other integrations will follow.

## Design philosophy

- very dark, never pure black
- muted and desaturated; no neon
- green is the identity — used intentionally, not everywhere
- hierarchy over brightness: normal text is the brightest thing in the editor

See [SPEC.md](SPEC.md) for the full specification.
