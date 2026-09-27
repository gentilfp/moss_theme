# MOSS — OpenCode theme

- **Spec:** SPEC.md v0.2 · **Port date:** 2026-09-27
- **Palette:** `tokens/moss.json` (ANSI slots per SPEC.md §9.2)
- **Format:** OpenCode custom theme (`~/.config/opencode/themes/moss.json`),
  dark-only single values (no `dark`/`light` split — MOSS has no light mode),
  all 52 theme keys set explicitly
- **Schema:** per <https://opencode.ai/docs/themes/>

## Install

Link `opencode/moss.json` to `~/.config/opencode/themes/moss.json`, then pick
**moss** with `/theme`, or set it in `tui.json`:

```sh
mkdir -p ~/.config/opencode/themes
ln -sf ~/Developer/moss_theme/opencode/moss.json ~/.config/opencode/themes/moss.json
```

```json
{ "$schema": "https://opencode.ai/tui.json", "theme": "moss" }
```

The filename without `.json` is the theme name, so it is lowercase `moss`
(unlike the `MOSS` display name used by the Pi port). Tinted backgrounds below
are written as solid hex because OpenCode themes accept no alpha — same values
already documented by the Claude Code and Pi ports, so the three ports cannot
drift.

| Hex       | Derivation             | Used for                                      |
| --------- | ---------------------- | --------------------------------------------- |
| `#1B1F18` | `moss` at 12% over `bg`| `diffAddedBg`, `diffAddedLineNumberBg`        |
| `#1F1815` | `red` at 12% over `bg` | `diffRemovedBg`, `diffRemovedLineNumberBg`    |

## Role mapping

Every color below maps to a MOSS token (§4–§8) or to an ANSI slot (§9.2) where
no MOSS token exists. Assignments follow the Pi port unless noted.

| Role (OpenCode) | MOSS | Reason |
| --------------- | ---- | ------ |
| `primary`, `accent` | `moss` | Identity accent; focus is `moss` (§4.2, §13.11). |
| `secondary` | slot 12 `#6C8D94` | Informational blue-green, distinct from `moss` — same call as Claude Code's `planMode`/`ide` roles and Pi's thinking ladder. |
| `success` | `moss` | Added/untracked green (§8). |
| `error`, `diffRemoved`, `diffHighlightRemoved` | `red-bright` | Error text always uses `red-bright` (§7). |
| `warning` | `ochre` | Warnings are ochre (§7). |
| `info` | `moss` | Info-class notices are `moss` (§7 info). |
| `text` | `fg` | Normal text is brightest (§4.1). |
| `textMuted` | `muted` | Secondary text (§4.1). |
| `selectedListItemText` | `fg` | Text on selection keeps normal foreground; `fg` on `selection` ≈ 9.0:1 (§10). |
| `background` | `bg` | Main background (§4.2). |
| `backgroundPanel` | `surface` | Sidebars, secondary chrome (§4.2). |
| `backgroundElement`, `backgroundMenu` | `overlay` | Floating/elevated surfaces and menus (§4.2). |
| `border` | `faint` | Box borders need visibility on `bg`; the `border` token is only ≈1.5:1 there (same call as Pi's `border` and Claude Code's `promptBorder`). |
| `borderSubtle` | `border` | Dividers and subtle chrome stay genuinely quiet (§4.2). |
| `borderActive` | `moss` | Focused borders — focus is never red or ochre (§13.11). |
| `diffAdded`, `diffHighlightAdded` | `moss` | Git added (§8). |
| `diffContext` | `muted` | Same as Pi's `toolDiffContext`. |
| `diffHunkHeader`, `diffLineNumber` | `faint` | Non-current line numbers are `faint` (§4.2). |
| `diffAddedBg` / `diffRemovedBg` (+ line-number Bgs) | §8 tints | State tints reuse the diff-tint values (see table above). |
| `diffContextBg` | `surface` | Mirrors the panel surface, as in the upstream example theme. |
| `markdownHeading`, `markdownLink`, `markdownImage` | `moss` | Headings are structure; hyperlinks are `moss` (§5.1, §9.2). |
| `markdownLinkText`, `markdownImageText` | `faint` | URL-like text stays quiet — same call as Pi's `mdLinkUrl`. |
| `markdownText`, `markdownCodeBlock` | `fg` | Body text and code blocks read as plain text (§5.1). |
| `markdownCode`, `markdownEmph` | `olive` | Inline code reads as string-like values (§5.1 strings). |
| `markdownBlockQuote`, `markdownListItem` | `muted` | Decorative chrome stays quiet; bullets must not read as green wash (§13.3). |
| `markdownListEnumeration` | `faint` | A step quieter than bullets. |
| `markdownStrong` | `ochre` | Warm value-family emphasis (§5.1). |
| `markdownHorizontalRule` | `border` | Genuinely quiet divider (§4.2). |
| `syntaxComment` | `muted` | Readable but clearly subdued (§5.1). |
| `syntaxKeyword` | `moss` | Structure green (§5.1). |
| `syntaxFunction` / `syntaxVariable` / `syntaxType` | `fg` | Current provisional spec values — neutral, calm (§5.1, §14 #1–3). |
| `syntaxString` | `olive` | Strings are the warm green (§5.1). |
| `syntaxNumber` | `ochre` | Values are gold (§5.1). |
| `syntaxOperator` | `forest` | Operators recede below keywords (§5.1). |
| `syntaxPunctuation` | `muted` | Separators stay quiet (§5.1). |

## Deviation log (SPEC.md §11.10)

No new colors were invented: every value is a §3 token, an ANSI slot from
§9.2, or a documented §8 tint over `bg`. The judgment calls, all following
precedent set by the Pi and Claude Code ports or the spec's provisional
decisions, are: `border` → `faint` (actual `border` too dark for box outlines),
`secondary` → slot 12 (OpenCode's only non-identity informational hue),
`selectedListItemText` → `fg` (explicit rather than the `background` fallback),
the markdown assignments above (link text/URLs `faint`, bullets `muted`), and
`diffHunkHeader`/`diffLineNumber` → `faint` (line-number role, §4.2).
