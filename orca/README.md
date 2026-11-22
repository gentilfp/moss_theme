# MOSS — Orca theme

- **Spec:** SPEC.md v0.2 · **Port date:** 2026-11-01 · **Last checked:** 2026-11-22 (Orca 1.4.269)
- **Palette:** `tokens/moss.json` (ANSI slots per SPEC.md §9.2)
- **Format:** an Orca content-only plugin (`orca-plugin.json`) that contributes an
  app theme (`themes/moss.json`), a terminal palette (`terminal/moss.json`), a
  wallpaper (`images/moss-glow.webp`), plus a Warp-format `MOSS.yaml` for Orca's
  built-in theme importer
- **Modes:** dark only (`base: "dark"`; MOSS has no light palette)
- **Requires:** Orca 1.4.246 or later for the wallpaper, chrome, editor and
  terminal tokens. The chat text tokens need 1.4.254 or later; older releases
  ignore them and keep deriving chat from the app theme. Last checked against
  Orca 1.4.269 with `orca plugin validate` (macOS).

Orca's terminal is xterm.js, so its theme keys are the ones VS Code's terminal
uses: background, foreground, cursor, cursor accent, selection, and the 16 ANSI
slots. Its app chrome is themed separately through a fixed token list, and its
editor colors come from a VS Code-shaped `tokenColors` array — which is why this
port reuses the VS Code port's syntax rules unchanged.

## Files

| File                    | What it is                                                        |
| ----------------------- | ----------------------------------------------------------------- |
| `orca-plugin.json`      | Plugin manifest: `execution: "data"`, contributes both themes      |
| `themes/moss.json`      | App theme: 74 chrome tokens, 41 code-color rules, one wallpaper   |
| `images/moss-glow.svg`  | Wallpaper source: palette glows over `bg`                         |
| `images/moss-glow.webp` | The wallpaper Orca loads (2560×1600, 24 KB)                       |
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

The wallpaper only shows when **Settings → Terminal → Background Opacity** is
below 100% (85% is a good start) and **Appearance → Reduce visual effects** is
off; the macOS Reduce Transparency setting also hides it. If a theme update
leaves the old colours on screen, reselect **MOSS** in the app theme picker.

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

Every one of Orca's 74 public theme tokens is set explicitly, so nothing falls
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
| `--muted-foreground` | `muted` lifted | `#828B7E` | Secondary text, lifted because `muted` (`#70766B`) is 4.12:1 on `bg` and Orca drops text tokens under 4.5:1; this is 5.45:1 on `bg` and 4.83:1 on the `muted` fill, and keeps the green-grey cast (§4.1). |
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
| `--host-badge-foreground` | `muted` lifted | `#828B7E` | Badge text lifted to 4.73:1 on `--host-badge`, so the token survives Orca's 4.5:1 gate instead of reverting to a built-in grey. |
| `--tab-bar` | `bg` | `#0D0F0C` | The tab strip is the canvas, as in the VS Code port (`editorGroupHeader.tabsBackground`). |
| `--tab-active` | `overlay` | `#1B1F1A` | The active tab lifts one step above the strip. |
| `--tab-active-foreground` | `fg` | `#D7D9D2` | Active tab text is normal text. |
| `--tab-active-indicator` | `moss` | `#7E9273` | The underline under the active tab is the accent. |
| `--tab-inactive` | `bg` | `#0D0F0C` | Inactive tabs sit on the strip. |
| `--tab-inactive-foreground` | `muted` lifted | `#828B7E` | Inactive tab text uses the same lifted muted, 5.45:1 on the tab strip. |
| `--split-divider` | `border` | `#272C24` | Split dividers are hairlines. |
| `--split-divider-hover` | `moss` | `#7E9273` | A dragged divider shows the accent. |
| `--chat-user-message` | `moss` 12% | `rgba(126, 146, 115, 0.12)` | Your own chat messages take the moss tint; translucency over the chat canvas is Orca's own model for this token. |
| `--chat-bold-foreground` | `fg` lifted | `#E6E9DF` | Bold text in an answer, one step above body text. 14.4:1 on the canvas, 12.3:1 on the user bubble. |
| `--chat-muted-foreground` | `muted` lifted | `#828B7E` | Tool rows, timestamps and hunk headers; 5.0:1 on the canvas and 4.65:1 on code blocks, so Orca keeps it. |
| `--chat-inline-code` | `moss` 14% | `rgba(126, 146, 115, 0.14)` | Inline code takes a stronger moss wash than the user bubble so it reads as a separate surface. |
| `--chat-inline-code-foreground` | `ochre` | `#C7A46B` | Inline code text is the bright ochre, 6.2:1 on the moss wash (§4.1 value family). |
| `--chat-code-block` | `olive` 5.5% | `rgba(154, 153, 104, 0.055)` | Fenced code and tool output take a quiet olive wash, keeping code blocks distinct from prose without another grey. |
| `--chat-selection` | `moss` 30% | `rgba(126, 146, 115, 0.30)` | Selected chat text gets the moss selection instead of Orca's link-blue derivation. |
| `--chat-selection-foreground` | `fg` | `#D7D9D2` | Selected text keeps the normal text level, 7.9:1 on the selection. |
| `--text-link` | `moss` | `#7E9273` | Links are `moss` (§9.2). |
| `--editor-selection` | `moss` 30% | `rgba(126, 146, 115, 0.30)` | Monaco's selection is the moss tint, translucent so find matches still show through. |
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
| `--git-decoration-ignored` | `faint` lifted | `#5F6659` | Git-ignored files stay quiet, but 3.04:1 on the sidebar so Orca's 3:1 decoration gate keeps the MOSS tone (§8). |

