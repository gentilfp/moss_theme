# MOSS — Orca theme

- **Spec:** SPEC.md v0.2 · **Port date:** 2026-11-01
- **Palette:** `tokens/moss.json` (ANSI slots per SPEC.md §9.2)
- **Format:** an Orca content-only plugin (`orca-plugin.json`) that contributes an
  app theme (`themes/moss.json`), a terminal palette (`terminal/moss.json`), plus
  a Warp-format `MOSS.yaml` for Orca's built-in theme importer
- **Modes:** dark only (`base: "dark"`; MOSS has no light palette)
- **Requires:** Orca 1.4.246 or later (plugin manifest v2, publisher derived from
  the install source). Validated with `orca plugin validate` on Orca 1.4.246 (macOS)

Orca's terminal is xterm.js, so its theme keys are the ones VS Code's terminal
uses: background, foreground, cursor, cursor accent, selection, and the 16 ANSI
slots. Its app chrome is themed separately through a fixed token list, and its
editor colors come from a VS Code-shaped `tokenColors` array — which is why this
port reuses the VS Code port's syntax rules unchanged.

## Files

| File                    | What it is                                                        |
| ----------------------- | ----------------------------------------------------------------- |
| `orca-plugin.json`      | Plugin manifest: `execution: "data"`, contributes both themes      |
| `themes/moss.json`      | App theme: 66 chrome tokens + the 41 code-color rules              |
| `terminal/moss.json`    | Terminal palette: the 22 xterm keys Orca reads                     |
| `MOSS.yaml`             | Warp-format theme for Settings → Terminal → Import from YAML       |

## Install

Two routes. The plugin is the complete one; the YAML needs no plugins at all.

### Plugin (app chrome + editor + terminal)

```sh
orca plugin system on                              # once, if plugins are off
orca plugin dev load ~/Developer/moss_theme/orca   # adds the folder as a dev plugin
```

`dev load` links the folder in **Settings → Plugins → Development folders** and
makes it `local.moss`; nothing is copied. If Orca lists it as disabled, enable
it there — content-only plugins load without approval. Then pick **MOSS** in the
app theme picker and again in the terminal theme picker. Orca reloads the folder
whenever its files change, so a `git pull` is enough. To remove it:
`orca plugin dev unload ~/Developer/moss_theme/orca`.

Installing it from the plugin directory instead is what gives it a publisher
other than `local`.

### Warp YAML (terminal only)

**Settings → Terminal →** theme picker **→ Import from YAML →** pick
`orca/MOSS.yaml`. It appears next to Orca's built-in themes as **MOSS**.

This format carries name, accent (Orca uses it as the cursor color),
background, foreground and the 16 ANSI slots. It cannot carry the cursor accent
or the selection colors, so those stay at Orca's defaults — use the plugin route
if you want them. Orca stores imported themes in its own settings, so re-import
the file after a `git pull`.

## App theme tokens

Every one of Orca's 66 public theme tokens is set explicitly, so nothing falls
back to Orca's own derivation. The mapping follows the VS Code port wherever the
two apps have the same token.

