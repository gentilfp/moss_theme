# MOSS — Obsidian theme

- **Spec:** SPEC.md v0.2 · **Port date:** 2026-11-21
- **Palette:** `tokens/moss.json` (ANSI slots per SPEC.md §9.2)
- **Format:** Obsidian app theme — `manifest.json` + `theme.css`
- **Modes:** dark only. The palette is declared for `.theme-dark` **and**
  `.theme-light`, so the app reads as MOSS in either base color scheme, but
  MOSS is designed for **Dark**.

## Install

The folder name must match the `name` in `manifest.json`, so it is `MOSS`:

```sh
THEMES="$HOME/path/to/vault/.obsidian/themes"
mkdir -p "$THEMES/MOSS"
ln -sf ~/Developer/moss_theme/obsidian/manifest.json "$THEMES/MOSS/manifest.json"
ln -sf ~/Developer/moss_theme/obsidian/theme.css "$THEMES/MOSS/theme.css"
```

Then in Obsidian: **Settings → Appearance → Themes → MOSS**, and set **Base
color scheme** to **Dark**. `theme.css` reloads as soon as it changes, so a
`git pull` is enough; `manifest.json` changes need an app restart.

Repeat the three lines for every vault you want themed — themes are stored per
vault, not per app. Copy the two files instead of symlinking if you prefer;
nothing in the theme depends on the link.

If you never see MOSS's green accent, you have an accent color set in
**Settings → Appearance → Accent color**. Clear it: Obsidian applies that
override inline, above any theme.

## What it themes

Obsidian exposes its design as CSS variables, so this port overrides
variables instead of restyling selectors. That covers the workspace chrome,
tabs, sidebar, status bar, command palette, modals, tooltips, settings, notes
(reading and editing), syntax highlighting in code blocks, tables, properties,
tags, callouts, graph and canvas. Four rules need a selector and are at the
bottom of `theme.css`: the cursor-line tint, the neutral function/property
color, the active-tab moss indicator, and the ochre highlight on a matching
bracket pair.

## Token mapping

### Foundation

| Obsidian variable | MOSS token |
| ----------------- | ---------- |
| `--background-primary` | `bg` `#0D0F0C` |
| `--background-primary-alt` | `overlay` `#1B1F1A` |
| `--background-secondary`, `--background-secondary-alt` | `surface` `#141713` |
| `--background-modifier-hover` | `active` `#191D18` |
| `--background-modifier-active-hover` | `selection` `#2A3527` |
| `--background-modifier-border` | `border` `#272C24` |
| `--background-modifier-border-hover` | `faint` `#4B5147` |
| `--background-modifier-border-focus` | `moss` `#7E9273` |
| `--background-modifier-form-field` | `overlay` |
| `--background-modifier-message` | `overlay` |
| `--background-modifier-cover` | `bg` at 70% |
| `--text-normal` | `fg` `#D7D9D2` |
| `--text-muted` | `muted` `#70766B` |
| `--text-faint` | `faint` `#4B5147` |
| `--text-selection` | `selection` `#2A3527` |
| `--text-highlight-bg`, `--highlight-background` | `ochre` at 22% |
| `--text-error` | `red-bright` `#C06B63` |
| `--text-warning` | `ochre` `#B69A64` |
| `--text-success` | `moss` |
| `--text-accent`, `--text-accent-hover` | `moss` / slot 10 `#92A389` |
| `--text-on-accent` | `bg` |
| `--interactive-normal` | `overlay` |
| `--interactive-hover` | `border` |
| `--interactive-accent`, `--interactive-accent-hover` | `moss` / slot 10 |
| `--accent-h`, `--accent-s`, `--accent-l` | `99`, `12%`, `51%` (moss) |
| `--icon-color`, `-hover`, `-active`, `-focused` | `muted`, `fg`, `moss`, `fg` |

### Neutral ramp and semantic colors