Measured contrast on `bg`: `fg` 13.5:1, `muted` 5.45:1 (lifted), `moss` 5.7:1,
`ochre` 7.2:1, `red` 4.0:1. On `surface`: `fg` 12.7:1, `muted` 5.12:1,
`moss` 5.4:1, `ochre` 6.7:1, `olive` 6.1:1, `red` 3.7:1.

`node orca/check-theme-contrast.mjs` re-checks every pair Orca gates, plus the
wallpaper slot, and exits non-zero if Orca would drop a token or refuse the
image. It has no dependencies; run it after changing a value.

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

Orca's chat is themed from the app theme, and since Orca 1.4.254 it exposes a
small chat token family of its own. MOSS sets all of it; nothing about chat falls
back to Orca's neutral derivations.

- **Canvas.** There is no token for the chat canvas: Orca paints it as
  `--foreground` mixed 5% into `--background`, which is `#171916` for MOSS. That
  is why the canvas reads as a near-black rather than a moss surface, and why
  palette colour has to come from the wallpaper below rather than from a token.
- **Text.** Body text is 88% of `--foreground` over the canvas; bold text is
  `#E6E9DF`, muted text `#828B7E`, links `moss`.
- **Surfaces.** The user bubble is `moss` at 12%, inline code `moss` at 14% with
  `ochre` text, code blocks and tool output `olive` at 5.5%, selection `moss` at
  30%. Code blocks are highlighted from `tokenColors`, so they are MOSS whenever
  MOSS is the selected app theme.
- **Terminal palette.** **Settings → Appearance → Chat → Match terminal
  interface** switches the source to the terminal theme instead — canvas =
  terminal background, text = terminal foreground, font and text size locked to
  the terminal's — and re-derives chat's own accents from the foreground. In
  that mode Orca ignores the theme's chat and diff colors, including every
  `--chat-*` token above, so leave it **off** to see MOSS in chat.

| App theme | Match terminal interface | Result |
| --------- | ------------------------ | ------ |
| **MOSS** | **off** | Full MOSS: moss links, the moss user bubble, ochre inline code, olive code blocks, MOSS code colors, and chat font/size/width stay adjustable. **Recommended.** |
| **Match terminal** | **on** | Chat follows the terminal palette end to end; `--chat-*` and the diff tokens stop applying. Code blocks use Orca's base syntax colors rather than MOSS's `tokenColors`. |

Three chat colors stay internal (`--chat-warning` from `--status-warning`
`#EAB308`, `--chat-unread` from `--callout-note` `#4493F8`, and the `#4493F8` /
`#AB7DF8` callout notes). They are not themeable by a plugin, so warning and note
accents inside chat keep Orca's hues rather than `ochre` and `olive`; the public
token list is additive-only, so changing that needs an upstream Orca change.

## Wallpaper

An app theme can carry one image that Orca paints **under** translucent surfaces
(Orca 1.4.246+). MOSS ships a quiet palette glow so chat and terminals are not
flat near-black:

