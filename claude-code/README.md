# MOSS — Claude Code theme

- **Spec:** SPEC.md v0.2 · **Port date:** 2026-09-25
- **Palette:** `tokens/moss.json` (ANSI slots per SPEC.md §9.2)
- **Format:** Claude Code custom theme (`~/.claude/themes/<slug>.json`), `base: "dark"`, all 71 dark-theme tokens overridden
- **Tested with:** Claude Code 2.1.282

## Install

Link `claude-code/moss.json` to `~/.claude/themes/moss.json`, then pick **MOSS** in
`/theme` or set it in `~/.claude/settings.json`:

```json
"theme": "custom:moss"
```

## Deviation log (SPEC.md §11.10)

Claude Code is a terminal app with no syntax roles of its own; the code inside it
is colored by its own highlighter. This port covers the UI tokens only. Claude
Code has more accent roles than MOSS has hues, so roles without a MOSS
equivalent take the ANSI slot projection (§9.2): slot 4 `#5D7B81` and slot 12
`#6C8D94` for the blue roles, slot 5 `#8F6C80` and slot 13 `#A08193` for the
purple ones.

Diff backgrounds use the §8 tints (token at the given alpha over `bg`), written
as solid hex because Claude Code does not accept alpha.

| Hex       | Derivation              | Used for                                  |
| --------- | ----------------------- | ----------------------------------------- |
| `#1B1F18` | `moss` at 12% over `bg` | `diffAdded`                               |
| `#161914` | `moss` at 8% over `bg`  | `diffAddedDimmed`                         |
| `#1F1815` | `red` at 12% over `bg`  | `diffRemoved`                             |
| `#191512` | `red` at 8% over `bg`   | `diffRemovedDimmed`                       |
| `#1E1D15` | `ochre` at 10% over `bg`| `bashMessageBackgroundColor`              |
| `#34221F` | `red` at 25% over `bg`  | `diffRemovedWord` (**new**, see below)    |

| Role (Claude Code) | MOSS | Reason |
| ------------------ | ---- | ------ |
| `claude`, spinner, logo | `moss` | Claude's orange is its brand accent; in MOSS the identity accent is `moss`. |
| `permission`, `suggestion`, `remember`, `skill` | `moss` | Focus and "act here" roles are `moss` (§4.2); never red or ochre (§13.11). |
| `autoAccept`, `bashBorder`, `fastMode` | `ochre` | Modes that skip or bypass a step read as gentle warnings. |
| `planMode`, `ide`, `background`, system spinner | slot 12 `#6C8D94` | Informational roles; the blue-green slot keeps them apart from `moss`. |
| `merged`, `effortUltra` | slot 13 `#A08193` | Claude Code uses purple here; the mauve slot is the nearest MOSS value. |
| `error` | `red-bright` | Error text uses `red-bright` (§7). |
| `promptBorder`, `subtle`, `rate_limit_empty` | `faint` | Chrome that must be visible but quiet. `border` was too close to `bg` for an input box. |
| `userMessageBackground` / hover | `overlay` / `border` | Hover must lift above `overlay`; `active` is darker than it. `border` is the next step up. |
| `diffAddedWord` | `selection` | The darkest allowed interactive highlight (§8). |
| `diffRemovedWord` | `#34221F` (new) | Red counterpart of `selection`: `red` at 25% over `bg`, about the same luminance. |
| `inactiveShimmer` | `fg` | No token sits between `muted` and `fg`. |
| `*_FOR_SUBAGENTS_ONLY` | ANSI slots 1–6, 11, 13 | User-chosen agent colors. Red stays available because the user picks it. |
| `rainbow_*` (ultrathink) | mauve, ochre, olive, moss, slot 4, forest, mauve | Decorative, so red is left out (§13.10). Shimmers use the lifted slot. |