| Obsidian variable | MOSS token |
| ----------------- | ---------- |
| `--color-base-00` | `bg` |
| `--color-base-05`, `-10`, `-20` | `surface` |
| `--color-base-25` | `active` |
| `--color-base-30` | `border` |
| `--color-base-35` | `selection` |
| `--color-base-40`, `-50` | `faint` |
| `--color-base-60`, `-70` | `muted` |
| `--color-base-100` | `fg` |
| `--color-red` / `--color-red-rgb` | `red-bright` `#C06B63` |
| `--color-orange`, `--color-yellow` | `ochre` `#B69A64` |
| `--color-green` | `moss` `#7E9273` |
| `--color-cyan` | slot 4 `#5D7B81` |
| `--color-blue` | slot 12 `#6C8D94` |
| `--color-purple` | slot 13 `#A08193` |
| `--color-pink` | slot 5 `#8F6C80` |

### Chrome and surfaces

| Obsidian variable | MOSS token |
| ----------------- | ---------- |
| `--titlebar-background`, `--titlebar-background-focused` | `surface` |
| `--ribbon-background`, `--ribbon-background-collapsed` | `surface` |
| `--status-bar-background` | `surface` |
| `--titlebar-border-color`, `--status-bar-border-color` | `border` |
| `--titlebar-text-color`, `--status-bar-text-color` | `muted` |
| `--tab-container-background` | `surface` |
| `--tab-background-active` | `overlay` |
| `--tab-background-hover` | `active` |
| `--tab-text-color` / `-active` / `-focused` | `muted` / `fg` / `muted` |
| `--tab-text-color-focused-highlighted` | `moss` |
| `--tab-divider-color`, `--tab-outline-color` | `border` |
| `--divider-color` | `border` |
| `--divider-color-hover` | `moss` |
| `--scrollbar-thumb-bg` / `-active-thumb-bg` | `muted` at 35% / 60% |
| `--menu-background`, `--prompt-background` | `overlay` |
| `--modal-background` | `overlay` |
| `--modal-sidebar-background` | `surface` |
| `--menu-border-color`, `--prompt-border-color`, `--modal-border-color` | `border` |
| `--suggestion-background`, `--search-result-background` | `overlay` |
| `--tooltip-background`, `--notice-background` | `overlay` |
| `--tooltip-color`, `--notice-color` | `fg` |
| `--nav-item-color` / `-hover` / `-active` / `-selected` | `muted` / `fg` / `fg` / `fg` |
| `--nav-item-background-hover` | `active` |
| `--nav-item-background-active` | `overlay` |
| `--nav-item-background-selected` | `selection` |
| `--nav-heading-color` | `muted` |
| `--nav-indentation-guide-color` | `border` |

### Notes, syntax and diagnostics

| Obsidian variable | MOSS token |
| ----------------- | ---------- |
| `--caret-color` | `moss` |
| `--inline-title-color` | `fg` |
| `--heading-formatting` | `faint` |
| `--blockquote-border-color` | `moss` |
| `--hr-color` | `border` |
| `--indentation-guide-color` | `faint` |
| `--list-marker-color` / `-hover` / `-collapsed` | `muted` / `fg` / `moss` |
| `--checkbox-color` / `-hover` / `-marker-color` | `moss` / slot 10 / `bg` |
| `--link-color` / `-hover` | `moss` / slot 10 |
| `--link-external-color` / `-hover` | `moss` / slot 10 |
| `--link-unresolved-color` | `faint` |
| `--tag-color`, `--tag-background` | `moss`, `moss` at 12% |
| `--table-border-color` | `border` |
| `--table-header-background` | `overlay` |
| `--table-row-alt-background` | `surface` |
| `--table-row-background-hover` | `active` |
| `--table-selection-border-color` | `moss` |
| `--metadata-label-text-color` / `-input-text-color` | `muted` / `fg` |
| `--metadata-divider-color` | `border` |
| `--metadata-property-background-hover` | `active` |
| `--code-background` | `overlay` |
| `--code-normal`, `--code-function`, `--code-property` | `fg` |
| `--code-keyword` | `moss` |
| `--code-string` | `olive` `#9A9968` |
| `--code-value` | `ochre` `#B69A64` |
| `--code-comment` | `muted` |
| `--code-operator` | `forest` `#536B4F` |
| `--code-punctuation` | `muted` |
| `--code-tag` | `forest` |
| `--code-important` | `ochre-bright` `#C7A46B` |
| `--code-border-color` | `border` |
| `--code-bracket-background` | `ochre` at 10% |
| `--callout-default`, `--callout-info`, `--callout-todo` | `moss` |
| `--callout-tip`, `--callout-success` | `moss` |
| `--callout-summary` | `olive` |
| `--callout-important`, `--callout-question`, `--callout-warning` | `ochre` |
| `--callout-error`, `--callout-fail`, `--callout-bug` | `red-bright` |
| `--callout-example` | slot 5 `#8F6C80` |
| `--callout-quote` | `muted` |
| `--graph-node` / `-focused` / `-unresolved` | `moss` / `fg` / `faint` |
| `--graph-node-tag` / `-attachment` | slot 14 `#AAA97F` / `ochre` |
| `--graph-line` | `border` |
| `--graph-text` | `muted` |
| `--canvas-background` / `--canvas-dot-pattern` | `bg` / `border` |
| `--canvas-color-1` … `-6` | `red`, `ochre`, `olive`, `moss`, slot 4, slot 5 |