| Orca token | MOSS | Hex | Reason |
| ---------- | ---- | --- | ------ |
| `--background` | `bg` | `#0D0F0C` | App canvas, near-black, never pure black (§3.1, §11.5). |
| `--editor-surface` | `bg` | `#0D0F0C` | Editor and notebook canvas; the VS Code port's `editor.background` is `bg` too. |
| `--foreground` | `fg` | `#D7D9D2` | Normal text, the brightest token in the theme (§4.1). |
| `--card` | `surface` | `#141713` | Cards and panels are secondary chrome (§4.2). |
| `--popover` | `overlay` | `#1B1F1A` | Menus, popovers and dialogs are the elevated surface (§4.2). |
| `--card-foreground`, `--popover-foreground` | `fg` | `#D7D9D2` | Text on cards and popovers keeps the normal text level. |
| `--primary` | `moss` | `#7E9273` | Primary buttons are the identity green (§4.2, §11.11). |
| `--primary-foreground` | `bg` | `#0D0F0C` | Text on `moss`; `bg` on `moss` is 5.7:1. |
| `--secondary` | `overlay` | `#1B1F1A` | Quiet raised button fill, as in the VS Code port (`button.secondaryBackground`). |
| `--secondary-foreground` | `fg` | `#D7D9D2` | Text on the secondary fill. |
| `--muted` | `active` | `#191D18` | Quiet fills sit one step above `surface`, under `overlay` (§4.2). |
| `--muted-foreground` | `muted` | `#70766B` | Secondary text: readable but clearly subdued (§4.1). |
| `--accent` | `selection` | `#2A3527` | Hover and selected fills take the selection background (§4.2). |
| `--accent-foreground` | `fg` | `#D7D9D2` | Text on `accent`; 9.0:1. |
| `--border` | `border` | `#272C24` | Borders and separators, never a pure grey (§4.2). |
| `--input` | `border` | `#272C24` | Input borders are the same hairline. |
| `--ring` | `moss` | `#7E9273` | Focus rings are the accent, never red or ochre (§13.11). |
| `--chart-1` … `-5` | `moss`, `ochre`, slots 4/5, `olive` | see file | Five distinguishable series from hues the spec already fixes (§9.2); no new colors. |
| `--sidebar`, `--worktree-sidebar` | `surface` | `#141713` | Both sidebars are secondary chrome (§4.2). |
| `--sidebar-foreground`, `--worktree-sidebar-foreground` | `fg` | `#D7D9D2` | Sidebar rows use the normal text level. |
| `--sidebar-primary`, `--sidebar-ring`, `--worktree-sidebar-ring` | `moss` | `#7E9273` | Primary controls and focus rings in sidebars follow the accent. |
| `--sidebar-primary-foreground` | `bg` | `#0D0F0C` | Text on the accent control. |
| `--sidebar-accent`, `--sidebar-accent-foreground` | `selection`, `fg` | `#2A3527`, `#D7D9D2` | Selected and hovered rows take the selection fill. |
| `--worktree-sidebar-accent`, `--worktree-sidebar-accent-foreground` | `selection`, `fg` | `#2A3527`, `#D7D9D2` | Same for the left sidebar. |
| `--sidebar-border`, `--worktree-sidebar-border` | `border` | `#272C24` | Sidebar hairlines. |
| `--worktree-sidebar-active` | `moss` 10% | `rgba(126, 146, 115, 0.10)` | The current workspace row: Orca lets this token be translucent over `--worktree-sidebar`, and §8's 8–14% tint band is the right weight for a row that is always visible. |
| `--worktree-sidebar-active-border` | `moss` | `#7E9273` | Border of the current workspace row; an accent role, not a warning one. |
| `--host-badge` | `overlay` | `#1B1F1A` | The execution-host pill is a raised chip. |
| `--host-badge-foreground` | `muted` | `#70766B` | Badge text stays quiet (3.6:1); Orca's contrast check may lift it. |
| `--tab-bar` | `bg` | `#0D0F0C` | The tab strip is the canvas, as in the VS Code port (`editorGroupHeader.tabsBackground`). |
| `--tab-active` | `overlay` | `#1B1F1A` | The active tab lifts one step above the strip. |
| `--tab-active-foreground` | `fg` | `#D7D9D2` | Active tab text is normal text. |
| `--tab-active-indicator` | `moss` | `#7E9273` | The underline under the active tab is the accent. |
| `--tab-inactive` | `bg` | `#0D0F0C` | Inactive tabs sit on the strip. |
| `--tab-inactive-foreground` | `muted` | `#70766B` | Inactive tab text is secondary. |
| `--split-divider` | `border` | `#272C24` | Split dividers are hairlines. |
| `--split-divider-hover` | `moss` | `#7E9273` | A dragged divider shows the accent. |
| `--chat-user-message` | `moss` 12% | `rgba(126, 146, 115, 0.12)` | Your own chat messages take the moss tint; translucency over the chat canvas is Orca's own model for this token. |
| `--text-link` | `moss` | `#7E9273` | Links are `moss` (§9.2). |
| `--diff-added` | `moss` | `#7E9273` | Added-line hue and chat diff text (§8). |
| `--diff-added-background` | `moss` ≈12% over `bg` | `#1B1F18` | §8 tint, written as the solid hex the VS Code port uses so the ratio is exact over the editor. |
| `--diff-added-emphasis` | `moss` 20% | `rgba(126, 146, 115, 0.20)` | Changed characters inside an added line. |
| `--diff-added-gutter` | `moss` 30% | `rgba(126, 146, 115, 0.30)` | The gutter marker beside an added line. |
| `--diff-removed` | `red` | `#A75D57` | Removed-line hue (§8); §7 reserves `red-bright` for error text. |
| `--diff-removed-background` | `red` ≈12% over `bg` | `#1F1815` | The VS Code port's `removedLineBackground`, same hex. |
| `--diff-removed-emphasis` | `red` 20% | `rgba(167, 93, 87, 0.20)` | Changed characters inside a removed line. |
| `--diff-removed-gutter` | `red` 30% | `rgba(167, 93, 87, 0.30)` | The gutter marker beside a removed line. |
| `--git-decoration-added`, `-untracked` | `moss` | `#7E9273` | Added and untracked share the added green (§8). |
| `--git-decoration-modified`, `-renamed` | `ochre` | `#B69A64` | Modified files, and §8's "rename/adjust markers". |
| `--git-decoration-deleted` | `red` | `#A75D57` | Deleted files (§8). |
| `--git-decoration-copied` | `olive` | `#9A9968` | No status in §8; olive is the warm value family, distinct from renamed and added. |
| `--git-decoration-ignored` | `faint` | `#4B5147` | Git-ignored files stay certainly quiet (§8). |

