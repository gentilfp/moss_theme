# MOSS — ZapFast theme

- **Spec:** SPEC.md v0.2 · **Port date:** 2026-10-09
- **Palette:** `tokens/moss.json` (ANSI slots per SPEC.md §9.2)
- **Format:** a ZapFast theme file (`themes/<name>.json`), `base: "dark"`, every
  colour ZapFast accepts except `shadow` set explicitly
- **Modes:** dark only. MOSS has no light palette, so the same values serve
  ZapFast's light and dark appearance settings.
- **Tested with:** ZapFast 0.19.0 (macOS)

## Install

```sh
THEMES="$HOME/Library/Application Support/me.paolino.zapfast/themes"
mkdir -p "$THEMES"
ln -sf ~/Developer/moss_theme/zapfast/moss.json "$THEMES/moss.json"
zapfast reload-themes
```

Pick **Moss** under Settings, Appearance, or use **Open themes folder** there.
The picker names a theme after its file, so `moss.json` shows as **Moss**.
On Linux the themes folder is `~/.config/zapfast/themes/`, and ZapFast notices
changes there without `reload-themes`.

ZapFast keeps the last palette that worked, so a broken or deleted file never
resets the appearance. After a `git pull` on macOS, run `zapfast reload-themes`
again.

## Token mapping

| ZapFast | MOSS token | Hex | Reason |
| ------- | ---------- | --- | ------ |
| `window` | `bg` | `#0D0F0C` | Main background, near-black, never pure black (§3.1). |
| `panel` | `surface` | `#141713` | ZapFast's chat list and Settings are secondary chrome (§4.2). |
| `surface` | `overlay` | `#1B1F1A` | Fields, cards and menus are the theme's elevated surfaces (§4.2). |
| `surface_hover` | `border` | `#272C24` | Hover lifts above `overlay`; `border` is the next step up. |
| `surface_active` | `selection` | `#2A3527` | The selected chat is the theme's selection background (§4.2). |
| `outline` | `border` | `#272C24` | Dividers and outlines, never a pure grey (§4.2). |
| `text` | `fg` | `#D7D9D2` | Normal text, the brightest token (§4.1). |
| `secondary` | `muted` | `#70766B` | Previews and times are secondary text (§4.1). |
| `dim` | `faint` | `#4B5147` | Hints and placeholders are the quiet text level (§4.1). |
| `accent` | `moss` | `#7E9273` | Identity accent; buttons, selection and highlights (§4.2). |
| `accent_hover` | slot 10 | `#92A389` | `moss` lifted 15% (§9.2), not an ad-hoc mix. |
| `on_accent` | `bg` | `#0D0F0C` | Text on `moss`; `bg` on `moss` is 5.7:1. |
| `danger` | `red-bright` | `#C06B63` | Error text always uses `red-bright` (§7); `red` is only 4.0:1. |
| `warning` | `ochre` | `#B69A64` | Warnings are ochre (§7). |
| `overlay` | `overlay` | `#1B1F1A` | Dialogs and floating cards; MOSS pairs them with a `border` outline (§4.2). |
| `chat` | `bg` | `#0D0F0C` | Conversation canvas and theme wallpaper (§4.2 main area). |
| `bubble_in` | `overlay` | `#1B1F1A` | Incoming messages are raised cards on the canvas. |
| `bubble_out` | `selection` | `#2A3527` | Own messages take the `moss` tint; `fg` on it is 9.0:1. |
| `link` | `moss` | `#7E9273` | Hyperlinks are `moss` (§9.2). |
| `read` | `moss` | `#7E9273` | Read ticks follow the accent; MOSS has no blue (§9.2). |

## Elevation ladder

MOSS keeps its surfaces close (§2.7), so ZapFast's surface slots take the MOSS
surface tokens in luminance order. Every step lands between 1.06:1 and 1.17:1,
the band the spec uses for its own surfaces (`bg` to `surface` is 1.065 here,
`surface` to `overlay` is 1.082).

| ZapFast | MOSS token | Hex | Step above the row before |
| ------- | ---------- | --- | ------------------------- |
| `window` | `bg` | `#0D0F0C` | — |
| `panel` | `surface` | `#141713` | 1.065:1 |
| `surface` | `overlay` | `#1B1F1A` | 1.082:1 |
| `surface_hover` | `border` | `#272C24` | 1.171:1 |
| `surface_active` | `selection` | `#2A3527` | 1.112:1 |

`outline` shares the hover step (`border`). Dialogs and incoming bubbles sit on
the `overlay` step, one below the hover fill.

## Deviation log (SPEC.md §11.10)

No new colors were invented. Every value is a SPEC.md §3 token or an ANSI slot
from §9.2. Judgment calls:

- **`surface` is `overlay`, not `active`.** ZapFast's `surface` covers fields,
  cards and menus, which is MOSS's elevated-surface role (§4.2 "Panel, palette,
  popup, menu, tooltip"). It is also the step above `surface` in the theme's own
  ladder, so hover keeps a real step; mapping `surface` to `active` would leave
  hover at 1.02:1, tighter than any step MOSS uses between its own surfaces.
- **`surface_hover` is `border`.** Hover must lift above `overlay`, and `active`
  is darker than it. `border` is the next step up, the same call the Claude Code
  port makes for surfaces that hover above `overlay`.
- **`overlay` is `overlay`.** Dialogs get the theme's elevated surface; MOSS
  prescribes an outline for them as well, which here is the `border` outline the
  app draws.
- **`active` is unused.** ZapFast has no cursor-line or pressed-row slot, and its
  hover and selection states take `border` and `selection`.
- **`accent_hover` uses ANSI slot 10.** ZapFast derives it as 15% of the
  foreground mixed into the accent (`#8B9C81`). Slot 10 `#92A389` is `moss`
  lifted 15% and already fixed by §9.2, so the port uses the spec value.
- **`danger` is `red-bright`.** ZapFast has one destructive token and uses it for
  error text; §7 requires `red-bright` for text, since `red` is 4.0:1 on `bg`.
- **`read` is `moss`.** ZapFast defaults the read ticks to a blue MOSS does not
  have. The theme's colour list says `link` and `read` follow the accent, and
  §9.2 pairs hyperlinks with `moss`.
- **`dim` is `faint`** for hints and placeholders, the same call as the Pi
  port. If hints read as too dim, the allowed fix is a documented `muted` lift
  of at most 6% (§10).
- **`on_accent` is `bg`,** which keeps the near-black background under button
  labels.
- **`bubble_out` is `selection`.** ZapFast's default mixes the accent into a
  surface; `selection` is `moss` at about 30% brightness, which is that idea
  already fixed in the palette, and `fg` on it stays at 9.0:1.
- **`bubble_in` is `overlay`,** the theme's elevated surface, so incoming
  messages read as cards above the chat canvas.
- **`chat` is `bg`,** so the conversation area and the theme wallpaper stay
  near-black; ZapFast's own default also follows the window colour.
- **`shadow` is not set.** MOSS has no shadow token, so the port keeps the
  `dark` base shadow ZapFast ships. The built-in palettes omit it too.
- **Dark only.** ZapFast's appearance setting is separate from a theme's `base`.
  The file declares `base: "dark"`, so every colour MOSS leaves out (only
  `shadow`) comes from the dark base, not from the app's light setting.
