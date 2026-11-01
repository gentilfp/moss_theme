# MOSS — VS Code theme

- **Spec:** SPEC.md v0.2 · **Port date:** 2026-11-01
- **Palette:** `tokens/moss.json` (core + derived tokens; ANSI slots per SPEC.md §9.2)
- **Format:** VS Code color theme extension — `package.json` manifest +
  `themes/moss-color-theme.json` (workbench colors, TextMate scopes, semantic
  tokens)
- **Modes:** dark only. MOSS has no light palette, so the extension ships a
  single `vs-dark` theme.
- **Tested with:** VS Code 1.144.0 (macOS, arm64); packaged and installed as a
  VSIX with `@vscode/vsce`.

## Install

### Option A — symlink the extension folder (recommended)

```sh
mkdir -p ~/.vscode/extensions
ln -sfn ~/Developer/moss_theme/vscode ~/.vscode/extensions/moss-theme
```

Quit VS Code completely and reopen it. Extension folders are scanned at startup;
**Developer: Reload Window** alone does not discover a newly added folder. If
`~/.vscode/extensions/moss-theme` already exists (for example from an earlier
copy), remove it first.

Pick **MOSS** from **Preferences: Color Theme** (`cmd-k cmd-t` on macOS), or set
it in `settings.json`:

```json
"workbench.colorTheme": "MOSS"
```

Verify the extension is visible:

```sh
code --list-extensions | grep moss   # gentilfp.moss-theme
```

VS Code Insiders uses `~/.vscode-insiders/extensions` instead. On Windows the
folder is `%USERPROFILE%\.vscode\extensions`. A symlink means a `git pull`
updates the theme; restart VS Code (or reload the window once the extension is
already known) to apply changes.

### Option B — copy the extension folder

```sh
cp -R ~/Developer/moss_theme/vscode ~/.vscode/extensions/moss-theme
```

Use this when you do not want a permanent symlink. Quit and reopen VS Code, then
pick **MOSS**. Run the `cp` command again after a `git pull`.

### Option C — package and install a VSIX

```sh
cd ~/Developer/moss_theme/vscode
npx --yes @vscode/vsce package
code --install-extension moss-theme-0.1.0.vsix
```

Then pick **MOSS** in the theme picker. Re-run both commands after a `git pull`.
The VSIX is generated in `vscode/` and is ignored by git. `vsce` may warn that
no `LICENSE` file exists; that is a repository-wide choice, not a packaging
error.

### Extension Development Host

To work on the theme without installing it:

```sh
code --extensionDevelopmentPath="$HOME/Developer/moss_theme/vscode"
```

This opens a second VS Code window where MOSS is available. Edits to the theme
file appear after **Developer: Reload Window** in that window.

## Role mapping

Every key below maps to a SPEC.md token or an ANSI slot. No new colors were
added. `bg` / `surface` / `overlay` describe elevation; `fg` / `muted` / `faint`
describe text level, exactly as §4–§8 define them. The theme sets every color ID
used by VS Code's built-in dark themes, plus the modern notebook, testing, chat
and agents roles, so no workbench role falls back to a default blue.

### Surfaces, text, and chrome

