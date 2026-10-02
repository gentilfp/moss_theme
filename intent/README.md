# MOSS — Intent theme

- **Spec:** SPEC.md v0.2 · **Port date:** 2026-10-02
- **Palette:** `tokens/moss.json` (ANSI slots per SPEC.md §9.2, syntax per §5.1)
- **Format:** `moss.json`, a VS Code style theme with `type`, `colors` and
  `tokenColors`. Intent reads the 6 key mappings below and uses smart defaults
  for the rest.
- **Modes:** dark only.

## Install

Import `intent/moss.json` in Intent's theme settings by hand, then pick
**MOSS**. This import has not been tested yet.

## Token mapping

| Intent role | VS Code key | MOSS token | Hex |
| ----------- | ----------- | ---------- | --- |
| Background | `editor.background`, `terminal.background` | `bg` | `#0D0F0C` |
| Text | `editor.foreground` | `fg` | `#D7D9D2` |
| Sidebar | `sideBar.background`, `input.background`, `tab.inactiveBackground` | `surface` | `#141713` |
| Widgets | `editorWidget.background`, `dropdown.background` | `overlay` | `#1B1F1A` |
| Primary / accent | `button.background`, `focusBorder` | `moss` | `#7E9273` |
| Secondary (selection) | `list.activeSelectionBackground` | `selection` | `#2A3527` |
| Danger | `errorForeground` | `red-bright` | `#C06B63` |
| Borders | `sideBar.border`, `input.border`, `panel.border`, `editorGroup.border` | `border` | `#272C24` |
| Descriptions | `descriptionForeground` | `muted` | `#70766B` |
| Warnings | `editorWarning.foreground` | `ochre` | `#B69A64` |
| Info, passed, added | `editorInfo.foreground`, `testing.iconPassed`, `gitDecoration.addedResourceForeground` | `moss` | `#7E9273` |

Terminal colors use the 16 ANSI slots from `tokens/moss.json`. Syntax scopes
follow SPEC.md §5.1.

## Deviation log (SPEC.md §11.10)

No new colors were invented. Judgment calls:

- **`errorForeground`:** `red-bright`, not `red`. Red text must stay readable
  and `red` alone is below AA (§10).
- **`inputValidation.errorBackground`:** `red`, since it is a fill and not text.
- **`button.foreground`:** `bg`, so text on the moss button is dark.
- **`terminalCursor.background`:** `bg`, the color under the cursor.
- **Info:** `moss`. MOSS has no blue, and the info state is not an error.
- **Scope names:** TextMate scopes are a best-effort match for §5.1. Revisit
  after the first import if some syntax looks wrong.