```json
"background": {
  "path": "images/moss-glow.webp",
  "opacity": 0.55,
  "size": "cover",
  "position": "center"
}
```

- `images/moss-glow.svg` is the source: `bg` with four off-canvas radial glows —
  `moss` upper left, `blue` lower right, `ochre` upper right, `mauve` lower
  left — plus a faint `forest` bridge. The glows sit at the edges, so the centred
  46rem chat column and terminal text stay on the darkest part of the image.
- `opacity: 0.55` blends the image into `--background`; at full strength it is
  deliberately stronger than the final result, so it also reads well at lower
  terminal opacity.
- **To see it:** **Settings → Terminal → Background Opacity** below 100% (85% is
  a good start) and **Reduce Visual Effects** off. On macOS, the system **Reduce
  Transparency** setting also turns it off. Chat paints the wallpaper through
  its canvas at no less than 80% opacity; user bubbles, code blocks, approval and
  question cards, the composer and menus stay opaque.
- Chat split beside terminals in one tab stays opaque. Sidebars, editors and
  pages are always opaque; the wallpaper is a chat-and-terminal feature.
- Regenerate after changing the palette:

  ```sh
  rsvg-convert -w 2560 -h 1600 images/moss-glow.svg -o /tmp/moss-glow.png
  magick /tmp/moss-glow.png -quality 88 -define webp:method=6 images/moss-glow.webp
  ```

## Deviation log (SPEC.md §11.10)

No new hues were invented. Every value is a §3 token, a §9.2 ANSI slot, or a §8
tint. Judgment calls:

- **All 74 tokens are set explicitly.** Orca derives any omitted token from
  `--background`/`--foreground`, which would turn MOSS's elevations and
  selection states into neutral greys. Listing every token keeps the surface
  ladder and the green accent exactly where the spec puts them. That includes the
  eight tokens Orca added after this port first shipped: the seven chat text
  tokens and `--editor-selection`.
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
- **The contrast-gated tokens are lifted, not dropped.** Orca rejects a text
  token that fails 4.5:1 on the surface it paints (3:1 for decorations), and
  falls back to a built-in colour. `muted` (`#70766B`) is only 4.12:1 on `bg`,
  and `faint` (`#4B5147`) only 2.21:1 on `surface`, so the port uses `#828B7E`
  for `--muted-foreground`, `--tab-inactive-foreground` and
  `--host-badge-foreground` (4.73:1 on the badge) and `#5F6659` for
  `--git-decoration-ignored` (3.04:1). These are the same MOSS greys one step
  lighter, not new hues, and they keep Orca from painting the theme's most
  characteristic text tones with its own neutral greys.
- **`bold` is not set in the terminal palette.** Orca's key list includes a
  `bold` color, but xterm renders SGR 1 as a heavier weight of the current
  color; §9.1 rule 10 asks for exactly that, so setting it would be a no-op.
- **The Warp YAML route is terminal-only and partial.** `name`, `accent`,
  `background`, `foreground`, `details` and `terminal_colors` are all Orca reads
  from that format; the cursor accent and both selection colors live only in the
  plugin route.
- **Chat uses the full token family, not just the bubble.** `--chat-user-message`
  is `moss` at 12%; the newer tokens take `moss` at 14% for inline code (with
  `ochre` text), `olive` at 5.5% for code blocks, `moss` at 30% for selection,
  `#E6E9DF` for bold and `#828B7E` for muted. Every pair clears Orca's 4.5:1
  gate, including muted on the tinted code block (4.65:1). With **Match terminal
  interface** on, Orca overrides the chat accents with foreground mixes and all
  of these stop applying.
- **The chat canvas itself is not themeable.** Orca paints it as 5% of
  `--foreground` over `--background`; only a wallpaper can put colour there. The
  wallpaper is `bg` plus four off-canvas palette glows at `opacity: 0.55`, so it
  is quiet at 100% terminal opacity and reads as a green/warm corner wash as
  background opacity drops. It never touches sidebars, editors or pages.
- **Dark only.** Orca app themes declare a `base`, and MOSS is dark only, so
  `base: "dark"` and the terminal palette declares `mode: "dark"`.
- **Two identities, one name.** The plugin id is `moss` (installed as
  `local.moss` until published) and both contributed themes are titled `MOSS`;
  the app picker and the terminal picker are separate lists, so the names do not
  collide.