| Role (SPEC) | VS Code keys |
| ----------- | ------------ |
| Editor and main area `bg` (§4.2) | `editor.background`, `editorGroup.emptyBackground`, `editorGroupHeader.tabsBackground`, `tab.inactiveBackground`, `breadcrumb.background`, `terminal.background`, `minimap.background`, `notebook.editorBackground`, `multiDiffEditor.background`, `welcomePage.background` |
| Sidebar, titlebar, toolbar, panel, status bar `surface` | `sideBar.background`, `activityBar.background`, `titleBar.*Background`, `statusBar.background`, `panel.background`, `banner.background`, `welcomePage.tileBackground`, `peekViewResult.background`, `peekViewTitle.background`, `chat.requestBackground`, `chat.statusBackground` |
| Menus, popups, widgets, inputs `overlay` | `editorWidget.background`, `editorSuggestWidget.background`, `editorHoverWidget.background`, `menu.background`, `quickInput.background`, `dropdown.background`, `input.background`, `notifications.background`, `debugToolBar.background`, `inlineChat.background` |
| Active tab `overlay` + `moss` indicator (§4.2) | `tab.activeBackground`, `tab.activeForeground`, `tab.activeBorder` (bottom, `moss`), `tab.activeBorderTop` (transparent) |
| Normal text `fg` (§4.1) | `foreground`, `editor.foreground`, `sideBar.foreground`, `tab.activeForeground`, `menu.foreground`, `list.*Foreground`, `icon.foreground` |
| Secondary text `muted` (§4.1) | `descriptionForeground`, `sideBarTitle.foreground`, `tab.inactiveForeground`, `statusBar.foreground`, `breadcrumb.foreground`, `editorCodeLens.foreground`, `list.deemphasizedForeground` |
| Disabled text `faint` (§4.1) | `disabledForeground`, `editorLineNumber.foreground`, `input.placeholderForeground`, `gitDecoration.ignoredResourceForeground`, `tab.unfocusedInactiveForeground` |
| Borders and dividers `border` (§4.2) | `editorGroup.border`, `tab.border`, `panel.border`, `sideBar.border`, `widget.border`, `menu.border`, every `*.border` chrome key |
| Cursor `moss` (§4.2) | `editorCursor.foreground`, `terminalCursor.foreground`; `editorCursor.background` and `terminalCursor.background` are `bg` for block cursors |
| Selection `selection` (§4.2) | `editor.selectionBackground`, `terminal.selectionBackground`, `list.activeSelectionBackground`, `menu.selectionBackground`, `selection.background`; text is `fg` |
| Cursor line and hover `active` (§4.2) | `editor.lineHighlightBackground`, `list.hoverBackground`, `tab.hoverBackground`, `statusBarItem.hoverBackground` |
| Focus ring `moss` (§4.2, §13.11) | `focusBorder`, `list.focusOutline`, `settings.focusedRowBorder`, `activityBar.activeBorder`, `panelTitle.activeBorder`, `terminal.tab.activeBorder` |
| Line numbers `faint`, active `moss` (§4.2) | `editorLineNumber.foreground`, `editorLineNumber.activeForeground` |
| Status modes (§4.2) | `statusBar.debuggingBackground` `ochre`; `statusBarItem.remoteBackground` `moss`; `statusBarItem.errorBackground` `red`; `statusBarItem.warningBackground` `ochre` |

### Syntax (`tokenColors` + `semanticTokenColors`)

| Role (SPEC §5.1) | TextMate scopes / semantic tokens | Token |
| ---------------- | --------------------------------- | ----- |
| keyword, storage, modifier | `keyword`, `keyword.control`, `storage.*`, semantic `keyword` / `modifier` | `moss` |
| function, method, call | `entity.name.function`, `variable.function`, `support.function`, semantic `function` / `method` / `macro` / `event` | `fg` |
| variable, property, field | `variable.*`, `support.type.property-name`, semantic `variable` / `property` | `fg` |
| parameter | `variable.parameter`, semantic `parameter` | `fg` italic |
| type, class, struct, enum, interface | `entity.name.type.*`, `support.type`, semantic `type` / `class` / `struct` / `enum` / `interface` | `fg`; declarations bold |
| constant, number, boolean, enum member | `constant.numeric`, `constant.language`, `support.constant`, semantic `number` / `enumMember` | `ochre` |
| string, char literal | `string`, `punctuation.definition.string`, semantic `string` | `olive` |
| escape sequence, format placeholder | `constant.character.escape`, `constant.character.format.placeholder` | `ochre-bright` |
| regex | `string.regexp`, semantic `regexp` | `ochre` |
| operator | `keyword.operator`, semantic `operator` | `forest` |
| word operator | `keyword.operator.word` / `.new` / `.expression` | `moss` (keyword role) |
| punctuation, separators | `punctuation.*`, type-annotation and namespace separators | `muted` |
| tag (HTML/XML/JSX) | `entity.name.tag`, `meta.tag` | `forest` |
| attribute | `entity.other.attribute-name`, `meta.attribute`, CSS property names | `moss` |
| decorator, annotation | `meta.annotation`, `meta.decorator`, semantic `decorator` | `ochre` |
| preprocessor directive | `meta.preprocessor` | `ochre` (nearest role: decorator) |
| comment | `comment`, semantic `comment` | `muted` |
| doc comment | `comment.*.documentation`, semantic `comment.documentation` | `muted` italic |
| error-raising syntax | `invalid.*`, `keyword.control.exception` / `.raise` / `.throw` | `red-bright` |
| markup heading / link | `markup.heading`, `markup.underline.link`, semantic `label` | `moss`; links underlined |
| markup inline code | `markup.inline.raw` | `olive` |
| markup inserted / deleted / changed | `markup.inserted` / `.deleted` / `.changed` | `moss` / `red-bright` / `ochre` on §8 tints |

TextMate keeps regex delimiters, quantifiers and flags in their own scopes, so a
regex literal reads as an `ochre` pattern with `olive` delimiters, `forest`
quantifiers and `moss` flags rather than one flat ochre token. The pattern
itself — the role §5.1 assigns — is `ochre`.

### Diagnostics (§7)

