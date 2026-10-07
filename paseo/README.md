# MOSS — Paseo theme

- **Spec:** SPEC.md v0.2 · **Port date:** 2026-10-07
- **Palette:** `tokens/moss.json`
- **Format:** a Paseo plugin. One `addTheme` call in `index.client.tsx`.
- **Modes:** dark only. Requires Paseo 0.10.0 or later. Tested on 0.10.3.

## Install

From this repository, locally:

```bash
cd paseo
npm install
npm run typecheck
paseo plugin install "$PWD"
```

Plugins must be on first: **Settings → Plugins → Enable plugins**, or
`"pluginsEnabled": true` in the daemon `config.json`. Then pick **MOSS** under
**Settings → Appearance**. After edits, run `paseo plugin reload moss`.

## Token mapping

Paseo takes 8 seed colors and derives surfaces, status, diff, syntax and
terminal colors itself.

| Paseo token | MOSS token | Hex |
| ----------- | ---------- | --- |
| `background` | `bg` | `#0D0F0C` |
| `foreground` | `fg` | `#D7D9D2` |
| `raised` | `overlay` | `#1B1F1A` |
| `control` | `border` | `#272C24` |
| `border` | `border` | `#272C24` |
| `accent` | `moss` | `#7E9273` |
| `mutedForeground` | `muted` | `#70766B` |
| `ring` | `muted` | `#70766B` |

## Deviation log (SPEC.md §11.10)

No new colors were invented. Judgment calls:

- **`ring`:** `muted`. Paseo uses `ring` for terminal bright black, and
  SPEC.md §9.2 sets slot 8 to `muted`.
- **`control`:** `border`, the next step up from `overlay`. MOSS has no
  separate input fill.
- **Derived colors:** Paseo computes status, diff, syntax and the other
  terminal slots. They will not match SPEC.md §5, §8 and §9 exactly. Paseo
  gives no way to override them.
