# MOSS — bb theme

- **Spec:** SPEC.md v0.2 · **Port date:** 2026-10-02
- **Palette:** `tokens/moss.json` (ANSI slots per SPEC.md §9.2)
- **Format:** a bb custom theme folder: `theme.css` overrides bb's CSS design
  tokens, and `theme.json` points the diff and file-preview colors at
  `moss-code.json`.
- **Code theme:** `moss-code.json` is a symlink to `intent/moss.json`, a VS
  Code style theme with `colors` and `tokenColors`. The syntax mapping lives
  there, so the two ports cannot drift.
- **Modes:** dark only. The same palette applies in bb's light and dark mode.

## Install

bb skips a symlinked theme folder, so make a real folder and symlink the files
into it:

```sh
mkdir -p ~/.bb/theme/moss
for f in theme.css theme.json moss-code.json; do
  ln -sf ~/Developer/moss_theme/bb/$f ~/.bb/theme/moss/$f
done
bb theme set moss
```

Or pick **moss** under Settings, Appearance. Run `bb theme dir` if your data
directory is not `~/.bb`. After a `git pull`, run `bb theme set moss` again to
re-apply.

## Token mapping

| bb token | MOSS token | Hex |
| -------- | ---------- | --- |
| `--canvas`, `--background` | `bg` | `#0D0F0C` |
| `--ink`, `--foreground`, `--sidebar-foreground`, `--popover-foreground` | `fg` | `#D7D9D2` |
| `--sidebar`, `--card`, `--surface-recessed` | `surface` | `#141713` |
| `--popover`, `--muted`, `--surface-raised`, `--state-active` | `overlay` | `#1B1F1A` |
| `--secondary`, `--accent`, `--state-hover`, `--sidebar-accent` | `active` | `#191D18` |
| `--border`, `--border-hairline`, `--border-seam`, `--sidebar-border` | `border` | `#272C24` |
| `--input` | `faint` | `#4B5147` |
| `--primary`, `--ring`, `--sidebar-ring`, `--success`, `--diff-added` | `moss` | `#7E9273` |
| `--primary-foreground` | `bg` | `#0D0F0C` |
| `--surface-selected` | `selection` | `#2A3527` |
| `--surface-selected-border` | `forest` | `#536B4F` |
| `--file-accent` | `olive` | `#9A9968` |
| `--muted-foreground`, `--readback-foreground` | `muted` | `#70766B` |
| `--subtle-foreground` | `faint` | `#4B5147` |
| `--destructive`, `--diff-removed` | `red` | `#A75D57` |
| `--destructive-text` | `red-bright` | `#C06B63` |
| `--destructive-foreground` | `fg` | `#D7D9D2` |
| `--warning`, `--warning-text`, `--attention` | `ochre` | `#B69A64` |
| `--pr-merged` | ANSI slot 5 | `#8F6C80` |
| `--ansi-0` to `--ansi-15` | SPEC.md §9.2 | |

`--ansi-bg-fg-*` (text drawn on an ANSI color used as a background) is `bg` for
every slot except slot 0, which takes `fg`. Each pick is the higher-contrast of
the two.

## Deviation log (SPEC.md §11.10)

No new colors were invented. Judgment calls:

- **Light mode:** bb has a separate light/dark switch. MOSS is dark only, so
  `:root`, `.light` and `.dark` all get the same values, with
  `color-scheme: dark`.
- **Solid hover and pressed states:** bb's `--state-hover` and `--state-active`
  are translucent ink by default. They use the solid `active` and `overlay`
  tokens, so no off-palette mixes appear.
- **`--input`:** `faint`, not `border`. Field outlines need to be visible on
  `surface`, and `border` is almost invisible there.
- **`--card`:** `surface`, not `bg`, so cards sit one step above the content
  area (§4.2 secondary surfaces).
- **`--subtle-foreground`:** `faint`. bb uses it for captions, hints and
  placeholders. MOSS has only two secondary text levels, so `--readback-foreground`
  shares `muted` with `--muted-foreground`. If captions are too dim in practice,
  the allowed fix is a documented `muted` lift of at most 6% (§10).
- **`--file-accent`:** `olive`. File paths are string-like values (§5.1), and
  `moss` would push green into a very common text role (§11.11).
- **`--pr-merged`:** ANSI slot 5 mauve-grey. bb expects a purple here, MOSS has
  none, and slot 5 is the nearest hue already in the palette (§9.1 rule 6).
- **`--surface-selected-border`:** `forest`. A selected row is marked by its
  `selection` tint; the outline only needs to recede.
- **Error text:** `red-bright` for `--destructive-text`, `red` for fills (§7).
- **Code theme:** reuses `intent/moss.json`. See `intent/README.md` for its
  own judgment calls (TextMate scope choices).