| Severity | Mark / text | Token |
| -------- | ----------- | ----- |
| error | text `errorForeground`, `list.errorForeground`, `debugConsole.errorForeground`, `notebookStatusErrorIcon.foreground` | `red-bright` |
| error | squiggle / border / gutter / minimap / notification icon `editorError.*`, `minimap.errorHighlight`, `notificationsErrorIcon.foreground` | `red` |
| warning | squiggle `editorWarning.foreground` / `.border`, `minimap.warningHighlight` | `ochre-bright` |
| warning | text and notification icon `list.warningForeground`, `notificationsWarningIcon.foreground` | `ochre` |
| info | `editorInfo.*`, `minimap.infoHighlight`, `notificationsInfoIcon.foreground` | `moss` |
| hint | `editorHint.*` | `muted` |

### Git, diffs, and merges (§8)

| Role | Keys | Token |
| ---- | ---- | ----- |
| added / untracked | `gitDecoration.addedResourceForeground`, `.untrackedResourceForeground`, `editorGutter.addedBackground`, `minimapGutter.addedBackground`, `editorOverviewRuler.inlineChatInserted`, `inlineChatDiff.inserted` | `moss` |
| modified / renamed / staged-modified | `gitDecoration.modifiedResourceForeground`, `.renamedResourceForeground`, `.stageModifiedResourceForeground`, `editorGutter.modifiedBackground` | `ochre` |
| deleted / staged-deleted | `gitDecoration.deletedResourceForeground`, `.stageDeletedResourceForeground`, `editorGutter.deletedBackground`, `editorOverviewRuler.inlineChatRemoved`, `inlineChatDiff.removed` | `red` |
| conflict | `gitDecoration.conflictingResourceForeground`, `mergeEditor.conflict.unhandled*` | `red-bright` |
| ignored | `gitDecoration.ignoredResourceForeground`, `git.blame.editorDecorationForeground` | `faint` |
| submodule | `gitDecoration.submoduleResourceForeground` | `muted` |
| diff added / removed line | `diffEditor.insertedLineBackground` / `.removedLineBackground`, `diffEditorGutter.*`, `merge.currentHeaderBackground` / `merge.incomingHeaderBackground` | §8 tints (below) |
| diff added / removed text | `diffEditor.insertedTextBackground` / `.removedTextBackground` | `moss` / `red` at 10% alpha |

`scmGraph.historyItemRemoteRefColor` uses ANSI slot 4 (`#5D7B81`), the spec's
desaturated blue-green, so remote refs stay distinguishable; the other SCM graph
lanes use core tokens (`moss`, `olive`, `ochre`, `forest`, `muted`).

### Terminal (§9.2)

All sixteen slots are set exactly as specified, including the derived blue and
magenta slots:

```text
0  #0D0F0C    1  #A75D57    2  #7E9273    3  #B69A64
4  #5D7B81    5  #8F6C80    6  #9A9968    7  #D7D9D2
8  #70766B    9  #C06B63   10  #92A389   11  #C7A46B
12 #6C8D94   13  #A08193   14  #AAA97F   15 #F0F0EE
```

`terminal.selectionForeground` is `fg`; the cursor is `moss` with `bg` text for a
block cursor. Search matches use `selection` with a `moss` outline; other matches
use `active`.

### Tints and alpha values

These are rendering parameters from §8, not palette entries:

| Value | Derivation | Used for |
| ----- | ---------- | -------- |
| `#1B1F18` | `moss` at 12% over `bg` | diff added line, merge current header, info state panels |
| `#1F1815` | `red` at 12% over `bg` | diff removed line, error state panels |
| `#1E1D15` | `ochre` at 10% over `bg` | diff changed line, warning state panels |
| `#7E92731A` | `moss` at 10% alpha | word/selection highlights, inserted text |
| `#A75D571A` | `red` at 10% alpha | removed text, error line |
| `#B69A641A` | `ochre` at 10% alpha | bracket match, final snippet tabstop |
| `#2A352780` | `selection` at 50% alpha | inactive selection |
| `#272C2499` / `#4B514799` / `#70766B99` | `border` / `faint` / `muted` at 60% alpha | scrollbar sliders |
| `#0D0F0C99` | `bg` at 60% alpha | widget shadows |
| `#00000000` | transparent | hidden borders and line highlights |

Other alpha steps of the same hues (for example 15–50% for state borders and
highlights) are also rendering parameters, never palette entries.

## Deviation log (SPEC.md §11.10)

No new colors were invented. Every value is a §3 token, a §9.2 ANSI slot, a §8
tint over `bg`, or an alpha rendering of one of those. Judgment calls:

1. **Dark only.** MOSS has no light palette, so the extension contributes a
   single `vs-dark` theme. There is no light variant to keep in sync.