Measured contrast on `bg`: `fg` 13.5:1, `muted` 4.1:1, `moss` 5.7:1,
`ochre` 7.2:1, `red` 4.0:1. On `surface`: `fg` 12.7:1, `muted` 3.9:1,
`moss` 5.4:1, `ochre` 6.7:1, `olive` 6.1:1, `red` 3.7:1, `faint` 2.2:1.

## Code colors

`themes/moss.json` carries the VS Code port's 41 `tokenColors` rules verbatim,
minus the `background` key some of them set: Orca's theme format accepts only
`foreground` and `fontStyle` per rule, and refuses anything else. That keeps
comments `muted`, keywords and strings where §5.1 puts them, and the file diffs
in `tokenColors` on the same tints as the editor.

## Terminal palette

| Orca (xterm) | MOSS | Hex | Reason |
| ------------ | ---- | --- | ------ |
| `background` | `bg` | `#0D0F0C` | Near-black grid (§9.1 rule 1). |
| `foreground` | `fg` | `#D7D9D2` | Normal terminal text (§4.1). |
| `cursor` | `moss` | `#7E9273` | Solid `moss` cursor (§9.1 rule 11, §14 #8). |
| `cursorAccent` | `bg` | `#0D0F0C` | Text under the block cursor; 5.7:1 on `moss`, the same call the Ghostty port makes with `cursor-text`. |
| `selectionBackground` | `selection` | `#2A3527` | Selection background (§9.1 rule 11). |
| `selectionForeground` | `fg` | `#D7D9D2` | Selected text keeps the normal text level; 9.0:1. |
| `black` … `white` | slots 0–7 | §9.2 | Projection of the palette onto the 16-slot model. |
| `brightBlack` … `brightWhite` | slots 8–15 | §9.2 | Lifted, never vivid (§9.1 rule 9). |

Measured on `bg`: the four dimmest slots are `red` 4.0:1, `blue` 4.2:1,
`magenta` 4.2:1 and `brightBlack` 4.1:1; everything else is above 5:1.

## Chat

Orca's chat has no theme of its own and no contribution point: a plugin cannot
ship chat colors. It paints from two sources, and both are covered here.

- **App theme tokens.** The chat canvas is `--foreground` mixed 5% into
  `--background`; body text is 78% of `--foreground` over that canvas; cards,
  borders, hover fills, links and diffs read the same 66 tokens above. Code
  blocks in chat are highlighted from the app theme's `tokenColors`, so they are
  MOSS whenever MOSS is the selected app theme.
- **Terminal palette.** **Settings → Appearance → Chat → Match terminal
  interface** switches the source to the terminal theme instead — canvas =
  terminal background, text = terminal foreground, font and text size locked to
  the terminal's — and re-derives chat's own accents from the foreground
  (`--accent`, `--primary`, `--border`, `--card`, `--popover`, `--ring` become
  foreground mixes over the canvas, and the user bubble falls back to a
  foreground mix, so `--chat-user-message` stops applying).

So chat turns MOSS in either of these two setups:

| App theme | Chat → Match terminal interface | Result |
| --------- | ------------------------------- | ------ |
| **MOSS** | **off** | Full MOSS: moss links, `selection` for selected rows, the moss user bubble, MOSS code colors, and chat font/size/width stay adjustable. **Recommended.** |
| **Match terminal** | **on** | Chat follows the terminal palette end to end, with chat accents as foreground mixes. Code blocks use Orca's base syntax colors rather than MOSS's `tokenColors`, because the editor theme is then the terminal palette rather than a plugin theme. |

`--chat-user-message` is the only chat token in Orca's public theme list, and it
is set above. Three chat colors are internal (`--chat-warning` from
`--status-warning` `#EAB308`, `--chat-unread` from `--callout-note` `#4493F8`,
and the `#4493F8` / `#AB7DF8` callout notes). They are not themeable by a plugin,
so warning and note accents inside chat stay Orca's hues rather than `ochre` and
`olive`; the public token list is additive-only, so changing that needs an
upstream Orca change.

## Deviation log (SPEC.md §11.10)

No new hues were invented. Every value is a §3 token, a §9.2 ANSI slot, or a §8
tint. Judgment calls:

- **All 66 tokens are set explicitly.** Orca derives any omitted token from
  `--background`/`--foreground`, which would turn MOSS's elevations and
  selection states into neutral greys. Listing every token keeps the surface
  ladder and the green accent exactly where the spec puts them.
- **Charts use four families.** `--chart-1…5` need five distinguishable series
  and MOSS has no chart palette. They take `moss`, `ochre`, ANSI slot 4
  (blue-green), slot 5 (mauve-grey) and `olive` — the two non-green entries are
  hues §9.2 already fixed, so the port stays inside the palette.
- **`--muted` is `active`, `--accent` is `selection`.** Orca's `muted` is a quiet
  fill, not quiet text (that is `--muted-foreground`), so it takes the pressed/hover
  row tone; `accent` is the hover/selected fill, which is `selection`.
- **The sidebar-active row is a moss tint.** Orca documents
  `--worktree-sidebar-active` as possibly translucent over
  `--worktree-sidebar`; §8's 8–14% alpha band gives the current workspace row a
  visible but quiet fill instead of a solid panel.
- **Diff backgrounds are solid hexes.** Orca paints transcript diffs over the
  editor surface, so `#1B1F18` / `#1F1815` (moss and red at about 12% over `bg`,
  §8's band) are used instead of alpha, matching the VS Code port exactly. The
  emphasis and gutter tokens keep alpha, which is how Orca's own derivation
  paints them.
- **`--diff-removed` is `red`, not `red-bright`.** §7 requires the lifted red for
  error text. A diff line hue is decoration, and both the VS Code and Tern ports
  make the same call.
- **`--git-decoration-copied` is `olive`.** §8 has no copied status. `renamed`
  is `ochre` ("rename/adjust markers"), so copied takes the next quiet warm
  tone rather than repeating `ochre` or borrowing the green.
- **The tab strip is `bg`, the active tab `overlay`.** That is the VS Code port's
  tab mapping (strip `editorGroupHeader.tabsBackground` = `bg`, active tab =
  `overlay`, indicator = `moss`) carried over so the two apps read the same.
- **`--editor-surface` is `bg`.** §4.2 gives the editor the main canvas; the VS
  Code port's `editor.background` is `bg` too.
- **`--host-badge` is a quiet chip.** `overlay` fill with `muted` text is 3.6:1,
  below AA for body text but this is a badge, and Orca applies its own contrast
  check before painting.
- **`bold` is not set in the terminal palette.** Orca's key list includes a
  `bold` color, but xterm renders SGR 1 as a heavier weight of the current
  color; §9.1 rule 10 asks for exactly that, so setting it would be a no-op.
- **The Warp YAML route is terminal-only and partial.** `name`, `accent`,
  `background`, `foreground`, `details` and `terminal_colors` are all Orca reads
  from that format; the cursor accent and both selection colors live only in the
  plugin route.
- **`--chat-user-message` is `moss` at 12%.** It is the whole of Orca's public
  chat surface; the rest of chat derives from the tokens around it, so no further
  chat tokens exist to set. With **Match terminal interface** on, Orca overrides
  the chat accents with foreground mixes and this token stops applying.
- **Dark only.** Orca app themes declare a `base`, and MOSS is dark only, so
  `base: "dark"` and the terminal palette declares `mode: "dark"`.
- **Two identities, one name.** The plugin id is `moss` (installed as
  `local.moss` until published) and both contributed themes are titled `MOSS`;
  the app picker and the terminal picker are separate lists, so the names do not
  collide.
