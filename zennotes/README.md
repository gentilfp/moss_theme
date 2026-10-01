# MOSS — ZenNotes theme

- **Spec:** SPEC.md v0.2 · **Port date:** 2026-10-01
- **Palette:** `tokens/moss.json` (ANSI slots per SPEC.md §9.2)
- **Format:** ZenNotes theme folder (`~/.config/zennotes/themes/moss/`) with
  `manifest.json` and `theme.css`. Tokens are space-separated RGB triplets.
- **Modes:** dark only. The same palette is declared for `:root` and
  `:root[data-theme-mode="dark"]`, so it applies in either case.

## Install

Copy the two files into a `moss` folder. Do not symlink: ZenNotes skips a
symlinked theme folder, and a copy is the setup that was tested.

```sh
mkdir -p ~/.config/zennotes/themes/moss
cp ~/Developer/moss_theme/zennotes/manifest.json ~/.config/zennotes/themes/moss/
cp ~/Developer/moss_theme/zennotes/theme.css ~/.config/zennotes/themes/moss/
```

The folder name is the theme id (`zen-theme://moss/...`), so it must be
`moss`. Then pick **MOSS** under Settings, Appearance, Custom. After a
`git pull`, run the `cp` commands again to update.

## Token mapping

| ZenNotes token | MOSS token | Hex |
| -------------- | ---------- | --- |
| `--z-bg` | `bg` | `#0D0F0C` |
| `--z-bg-softer` | `surface` | `#141713` |
| `--z-bg-1` | `overlay` | `#1B1F1A` |
| `--z-bg-2` | `border` | `#272C24` |
| `--z-bg-3` | `selection` | `#2A3527` |
| `--z-bg-4` | `faint` | `#4B5147` |
| `--z-fg` | `fg` | `#D7D9D2` |
| `--z-fg-1` | `fg` lifted (slot 15) | `#F0F0EE` |
| `--z-fg-2`, `--z-grey-2`, `--z-grey-1` | `muted` | `#70766B` |
| `--z-grey-0`, `--z-grey-dim` | `faint` | `#4B5147` |
| `--z-accent`, `--z-green` | `moss` | `#7E9273` |
| `--z-accent-soft` | `moss` lifted (slot 10) | `#92A389` |
| `--z-accent-muted` | `forest` | `#536B4F` |
| `--z-red` | `red-bright` | `#C06B63` |
| `--z-yellow` | `ochre` | `#B69A64` |
| `--z-blue` | slot 12 | `#6C8D94` |
| `--z-purple` | slot 13 | `#A08193` |
| `--z-aqua` | slot 4 | `#5D7B81` |
| `--z-shadow` | black | `0 0 0` |

## Deviation log (SPEC.md §11.10)

No new colors were invented. Judgment calls:

- **Greys:** ZenNotes has four grey steps; MOSS has two grey tokens. `muted`
  fills the upper two, `faint` the lower two.
- **`--z-red`:** `red-bright`, not `red`. Red text must stay readable and
  `red` alone is below AA (§10).
- **`--z-blue`, `--z-purple`, `--z-aqua`:** MOSS has no such tokens, so they
  take the ANSI slots from §9.2.
- **`--z-accent-soft` / `--z-accent-muted`:** the meaning of these two is not
  documented by ZenNotes. Soft is the lighter moss and muted is the receding
  forest. Revisit if a UI element looks wrong.
- **`--z-shadow`:** pure black, since it is a shadow and not a surface.
- **Glass alphas:** copied from the ZenNotes dark template.