2. **Error text vs error marks.** VS Code separates text and marks. Text uses
   `red-bright` (`errorForeground`, `list.errorForeground`, debug console, test
   and notebook error text); squiggles, gutters, minimap marks and notification
   icons use `red`, exactly following §7.
3. **Search matches use two tiers.** The current match is `selection` +
   `fg` text + a `moss` border (`editor.findMatch*`). Other matches use `active`
   + `moss` text (`editor.findMatchHighlight*`) because `moss` on `selection` is
   only 3.8:1 (§10). This is the same adaptation documented by the T3 Code port;
   VS Code cannot draw the spec's `moss` text on a `selection` match at readable
   contrast.
4. **Selection text is `fg`.** `editor.selectionForeground` and
   `terminal.selectionForeground` are set to `fg` per §4.2 and the Ghostty port.
   Selected code therefore reads in normal foreground while selected.
5. **Active tab is marked by a `moss` bottom border.** `tab.activeBorder` is
   `moss`; `tab.activeBorderTop` is transparent so the indicator appears on the
   tab's bottom edge. The unfocused active tab recedes to `forest`.
6. **Bracket colorization stays inside the palette.** The six bracket levels are
   `moss` → `olive` → `ochre` → `forest` → `muted` → `faint`; unexpected
   brackets are `red-bright`. This avoids a rainbow (§13.4) while still giving
   VS Code six distinct levels. Brace-match uses `ochre` text and outline (§6).
7. **CSS property names are attributes, not properties.** `support.type.property-name.css`,
   SCSS and Less map to `moss` (attribute role), following the Zed port and
   §5.1's markup attribute assignment; JSON/TOML/YAML property names remain
   `fg`. YAML keys are overridden from the grammar's `tag` scope to `fg` because
   they are properties, not markup tags.
8. **Preprocessor directives use `ochre`.** The spec has no preprocessor role;
   `meta.preprocessor` takes the nearest warm structural role, the decorator /
   annotation color (§5.1).
9. **Exception syntax uses `red-bright` where a grammar separates it.**
   `keyword.control.exception`, `.raise` and `.throw` are colored when a
   language exposes a dedicated scope. TypeScript scopes `throw` as
   `keyword.control.trycatch`, and Python scopes `raise` as
   `keyword.control.flow` together with `try` / `except`; coloring those scopes
   red would turn ordinary control flow red, so those keywords stay `moss`.
   There is also no universal `panic!` / macro capture, so Rust and similar
   constructs fall back to `keyword` (`moss`), the same limitation documented by
   the Zed port.
10. **Class-like declarations are bold; functions stay plain.** §5.1 permits
    bold for function and class declarations. Only class/struct/enum/interface
    declarations are bold, keeping calls and methods calm.
11. **Accent controls use the readable side of the palette.** Primary buttons,
    badges and remote status use `moss` with `bg` text (5.7:1); button hover
    uses ANSI slot 10 (`#92A389`, 7.2:1), the only lighter `moss` the spec
    defines. Checkbox and radio marks are `moss` on `overlay` / `active` (~5:1)
    rather than dark marks on a solid accent. The red status badge uses `bg`
    text (4.0:1) because `fg` on `red` is worse (3.4:1); `red-bright` hover
    reaches 5.1:1.
12. **Breakpoints are `ochre`, not red.** Red is reserved for errors and
    destructive states (§13.10). Stop, disconnect and offline remain `red`.
13. **Status bar base text is `muted`.** The status bar is secondary chrome
    (§4.1); hovered items brighten to `fg`, and the remote / debugging / error /
    warning items use their semantic colors.
14. **Workbench roles outside the spec use the nearest role.** Notifications,
    panels, quick pick, menus, settings, testing, notebooks and chat reuse the
    surface/text/state tokens above; no workbench-only palette was introduced.
    Tinted state surfaces (`inputValidation.*`, marker navigation, testing) use
    the documented §8 tints instead of saturated fills.
15. **Semantic highlighting is enabled.** `semanticTokenColors` maps the same
    roles for TypeScript, Go, Rust and other languages with semantic providers;
    languages without them fall back to the TextMate rules. Inlay hints and ghost
    text use `muted`, never a brighter code color.
16. **No pure black or pure white.** `#00000000` is transparency, not a palette
    color. The brightest value is ANSI slot 15 (`#F0F0EE`), fixed by §9.2; normal
    text stays at `fg` (`#D7D9D2`) and is never pure white.

## Files

| File | Purpose |
| ---- | ------- |
| `package.json` | Extension manifest; contributes the `MOSS` theme |
| `themes/moss-color-theme.json` | Workbench colors, TextMate scopes, semantic tokens |
| `.vscodeignore` | Keeps VSIX packaging to the manifest, README and theme |
| `README.md` | This port's mapping and deviation log |
