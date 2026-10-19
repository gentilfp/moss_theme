# MOSS — T3 Code theme

- **Spec:** SPEC.md v0.2 · **Port date:** 2026-10-14
- **Palette:** `tokens/moss.json` (core + derived tokens per SPEC §3)
- **Format:** T3 Code theme file v1 (`version`, `id`, `name`, `appearance`,
  `colors`), imported by hand in the app (`moss.json` is not linked from a
  config folder — T3 Code stores imported themes in its own library).
- **Modes:** dark only. T3 Code has no light palette to follow, and in
  System/Light appearance the app falls back to the theme's base appearance, so
  MOSS stays dark in every mode.
- **Tested with:** T3 Code (web/desktop) — theme imported and selected under
  Settings → Appearance.

## Install

1. Open **Settings → Appearance** and choose **Add a theme** (import).
2. Pick **Choose files** and select `t3code/moss.json`, or paste the file's
   contents into the Theme JSON box and confirm.
3. Select **MOSS**. If the OS is in light appearance, choose MOSS for the dark
   half (or set appearance to Dark) — MOSS is dark only.

There is nothing to symlink: T3 Code copies imported themes into its own theme
library (browser `localStorage`, `t3code:themes:v1`). After a `git pull`,
import `t3code/moss.json` again to pick up palette changes.

## Role mapping

T3 Code's theme file exposes 61 UI color roles (no syntax, diff, or ANSI roles —
see the deviation log). Values are the 16 SPEC tokens, the two state tints
derived at SPEC §8 alpha, and ANSI slot 10 where a lighter `moss` is needed.

| T3 Code role | MOSS | Hex | Reason |
| --- | --- | --- | --- |
| `canvas` | `bg` | `#0D0F0C` | Main background (§4.2 editor/main area). |
| `chrome` | `bg` | `#0D0F0C` | Window chrome is part of the background plane. |
| `toolbar`, `surface`, `surfaceRaised` | `surface` | `#141713` | Sidebar/titlebar/toolbar are `surface` (§4.2); T3 Code cards use the same plane. |
| `surfaceOverlay` | `overlay` | `#1B1F1A` | Menus, popups, floating panels (§4.2). |
| `text`, `toolbarForeground`, `toolbarControlForeground`, `secondaryForeground`, `messageForeground`, `codeForeground`, `accentSurfaceForeground`, `sidebarForeground`, `terminalForeground` | `fg` | `#D7D9D2` | The brightest token, normal text everywhere (§4.1). |
| `textMuted`, `mutedForeground`, `placeholder`, `secondaryLabel`, `iconMuted`, `sidebarMutedForeground` | `muted` | `#70766B` | Secondary text (§4.1). |
| `border`, `toolbarBorder`, `sidebarBorder` | `border` | `#272C24` | Subtle borders/dividers (§4.2). |
| `input` | `faint` | `#4B5147` | Input outlines need more presence than `border` (1.35:1 on `bg`); same call as the Pi and Claude Code ports. |
| `focus`, `accent`, `terminalCursor` | `moss` | `#7E9273` | Focus and cursor are always `moss`, never warm (§4.2, §13.11). |
| `accentForeground`, `messageActionForeground` | `bg` | `#0D0F0C` | Dark text on a solid `moss` control. |
| `secondary`, `muted` | `surface` | `#141713` | Quiet chip/badge surfaces on the canvas. |
| `toolbarControl`, `sidebarControlSurface`, `sidebarRowHover` | `active` | `#191D18` | Hover/pressed rows and controls one step above their surface (§3.2). |
| `toolbarControlHover` | `overlay` | `#1B1F1A` | Toolbar control hover, one step above `active`. |
| `accentSurface`, `sidebarRowActive`, `sidebarRowSelected`, `terminalSelection` | `selection` | `#2A3527` | Interactive highlight / selection background (§3.2, §4.2, §9.2). |
| `messageSurface` | `overlay` | `#1B1F1A` | User message bubbles are elevated cards; `fg` on it is 11.7:1. |
| `codeBackground` | `surface` | `#141713` | Code blocks sit below message bubbles, as in T3 Code's own dark theme. |
| `messageAction` | `moss` | `#7E9273` | T3 Code routes all solid CTAs (send button, switches, sliders) through this role. |
| `messageActionHover` | slot 10 | `#92A389` | The only spec'd lighter `moss` (`moss` +15% HSL lightness, §9.2); text on it is 7.2:1. |
| `error` | `red` | `#A75D57` | Error marks, icons, squiggles (§7). |
| `errorForeground` | `red-bright` | `#C06B63` | Error **text** is always `red-bright` (§7). |
| `errorSurface` | `red` @ 12% | `#1F1815` | State panel tint at §8 alpha over `bg`. |
| `warning` | `ochre` | `#B69A64` | Warnings are ochre (§7). |
| `warningForeground` | `ochre-bright` | `#C7A46B` | Stronger warning text (§7). |
| `warningSurface` | `ochre` @ 12% | `#212017` | State panel tint at §8 alpha over `bg`. |
| `update`, `updateForeground` | `moss` | `#7E9273` | Info state is `moss`; MOSS has no blue (§7, §13.4). |
| `updateSurface` | `moss` @ 12% | `#1B1F18` | State panel tint at §8 alpha over `bg`. |
| `searchMatchBackground` / `searchMatchForeground` | `active` / `moss` | `#191D18` / `#7E9273` | Quieter tier of the search highlight, 5.1:1. |
| `searchMatchActiveBackground` / `searchMatchActiveForeground` | `selection` / `fg` | `#2A3527` / `#D7D9D2` | Current match, 9.0:1. |
| `terminalBackground` | `bg` | `#0D0F0C` | Terminal stays near-black (§9.1). |
| `terminalScrollbar` / `terminalScrollbarHover` | `faint` / `muted` | `#4B5147` / `#70766B` | Quiet thumb, clearer on hover. |

