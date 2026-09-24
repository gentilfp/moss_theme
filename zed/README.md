# MOSS — Zed theme

- **Spec:** SPEC.md v0.2 · **Port date:** 2026-09-24
- **Palette:** `tokens/moss.json` (ANSI slots per SPEC.md §9.2)
- **Schema:** Zed theme schema v0.2.0

## Install

Copy `zed/moss.json` to `~/.config/zed/themes/moss.json`, then pick **MOSS** in
the theme selector (`zed: toggle theme selector`) or set it in your Zed settings:

```json
"theme": { "mode": "dark", "dark": "MOSS", "light": "MOSS" }
```

## Deviation log (SPEC.md §11.10)

No new colors. Alpha values are the §8 diff tints (`tokens.tints`): 10% = `1A`,
12% = `1F`. `#00000000` is plain transparency.

| Role (spec) | Zed | Reason |
| ----------- | --- | ------ |
| Error text `red-bright`, icons/squiggles `red` (§7) | `error` = `red-bright` | Zed uses one `error` color for text, icon and squiggle. Text readability wins; `red` stays on `error.border` and the diff `deleted` roles. |
| Search match: `selection` bg + `moss` text; current match `moss` outline (§4.2, §14 #7) | `search.match_background` = `selection` | Zed has no match text color or outline. |
| Active tab `moss` underline (§4.2) | not drawn | Zed has no tab indicator color; the active tab is marked by its `overlay` background only. |
| Brace match `ochre` text/outline (§6) | `editor.document_highlight.bracket_background` = `ochre` tint | Zed only offers a background. |
| Symbol highlight (not in spec) | read = `moss` tint, write = `ochre` tint | Nearest roles: reference = identity accent, write = modified. |
| Decorator `ochre` vs markup attribute `moss` (§5.1) | `attribute` = `moss`; `preproc` = `ochre` | Zed grammars use `attribute` for both (e.g. Rust `#[derive]`); the markup meaning is kept. |
| Error-raising constructs `red` (§5.1) | not mapped | No Zed capture exists; they fall back to `keyword` (`moss`). |
| Class/function declaration bold (§5.1) | not applied | No declaration captures in Zed; bold is only used for `title` and `emphasis.strong`. |
| Hyperlinks `moss` + underline (§9.1) | `link_text` = `moss`, `link_uri` = `muted` | Zed syntax styles have no underline. |
| `lifetime`, `label`, `selector` (not in spec) | `moss` | Structural words, same family as `keyword`. |
| `variant` (enum members) | `ochre` | Treated as constants (`None`, `Ordering::Less`). |
| `predictive` (edit predictions) | `muted` italic | Ghost text; reads like a comment, never like code. |
| `accents` (rainbow brackets) | `moss`, `olive`, `ochre`, `forest` | Kept inside the palette; no rainbow (§13.4). |
