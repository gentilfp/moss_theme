# MOSS — Pi theme

- **Spec:** SPEC.md v0.2 · **Port date:** 2026-09-25
- **Palette:** `tokens/moss.json` (ANSI slots per SPEC.md §9.2)
- **Format:** Pi custom theme (`~/.pi/agent/themes/<name>.json`), all 50 schema
  colors set explicitly, tinted backgrounds written as solid hex because Pi
  accepts no alpha
- **Tested with:** Pi 0.87.1

## Install

Link `pi/moss.json` to `~/.pi/agent/themes/moss.json`, then pick **MOSS** in
`/settings` → Theme, or set it in `~/.pi/agent/settings.json`:

```json
"theme": "MOSS"
```

Pi hot-reloads the active user theme from `<agent-dir>/themes/moss.json`; a new
theme file requires `/reload` if the agent was already running. Pi does not
accept alpha in theme colors, so tinted surfaces below are written as solid hex
derived at the given alpha over `bg` — same values already documented by the
Claude Code port, so the two ports cannot drift.

| Hex       | Derivation              | Used for                       |
| --------- | ----------------------- | ------------------------------ |
| `#1B1F18` | `moss` at 12% over `bg` | `toolSuccessBg`                |
| `#1F1815` | `red` at 12% over `bg`  | `toolErrorBg`                  |
| `#1E1D15` | `ochre` at 10% over `bg`| `export.infoBg`                |

## Role mapping

Pi's schema is role-based; every color below maps to a MOSS token (§4–§8) or to
an ANSI slot (§9.2) where no MOSS token exists.

| Role (Pi) | MOSS | Reason |
| --------- | ---- | ------ |
| `accent`, cursor, selected items | `moss` | Identity accent, cursor and focus are `moss` (§4.2, §9.2). |
| `border` | `faint` | Normal box borders need visibility on `bg`; the `border` token is only ≈1.5:1 there (same call as Claude Code's `promptBorder`). |
| `borderMuted` | `border` | Dividers and subtle chrome stay genuinely quiet (§4.2). |
| `borderAccent` | `moss` | Highlighted/focused borders — focus is never red or ochre (§13.11). |
| `success` | `moss` | Added/untracked green (§8). |
| `error` | `red-bright` | Error text always uses `red-bright` (§7). |
| `warning` | `ochre` | Warnings are ochre (§7). |
| `dim` | `faint` | Faint is the designated dim text token (§4.1). |
| `thinkingText` | `muted` | Thinking bodies are secondary text (§4.1). |
| `searchMatchText` | `moss` | Search match = `selection` bg + `moss` text (§4.2). |
| `userMessageBg` | `overlay` | User messages sit on the elevated surface, same choice as Claude Code's `userMessageBackground`. |
| `customMessageBg` | `active` | Hook-injected messages sit a step below interactive user messages; `active` is between `surface` and `overlay` (§3.2). |
| `customMessageLabel` | `moss` | Info-class notices are `moss` (§7 info). |
| `toolSuccessBg` / `toolErrorBg` | §8 tints | State tints reuse the diff-tint values (see table above). |
| `mdHeading` | `moss` | Headings are structure; the green family carries structure (§5.1 keywords). |
| `mdLink` | `moss` | Hyperlinks are `moss` + underline (§9.2). |
| `mdCode` | `olive` | Inline code reads as string-like values; warm green keeps it distinct from `fg` and `moss` without shouting (§5.1 strings). |
| `mdCodeBlock` | `fg` | Code is plain, brightest text (§5.1 functions/variables). |
| `mdListBullet` | `muted` | Decorative chrome stays quiet; bullets every few lines must not read as green wash (§13.3). |
| `toolDiffAdded` | `moss` | Git added (§8). |
| `toolDiffRemoved` | `red-bright` | Deleted/changed lines are error-family text; `red-bright` for readability (§7). |
| `syntaxKeyword` | `moss` | Structure green (§5.1). |
| `syntaxFunction` / `syntaxVariable` / `syntaxType` | `fg` | Current provisional spec values — neutral, calm (§5.1, §14 #1–3). |
| `syntaxString` | `olive` | Strings are the warm green (§5.1). |
| `syntaxNumber` | `ochre` | Values are gold (§5.1). |
| `syntaxOperator` | `forest` | Operators recede below keywords (§5.1). |
| `syntaxPunctuation` | `muted` | Separators stay quiet (§5.1). |
| `thinkingLow` / `Medium` | slots 4 / 12 `#5D7B81` `#6C8D94` | Escalating presence without red; blue-green slots are informational (§9.2). |
| `thinkingHigh` / `Xhigh` | slots 5 / 13 `#8F6C80` `#A08193` | Mauve slots lift the ladder above the blue-creens. Decorative, so red stays out (§13.10). |
| `thinkingMax` | `ochre-bright` | Strongest non-red marker for maximum effort (§3.2). |
| `bashMode` | `ochre` | Modes that bypass a step read as gentle warnings — same choice as Claude Code's `bashBorder` and `autoAccept`. |
| `export.*` | `bg` / `surface` / ochre tint | HTML export mirrors the app surfaces; notices use the warm `#1E1D15` panel. |

## Deviation log (SPEC.md §11.10)

Pi is a terminal app with its own syntax highlighter, so this port covers both
UI tokens and the syntax roles pi exposes. No new colors were invented: every
value is a §3 token, an ANSI slot from §9.2, or a documented tint at §8 alpha
over `bg`. The only judgment calls, all following precedent set by the Claude
Code port or the spec's provisional decisions, are: `border` → `faint`
(actual `border` too dark for box outlines), the markdown/syntax assignments
above, and the thinking-level ladder built from slots 4/12/5/13 plus
`ochre-bright`.