## Deviation log (SPEC.md §11.10)

No new colors were invented. Every value is a §3 token, a §9.2 ANSI slot, one
of the §8 tint alphas, or an alpha of a palette token used as a rendering
parameter. Judgment calls:

- **Cyan / blue / purple / pink:** MOSS has no such hues, so Obsidian's
  semantic slots take ANSI slots 4, 5, 12 and 13 (§9.2). They appear in
  callouts, graph tags, canvas colors and Mermaid, never as syntax accents.
- **`--color-red` = `red-bright`, not `red`.** Obsidian paints error text from
  `--color-red`. `red` alone is below AA (§10), so text uses the bright
  variant while the darker `red` stays in canvas color 1 and error marks.
- **Accent hover uses slot 10.** Obsidian wants `--color-accent-1/-2` lifts;
  the core palette has no accent-hover token. Slot 10 (`moss` +15%) is the
  §9.2 lift, so accent hovers are moss, not a new green.
- **`--interactive-hover` = `border`.** Buttons and dropdowns need a visible
  hover step above `--interactive-normal` (`overlay`), and MOSS has no
  in-between surface. `border` is the next surface-ish neutral in the palette.
- **`--background-modifier-border-hover` = `faint`.** `border`→`border` gives
  no hover feedback; the next neutral step is `faint`.
- **Editor indentation guides = `faint`, sidebar guides = `border`.** At
  `border` the editor guide sits at 1.5:1 on `bg` and disappears; `faint`
  (2.4:1) stays quiet but visible. On the sidebar (`surface`) `border` reads.
- **Highlights use an `ochre` tint at 22%** (plus Obsidian's own
  `--highlight-background` color-mix at 30%). The §8 rule allows 8–14% for
  diff rows; a mark needs a little more, and 22% keeps `fg` text readable.
- **`--text-selection` is solid `selection`**, not Obsidian's accent mix, so
  selected text matches §4.2 exactly (`fg` on `selection` ≈ 9:1).
- **Callout hues:** the green family carries structure (default, info, todo,
  tip, success), `olive` carries summary, warm `ochre` carries
  important/question/warning, `red-bright` carries error/fail/bug, and
  `example` takes slot 5 so it does not read as another info box. Callout
  colors paint titles and icons, so `forest` and `faint` are never used there.
- **`--color-base-*` ramp collapse:** Obsidian's 12 neutrals map onto the five
  MOSS neutrals (`bg`, `surface`, `active`, `border`, `faint`, `muted`, `fg`)
  in luminance order; steps are duplicated rather than invented.
- **Four rules use selectors** instead of variables: the cursor line
  (`.cm-active`), neutral function/property color (`.cm-def`,
  `.cm-variable-2`, `.cm-property` — Obsidian paints definitions `muted` by
  default, §5.1 wants `fg`), the active-tab moss indicator, and the ochre text
  on a matching bracket pair (§6). All four use low-specificity selectors and
  no `!important`, per Obsidian's theme guidelines.- **Dark only.** The palette is also declared under `.theme-light` so a light
  base scheme still reads as MOSS, but Light is not a supported appearance:
  Obsidian derives several internal surfaces for light mode that MOSS does not
  define. Use **Dark**.

## Files

| File | Purpose |
| ---- | ------- |
| `manifest.json` | theme metadata (`name` must match the install folder) |
| `theme.css` | palette, variable mapping, and the four selector rules |
