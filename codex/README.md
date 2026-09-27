# MOSS — Codex themes (CLI + App)

- **Spec:** SPEC.md v0.2 · **Port date:** 2026-09-27
- **Palette:** `tokens/moss.json` (ANSI slots per SPEC.md §9.2)
- **CLI format:** TextMate `.tmTheme` (`~/.codex/themes/moss.tmTheme`), covers
  SPEC §5 (syntax) and §8 (diffs). Codex only themes fenced code blocks and
  file diffs; the rest of the TUI keeps the terminal palette.
- **App format:** `codex-theme-v1:` import string
  (`codex/moss.codex-theme-v1`), for the ChatGPT desktop / Codex app via
  **Settings → Appearance → Dark Theme → Import**. One string = one `dark`
  variant; MOSS ships dark only.
- **Tested with:** `tmTheme` parsed with `plistlib`; selected via `/theme`
  against Codex CLI docs (`tui.theme` in `$CODEX_HOME/config.toml`);
  `moss.codex-theme-v1` payload parsed as JSON after the `codex-theme-v1:`
  prefix (`codeThemeId` must be a built-in id per openai/codex#14766).

## App import (ChatGPT desktop / Codex app)

Copy the whole single line from `codex/moss.codex-theme-v1` (prefix included),
then **Settings → Appearance → Dark Theme → Import** → paste → review →
**Import theme**. Verify on prose, code, and a diff.

```
codex-theme-v1:{"codeThemeId":"everforest","theme":{"accent":"#7E9273","accentSource":"custom","contrast":60,"fonts":{"code":null,"ui":null},"ink":"#D7D9D2","opaqueWindows":true,"semanticColors":{"diffAdded":"#7E9273","diffRemoved":"#C06B63","skill":"#B69A64"},"surface":"#0D0F0C"},"variant":"dark"}
```

### App role mapping

| App field | MOSS | Reason |
| --------- | ---- | ------ |
| `surface` | `bg` `#0D0F0C` | Main background, near-black green-grey (§4.2). |
| `ink` | `fg` `#D7D9D2` | Normal text, brightest token (§4.1, §5). |
| `accent` | `moss` `#7E9273` | Focus / cursor / identity green (§4.2). |
| `semanticColors.diffAdded` | `moss` `#7E9273` | Added = `moss` (§8); same call as Pi `toolDiffAdded` and tmTheme `markup.inserted`. |
| `semanticColors.diffRemoved` | `red-bright` `#C06B63` | `red` is comment-dark so error text uses `red-bright` (§7); same call as Pi `toolDiffRemoved` and tmTheme `markup.deleted`. |
| `semanticColors.skill` | `ochre` `#B69A64` | Warm value/badge colour (§5.1 decorators, Pi `bashMode`); visible without using reserved red. |
| `contrast` | `60` | Matches the reference import scale (0–100); MOSS `fg`/`bg` is 13.5:1 so mid-high contrast fits. |
| `opaqueWindows` | `true` | Solid near-black chrome preserves `bg` identity; translucency would wash the green-grey cast (§11.5). |
| `fonts` | `null` / `null` | System defaults; no font bundled. |
| `codeThemeId` | `everforest` | Must be a built-in id or import stays disabled (openai/codex#14766); `everforest` is the closest green-muted dark family to MOSS. App code highlighting still follows this base family. |
| `variant` | `dark` | MOSS is dark only; no light variant. |

### App deviation log (SPEC.md §11.10)

No new colors: every hex is a §3 token. Judgment calls:

- `codeThemeId` is `everforest`, not `moss`: the importer rejects unknown
  ids, so the closest built-in green family is reused while all colors are
  overridden with MOSS values.
- `skill` is `ochre`: the app schema requires a third semantic color with no
  direct SPEC §8 counterpart; `ochre` (values/decorators) is the warm,
  non-red badge colour.
- `opaqueWindows: true` (DexThemes default when omitted): keeps `bg`
  near-black solid per §11.5.
- Do not paste this string into the CLI and do not put the `.tmTheme` file
  through Appearance → Import: the two surfaces are separate systems.

## CLI install

```sh
mkdir -p ~/.codex/themes
ln -sf ~/Developer/moss_theme/codex/moss.tmTheme ~/.codex/themes/moss.tmTheme
```

Run `/theme` in Codex and pick **moss**, or set it in
`~/.codex/config.toml`:

```toml
[tui]
theme = "moss"
```

The filename (minus `.tmTheme`) is the theme name, so it must stay `moss`.

## Role mapping

| Role (spec) | tmTheme scope | MOSS | Reason |
| ----------- | ------------- | ---- | ------ |
| Normal text / variable / function / type / namespace (§5.1) | `text, source, variable.*, entity.name.function, support.function, entity.name.type, support.type, entity.name.namespace` | `fg` | Provisional neutral values (§14 #1–3); brightest token stays on code. |
| Parameter (§5.1) | `variable.parameter` | `fg` italic | Typography, not color, separates parameters. |
| Class declaration (§5.1) | `entity.name.class, entity.other.inherited-class, …` | `fg` bold | Bold allowed for class declarations. |
| Keyword / storage (§5.1) | `keyword, storage.*` | `moss` | Structure green. |
| Attribute (§5.1) | `entity.other.attribute-name, meta.attribute` | `moss` | Brightest green stage. |
| String (§5.1) | `string` | `olive` | Warm green for string-like values. |
| Escape (§5.1) | `constant.character.escape` | `ochre-bright` | Stronger warm pop inside strings. |
| Number / boolean / constant / regex / builtin (§5.1) | `constant.*, string.regexp, variable.language.*` | `ochre` | Value family is gold. |
| Decorator / annotation (§5.1) | `meta.annotation, meta.decorator, …` | `ochre` | Gently warm, distinct from code. |
| Operator (§5.1) | `keyword.operator, …` | `forest` | Grammar recedes below keywords. |
| Punctuation (§5.1) | `punctuation*` | `muted` | Separators stay quiet. |
| Markup tag (§5.1) | `entity.name.tag, meta.tag` | `forest` | Markup structure recedes. |
| Comment (§5.1) | `comment` | `muted` | Below accent brightness. |
| Doc comment (§5.1) | `comment.*.documentation` | `muted` italic | Typography separates docs. |
| Error-raising / invalid (§5.1, §7) | `invalid*, markup.error` | `red-bright` | Error text always uses `red-bright`. |
| Markdown headings / links | `markup.heading, markup.underline.link` | `moss` | Structure and hyperlinks (§9.2). |
| Markdown quotes / lists | `markup.quote, markup.list` | `muted` | Decorative chrome stays quiet. |
| Markdown code spans | `markup.inline.raw` | `olive` | Same call as Pi's `mdCode`. |
| Added (§8) | `markup.inserted` | `moss` on `#1B1F18` | Tint = `moss` at 12% over `bg`, shared with Claude Code / Pi. |
| Deleted (§8) | `markup.deleted` | `red-bright` on `#1F1815` | Tint = `red` at 12% over `bg`; `red-bright` text for readability (§7). |
| Changed (§8) | `markup.changed` | `ochre` on `#1E1D15` | Tint = `ochre` at 10% over `bg`, shared with Claude Code / Pi. |
| Global: background / foreground / caret / selection / line highlight (§4.2) | settings | `bg` / `fg` / `moss` / `selection` / `active` | Cursor and focus are `moss`; selection keeps `fg` text. |
| Gutter / invisibles (§4.2) | `gutterForeground, invisibles` | `faint` | Non-current line numbers, disabled text. |
| Guides (§4.2) | `guide / activeGuide` | `border` / `faint` | Subtle dividers, visible active guide. |

## Deviation log (SPEC.md §11.10)

No new colors: every hex is a §3 token, a §9.2 ANSI slot, or one of the
three solid §8 tints already shared with the Claude Code and Pi ports
(`#1B1F18`, `#1F1815`, `#1E1D15`). Judgment calls:

- Deleted-diff foreground is `red-bright`, not `red`: `red` on the tint is
  ≈ comment brightness (§7), so text readability wins — same call as Zed's
  `error` and Pi's `toolDiffRemoved`.
- `variable.language.*` (`self`, `this`, `None`, …) maps to `ochre` per §5.1,
  folded into the values rule; tmTheme has no per-language exceptions.
- Markdown heading/link roles are `moss`, matching the Pi port's
  `mdHeading`/`mdLink` (structure green, hyperlinks per §9.2).
- tmTheme `fontStyle` is limited to `italic` (parameters, doc comments) and
  `bold` (classes, headings) per §5.1 typography notes.
