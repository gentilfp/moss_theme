# MOSS — Tern theme

- **Spec:** SPEC.md v0.2 · **Port date:** 2026-10-21
- **Palette:** `tokens/moss.json` (ANSI slots per SPEC.md §9.2)
- **Format:** an omp theme file (`name`, `vars`, `colors`, `export`, `terminal`),
  which is the theme format Tern reads for its own chrome: sidebar, tabs, status
  bar, panes, the terminal grid and omp chat
- **Tested with:** Tern 0.9.5 (macOS)
- **Modes:** dark only

Tern ships fifty ported dark themes and reads your own from omp's agent
directory. This port is one of those files, so it appears in the Themes picker
next to `dark-gruvbox` and `dark-nord`.

## Install

```sh
mkdir -p ~/.omp/agent/themes
ln -sf ~/Developer/moss_theme/tern/moss.json ~/.omp/agent/themes/moss.json
```

Then pick it: **Settings → Appearance → Dark Theme**, or open the picker with
`themes` in the command palette and type `moss`. The file must be present when
the list opens, and the name in the filename (`moss`) must match the JSON
`name`.

To pin it without the picker, set it in Tern's `settings.json` (Settings →
Open settings.json):

```json
{ "theme_dark": "moss" }
```

`theme_dark` is the dark appearance slot; `theme_light` is the light one, and
MOSS does not fill it. In Light appearance Tern keeps using whatever light
theme is selected, so pin **Appearance** to Dark if you want MOSS everywhere.

Using a named omp profile changes the directory: the file belongs in
`~/.omp/profiles/<profile>/agent/themes/moss.json` then, and in
`$PI_CODING_AGENT_DIR/themes/moss.json` if you set your own agent directory.

## Key mapping

The 56 `colors` entries are the tokens Tern reads for its UI and for omp chat.
They point into `vars`, which holds the MOSS tokens as data, so a palette
revision only touches `vars`. The mapping follows `pi/moss.json` wherever Pi
has the same token.

| Tern token | MOSS | Reason |
| ---------- | ---- | ------ |
| `accent`, `borderAccent`, `mdHeading`, `mdLink`, `customMessageLabel` | `moss` | Identity green: focus, links, headings (§4.2, §5.1, §9.2). |
| `success`, `toolDiffAdded`, `statusLineGitClean`, `statusLineStaged`, `statusLinePath` | `moss` | Added/staged green (§8); paths are `moss` like links (§9.2). |
| `error`, `toolDiffRemoved` | `redBright` | Error text is always the lifted red (§7). |
| `warning`, `statusLineGitDirty` | `ochre` | Warnings are ochre (§7). |
| `border`, `borderMuted`, `mdHr`, `mdQuoteBorder`, `mdCodeBlockBorder` | `border` | Dividers and code fences stay genuinely quiet (§4.2). |
| `borderAccent` | `moss` | Focused borders are never red or ochre (§13.11). |
| `text`, `userMessageText`, `customMessageText`, `toolTitle`, `mdCodeBlock`, `statusLineOutput` | `fg` | Normal text is the brightest thing on screen (§4.1). |
| `muted`, `thinkingText`, `toolOutput`, `mdQuote`, `mdListBullet`, `syntaxComment`, `mdLinkUrl`, `toolDiffContext`, `statusLineSpend` | `muted` | Readable but clearly subdued (§4.1). |
| `dim`, `thinkingOff` | `faint` | Disabled and non-current text (§4.2). |
| `selectedBg` | `selection` | Selection background (§4.2). |
| `userMessageBg`, `toolPendingBg` | `overlay` | Elevated card surfaces (§4.2). |
| `customMessageBg` | `active` | Pressed/hover row tone, one step under `overlay` (§4.2). |
| `toolSuccessBg` / `toolErrorBg` | §8 tints | `moss` / `red` at 12% over `bg`, as solid hex. |
| `mdCode`, `syntaxString` | `olive` | Strings and inline code are the warm green (§5.1). |
| `syntaxNumber`, `statusLineModel`, `statusLineDirty`, `statusLineCost` | `ochre` / `ochreBright` | Values and figures are gold (§5.1); `statusLineDirty` and `statusLineCost` take the lifted tone. |
| `syntaxKeyword` | `moss` | Structure green (§5.1). |
| `syntaxFunction`, `syntaxVariable`, `syntaxType` | `fg` | Neutral and calm, per the spec's provisional decisions §14 #1–3. |
| `syntaxOperator` | `forest` | Operators recede below keywords (§5.1). |
| `syntaxPunctuation` | `muted` | Separators stay quiet (§5.1). |
| `thinkingLow` / `thinkingMedium` | `blueGreen` / `blueGreenBright` | The informational ladder used by the Pi port (ANSI slots 4 and 12). |
| `thinkingHigh` / `thinkingXhigh` | `mauve` / `mauveBright` | ANSI slots 5 and 13, as in the Pi port. |
| `thinkingMax` | `ochreBright` | Peak thinking, as in the Pi port. |
| `bashMode`, `pythonMode` | `ochre` | Input modes read as warm values. |
| `statusLineSep` | `border` | The status bar's separators are hairlines. |
| `statusLineContext`, `statusLineSubagents` | `blueGreen`, `mauve` | Informational and secondary segments stay off the identity green. |
| `statusLineUntracked` | `olive` | Distinct from staged (`moss`) and dirty (`ochre`). |

The `terminal` block sets the grid itself: `background` = `bg`, `foreground` =
`fg`, `chrome` = `bg`, `widget` = `surface`, and `ansi` = the 16 slots of §9.2.

`export` sets the HTML export backgrounds: `pageBg` = `bg`, `cardBg` =
`surface`, `infoBg` = `ochreTint`.

## Deviation log (SPEC.md §11.10)

No new colors were invented. Every value is a §3 token, a §9.2 ANSI slot, or a
§8 tint already documented by the Claude Code, Pi and OpenCode ports.

- **Status line tokens are new to this port.** Pi has no status line, so
  `statusLine*` had no precedent. They reuse MOSS tokens by role (see the table)
  rather than introducing hues; `statusLineBg` is `surface`, not `bg`, so the
  bar separates from the grid without a border.
- **`pythonMode` mirrors `bashMode`.** Both are `ochre`.
- **Pi-only tokens are dropped.** `scrollbarTrack`, `scrollbarThumb`,
  `searchMatchBg` and `searchMatchText` exist in Pi's schema but not in Tern's
  bundled themes, so `tern/moss.json` carries only the omp token set.
- **`chrome` is `bg`.** Tern's bundled dark themes set the window chrome to
  their terminal background and the widget tone to their surface; MOSS follows
  that pairing.
- **Dark only.** MOSS has no light palette, so `theme_light` is left alone and
  Light appearance keeps Tern's light theme.
- **The name is lowercase `moss`.** The filename without `.json` is the
  selection name, and a bundled theme wins a name collision. No bundled theme
  is called `moss`.