Contrast spot-checks (recomputed): `fg` on `bg` 13.5:1, `fg` on `overlay` 11.7:1,
`muted` on `bg` 4.1:1, `moss` on `bg` 5.7:1, `moss` on `surface` 5.4:1,
`fg` on `selection` 9.0:1, `red-bright` on `errorSurface` 4.6:1.

## Deviation log (SPEC.md §11.10)

No new colors were invented. Every value is a SPEC token, the two state tints at
§8 alpha over `bg`, or ANSI slot 10 (§9.2). Judgment calls:

1. **Dark only.** MOSS has no light palette, so the port ships a single dark
   base. T3 Code treats a theme without the requested appearance as
   single-appearance and applies the base instead (§13.9 — no invented light
   chrome).
2. **`toolbar` → `surface`,** per §4.2 (titlebar/toolbar are `surface`). T3
   Code's built-in dark theme keeps canvas/chrome/toolbar identical; MOSS gives
   the toolbar the same plane as the sidebar, so the app frames the content with
   one band.
3. **`input` → `faint`.** T3 Code uses this role as a form-field outline. The
   real `border` token is 1.35:1 on `bg` — visible as a divider, too quiet to
   mark an editable field. `faint` (2.35:1) is the token for elements that must
   read but stay quiet. Precedent: Pi `border` → `faint`, Claude Code
   `promptBorder` → `faint`.
4. **Search match uses two palette steps.** SPEC §4.2 describes the match as
   `selection` bg + `moss` text and differentiates the current match with a
   `moss` outline. T3 Code has no outline role, and `moss` on `selection` is
   only **3.8:1** — below the §10 readability target. So the quieter tier is
   `active` bg + `moss` text (5.1:1) and the current match is `selection` bg +
   `fg` text (9.0:1). Both backs are palette tokens; the difference is
   carried by background step *and* text color, which is the closest T3 Code
   analogue of the spec's outline.
5. **`messageActionHover` → `#92A389`.** ANSI slot 10 (moss +15% HSL lightness,
   same hue and saturation) is the only lighter `moss` the spec defines, and the
   hover state of the send button needs one. It is a brightness lift, not a
   chroma lift (rule §11.6). T3 Code's own dark theme darkens on hover instead;
   MOSS lightens, so the `bg` label keeps 7.2:1.
6. **State surfaces as solid hex.** T3 Code theme colors accept no alpha, so
   `errorSurface`/`warningSurface`/`updateSurface` are the state token at 12%
   over `bg` (§8, 12% is inside the 8–14% band): `#1F1815`, `#212017`,
   `#1B1F18`. The first and third match the tints already documented by the Pi
   and Claude Code ports; the ochre tint differs from Pi's `export.infoBg`
   (`ochre` @10%, `#1E1D15`) only because this port uses one alpha for every
   state surface.
7. **`accentForeground` / `messageActionForeground` → `bg`.** Solid `moss`
   controls need dark labels; `moss` is a light-ish token (5.7:1 on `bg`), so
   light text on it would be unreadable.
8. **`update`/`updateForeground` → `moss`.** MOSS has no blue, and the info
   state is `moss` (§7). T3 Code's built-ins use blue here.
9. **`surfaceRaised` = `surface`.** T3 Code's own themes keep raised and base
   surfaces equal; MOSS has an `overlay` step for genuinely elevated surfaces,
   and spending `active` here would collide with row hover.
10. **`faint` has only two homes.** T3 Code exposes no disabled-text or
    line-number role (line numbers and syntax live in Shiki, outside the theme
    file), so `faint` is used only for input outlines and the terminal
    scrollbar.
11. **No syntax, diff, or ANSI colors reach the app.** T3 Code highlights code
    blocks with fixed Shiki themes (`pierre-dark` / `pierre-light`) and its
    terminal ANSI palette is a fixed light/dark table, both independent of the
    theme file; only terminal background, foreground, cursor, selection, and
    scrollbars are themeable. So SPEC §5.1 syntax mapping and §9 ANSI slots
    cannot be expressed here — this is a UI-only port, like the Claude Code one.
