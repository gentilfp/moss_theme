# MOSS — Slack theme

- **Spec:** SPEC.md v0.2 · **Port date:** 2026-10-01
- **Palette:** `tokens/moss.json`
- **Format:** a Slack theme string in `theme.txt`: four hex colors, comma
  separated. Slack has no theme file, so this is the whole port.
- **Modes:** dark only.

## Install

1. Open Slack, then Preferences, Themes.
2. Choose the Custom theme tab and click Import.
3. Paste the contents of `theme.txt`: `#141713, #2A3527, #7E9273, #B69A64`.
4. Click Apply.

## Token mapping

| Slack slot | MOSS token | Hex |
| ---------- | ---------- | --- |
| System navigation | `surface` | `#141713` |
| Selected items | `selection` | `#2A3527` |
| Presence indication | `moss` | `#7E9273` |
| Notifications | `ochre` | `#B69A64` |

## Deviation log (SPEC.md §11.10)

No new colors were invented. Judgment calls:

- **Only four colors:** Slack derives the rest of the UI from these. It also
  adapts colors to keep contrast, so the result can shift slightly from the
  hexes above.
- **Selected items:** `selection`, not `overlay`. `overlay` looked too gray
  in testing; the green tint of `selection` fixes that.
- **Notifications:** `ochre`, so the badge stands out. `fg` made it a
  near-white blob.
- **If the selected row is too green:** use `#232B21` for slot 2. This is a
  dimmer value picked by eye and is not a MOSS token.
