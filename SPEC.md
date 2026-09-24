# MOSS — Theme Specification

**Status:** v0.1 · Specification phase — **no editor or terminal ports exist yet**.

**Sources of truth:** `SPEC.md` (this file) is the canonical specification.
`index.html` is the standalone visual reference. The two must stay in sync; when
they disagree, this file wins.

---

## 1. Overview

MOSS is a colorscheme for code editors and terminals. It is very dark — almost
black, but never pure `#000000` — with soft, muted, desaturated colors and low
visual noise. The identity is a green family: **moss**, **forest**, and **olive**,
loosely inspired by dark forest, moss, and black-metal aesthetics, rendered clean,
modern, and restrained. **Ochre** adds gentle warmth; **red** is reserved.

The theme is built for long coding sessions: nothing should shout, and normal
text should always be the brightest thing on screen. Green is the main accent
family and is used deliberately — it is never a wash over the whole UI.

This repository contains only the specification and its visual reference.
Ports (Neovim, Zed, Ghostty, VS Code, Orca, terminal emulators, …) will be
developed later, in separate repositories, starting from this spec.

## 2. Design Principles

1. **Very dark, never pure black.** The background is near-black with a faint
   green-grey cast. Pure `#000000` and blue-tinted blacks are both off-identity.
2. **Muted and low-noise.** Low saturation across the board. No neon, no glowing
   accents, no high-chroma surprises.
3. **Green is the identity — but not everywhere.** The green family (moss,
   forest, olive) carries structure and identity. The rest of the UI stays in
   the neutral green-grey background family. "Green everywhere" is a failure
   mode, not a goal.
4. **Hierarchy over brightness.** Normal text is the brightest token. Syntax
   accents sit below it on a luminance ladder (see §5), so no two roles compete
   at equal brightness and the eye is never pulled away from content.
5. **Warm tones carry values.** Olive (strings) and ochre (numbers, constants,
   decorators, gentle warnings) provide contrast where green alone would become
   monotonous.
6. **Red is reserved.** Errors, destructive states, and important exceptional
   syntax only. Red is never used decoratively.
7. **Surfaces stay close.** Background, surface, and overlay differ subtly
   (≈1.1:1 luminance steps) so the UI feels cohesive rather than layered with
   hard contrast bands.
8. **Selection and cursor-line are subtle.** They are slight tints, not bright
   blocks; the text on top keeps the normal foreground.
9. **Comfortable readability.** Normal text targets ≥ 12:1 contrast; secondary
   text targets ≈ 4:1. Strict WCAG-AA everywhere is *not* the goal in this phase
   (§10 discusses the trade-offs).

## 3. Core Palette

### 3.1 Core colors (fixed)

| Token    | Hex       | Intended role                                     | Notes                                                          |
| -------- | --------- | ------------------------------------------------- | -------------------------------------------------------------- |
| `bg`     | `#0D0F0C` | Main background                                   | Near-black with a green-grey cast. Never pure black.           |
| `surface`| `#141713` | Secondary surfaces                                | Sidebars, status bar, secondary chrome. Close to `bg`.         |
| `overlay`| `#1B1F1A` | Elevated surfaces                                 | Menus, popups, panels, floating windows.                       |
| `fg`     | `#D7D9D2` | Normal foreground                                 | The brightest token in the theme. Never pure white.            |
| `muted`  | `#70766B` | Muted text / comments / secondary info            | Greener grey; readable but clearly subdued.                    |
| `moss`   | `#7E9273` | Primary identity green                            | Keywords, cursor, focus, git-added, search accents.            |
| `forest` | `#536B4F` | Deep green for receding roles                     | Operators, markup tags, decoration. Low contrast by design.    |
| `olive`  | `#9A9968` | Warm green for string-like values                 | Strings, char literals.                                        |
| `ochre`  | `#B69A64` | Warm gold for value-like tokens and gentle warns  | Numbers, booleans, constants, decorators, warnings.            |
| `red`    | `#A75D57` | Errors and destructive states                     | Muted brick red. Not alarming, but unmistakable.               |

### 3.2 Derived colors (documented, revisionable)

Derived colors are **anchored** to the core palette. If a core color is ever
revised, derived colors must be re-derived by the same relationship — never
re-invented.

| Token           | Hex       | Relationship to core                                            | Intended role                                  |
| --------------- | --------- | --------------------------------------------------------------- | ---------------------------------------------- |
| `border`        | `#272C24` | `overlay` lifted toward the `bg` hue family (L ≈ 0.024)         | Subtle borders, dividers, outlines.            |
| `active`        | `#191D18` | Between `surface` and `overlay` (L ≈ 0.012)                     | Cursor line, hover backgrounds, pressed rows.  |
| `selection`     | `#2A3527` | `moss` scaled to ≈ 30% brightness (L ≈ 0.032)                   | Selection background.                          |
| `faint`         | `#4B5147` | `muted` darkened ≈ 40% (L ≈ 0.078)                              | Disabled text, non-current line numbers.       |
| `ochre-bright`  | `#C7A46B` | `ochre` lifted (L ≈ 0.40)                                       | Strong warnings, escape sequences.             |
| `red-bright`    | `#C06B63` | `red` lifted (L ≈ 0.23)                                         | Strong errors, conflict markers.               |

**Palette size:** 16 tokens total. This is a deliberate ceiling — new colors may
only be added by revising this spec (additive and versioned), never by ports.

## 4. Semantic Color Roles

### 4.1 Text

| Role            | Token   | Notes                                                |
| --------------- | ------- | ---------------------------------------------------- |
| Normal text     | `fg`    | Default foreground everywhere.                       |
| Secondary text  | `muted` | Captions, secondary labels, placeholder-adjacent UI. |
| Comments        | `muted` | See §5 — comments may add italics, never brightness. |
| Disabled text   | `faint` | Disabled items, empty states, non-essential data.    |

### 4.2 UI surfaces and elements

| UI element             | Token                | Notes                                                            |
| ---------------------- | -------------------- | ---------------------------------------------------------------- |
| Editor / main area     | `bg`                 | Also workspace and empty space.                                  |
| Sidebar, titlebar, toolbar | `surface`        | Quietly distinct from `bg`.                                      |
| Panel, palette, popup, menu, tooltip | `overlay` | Floating or docked elevated surfaces; add `border` outline.      |
| Active tab             | `overlay` bg         | Text `fg`; a `moss` underline/indicator marks the active tab.    |
| Inactive tab           | transparent (`bg`)   | Text `muted`.                                                    |
| Borders / dividers     | `border`             | 1px; subtle — never a pure grey.                                 |
| Cursor                 | `moss`               | Single color, beam or block.                                     |
| Selection              | `selection` bg       | Text stays `fg`; no extra border.                                |
| Cursor line            | `active` bg          | No border, no left marker, no text change.                       |
| Search match           | `selection` bg + `moss` text | Current match: `fg` text + `moss` outline.           |
| Focus (ring / outline) | `moss`               | Never red or ochre for focus.                                    |
| Hover (rows, buttons)  | `active` bg          | Subtle lift; no color change.                                    |
| Status bar             | `surface` bg         | Text `fg`/`muted`; mode indicator `moss`; warnings `ochre`; errors `red`. |
| Line numbers           | `faint`              | Non-current lines.                                               |
| Active line number     | `moss`               | The only concession to "you are here".                           |

## 5. Syntax Highlighting

**Philosophy.** Syntax should feel calm and hierarchical. The luminance ladder is:

```
fg (13.5)  >  ochre (7.2)  >  olive (6.5)  >  moss (5.7)  >  muted (4.1)  >  forest (3.3)
```

Normal text is brightest. Accents never outshine it, and no two *different* roles
are equally bright. Comments are readable but clearly subdued. The green family
carries structure (keywords, attributes); the warm family carries values
(strings, numbers); the neutrals carry the rest. This deliberately avoids the
"everything equally bright" rainbow.

### 5.1 Recommended mapping

| Syntax group                  | Token          | Rationale                                                                 |
| ----------------------------- | -------------- | ------------------------------------------------------------------------- |
| keyword                       | `moss`         | Structural words are the identity green; green rhythm = structure.        |
| function                      | `fg`           | Calls read as plain code; calm. *Provisional — see §14.*                  |
| method                        | `fg`           | Same treatment as functions. *Provisional.*                               |
| variable                      | `fg`           | Most common token; stays neutral.                                         |
| parameter                     | `fg` (italic)  | Italic separates parameters without color. *Provisional.*                 |
| property / field              | `fg`           | Plain; keeps `.chain.here` quiet. *Provisional.*                          |
| constant                      | `ochre`        | Values the eye may need to spot.                                          |
| string (incl. char literal)   | `olive`        | Warm green, distinct from both `fg` and `moss`.                           |
| number                        | `ochre`        | Gold catches the eye for bug-hunting, without shouting.                   |
| boolean                       | `ochre`        | Value family, same as numbers.                                            |
| type                          | `fg`           | Type names blend with text; context (generics, annotations) does the work. *Provisional.* |
| class                         | `fg` (bold ok) | Bold for class declarations; color stays neutral. *Provisional.*          |
| module / namespace            | `fg`           | Path segments stay neutral; `::`/`.` punctuation is `muted`.             |
| operator                      | `forest`       | Grammar recedes below keywords. Low contrast is fine for operators.       |
| punctuation                   | `muted`        | Separators stay quiet.                                                    |
| tag (HTML/XML/JSX)            | `forest`       | Markup structure recedes.                                                  |
| attribute                     | `moss`         | The brightest green stage sits on markup attributes.                      |
| decorator / annotation        | `ochre`        | Gently warm, visually distinct from surrounding code.                     |
| comment                       | `muted`        | Readable but clearly subdued.                                             |
| doc comment                   | `muted` (italic) | Same color as comments; typography separates. *Provisional.*            |
| escape sequence               | `ochre-bright` | Slightly stronger warm pop inside strings.                                |
| regex                         | `ochre`        | Value-like literal, warm family.                                          |
| special / builtin values (`self`, `None`, `nil`, `this`) | `ochre` | Special but not exceptional; warm, not alarming.          |
| error-raising constructs (`panic!`, `raise`, `throw`) | `red` (`red-bright` where extra visibility is needed) | The reserved hue for exceptional syntax. |

**Typography notes:** bold is allowed for function/class declarations; italics
for parameters and doc comments. These are font-style choices, not new colors.

## 6. Editor / UI States

See §4.2 for the full element table. Explicit state rules:

- **Selection and cursor line are subtle** — slight tints, not bright blocks.
- **Search match** differs from selection only by its `moss`/`fg` text and, for
  the current match, the `moss` outline — no new colors.
- **Inactive pane/split** keeps `bg`; optionally a `border` divider. Never a
  dimming overlay that recolor-tints the whole pane.
- **Highlighted "brace match"** uses `ochre` text (or an `ochre` outline) —
  visible without a new color.

## 7. Diagnostics (LSP, linters, compilers)

| Severity | Token          | Presentation                                                   |
| -------- | -------------- | -------------------------------------------------------------- |
| error    | `red`          | Text `red-bright`; icon, squiggle and popup header `red`.      |
| warning  | `ochre`        | Text/icon `ochre`; squiggle `ochre-bright`; stronger variants use `ochre-bright` text. |
| info     | `moss`         | Text/icon `moss`; squiggle `moss`.                             |
| hint     | `muted`        | Deliberately quiet. *Provisional — may move to `forest` if hints need more presence.* |

Error **text** always uses `red-bright`: `red` is almost as dark as `muted`
(≈ 1.03:1), so red text would look like a comment. `red` stays for icons,
squiggles, and other marks next to the text. `red-bright` also covers critical
errors (build failures, fatal panics, broken config).

## 8. Git / Diff Colors

| Status   | Token         | Notes                                                       |
| -------- | ------------- | ----------------------------------------------------------- |
| added    | `moss`        | Added lines and gutter markers.                             |
| modified | `ochre`       | Changed lines, rename/adjust markers.                       |
| deleted  | `red`         | Deleted lines and gutter markers.                           |
| conflict | `red-bright`  | Conflict markers and both-sides churn.                      |
| untracked| `moss`        | Same as added.                                              |
| ignored  | `faint`       | Certainly quiet.                                            |

**Tinted diff backgrounds:** when a diff view needs a background tint for the
whole line, use the token at **8–14% alpha over `bg`** (e.g. `moss` at ~10%
alpha for added lines). This is a rendering parameter, not a new color. The
tint must never approach solid — `selection` is the darkest allowed background
for interactive highlights.

## 9. Terminal / ANSI Guidance

**The final ANSI palette is deliberately TBD.** ANSI colors are a *projection*
of the semantic palette onto a 16-slot model, and the projection depends on the
terminal's color model (truecolor vs 256 vs 16). This section defines only the
derivation rules; exact hex values are marked TBD and will be fixed when the
first terminal port is made.

### 9.1 Derivation rules

1. **0 / 8** — the black slots take `bg` (0) and `surface` (8). Terminal
   backgrounds must remain near-black; never pure `#000`.
2. **1 / 9** — `red` / `red-bright`.
3. **2 / 10** — `moss`; 10 = `moss` lifted (+12–18% lightness, same hue, TBD).
4. **3 / 11** — `ochre` / `ochre-bright`.
5. **4 / 12 (blue)** — **TBD.** MOSS has no blue. If the platform requires a
   blue slot, choose a desaturated blue-green whose luminance sits in the
   palette band (L ≈ 0.08–0.18) and whose saturation is at or below `olive`'s.
   Document the hex as a deviation in the port.
6. **5 / 13 (magenta)** — **TBD.** A muted mauve-grey, low saturation, same
   luminance band. Document as a deviation.
7. **6 / 14 (cyan)** — `olive` preferred (the cyan slot is habitually used for
   strings, and `olive` is MOSS's string color). Exact lifted variant TBD.
8. **7 / 15** — `fg`; 15 = `fg` lifted toward (but **never**) pure white. TBD.
9. **Brights** (9–15) are the same hue as their base slot, +12–18% lightness,
   with saturation capped at the base slot's — bright does **not** mean vivid.
10. **Bold text** = `fg` in normal weight or the lifted slot only where the
    platform forces bold→bright mapping; never pure white.
11. **Cursor, selection, and links** in terminals: cursor `moss`, selection
    `selection` bg, hyperlinks `moss` + underline.

### 9.2 Slot table

| Slot | ANSI class | Source         | Hex status          |
| ---- | ---------- | -------------- | ------------------- |
| 0    | black      | `bg`           | fixed (identity)    |
| 1    | red        | `red`          | fixed (identity)    |
| 2    | green      | `moss`         | fixed (identity)    |
| 3    | yellow     | `ochre`        | fixed (identity)    |
| 4    | blue       | —              | **TBD**             |
| 5    | magenta    | —              | **TBD**             |
| 6    | cyan       | `olive`        | fixed (identity)    |
| 7    | white      | `fg`           | fixed (identity)    |
| 8    | bright black | `surface`    | fixed (identity)    |
| 9    | bright red | `red-bright`   | fixed (derived)     |
| 10   | bright green | `moss` lifted | **TBD**             |
| 11   | bright yellow | `ochre-bright` | fixed (derived)   |
| 12   | bright blue | —              | **TBD** (same family as 4) |
| 13   | bright magenta | —          | **TBD** (same family as 5) |
| 14   | bright cyan | `olive` lifted | **TBD**             |
| 15   | bright white | `fg` lifted   | **TBD**              |

## 10. Contrast and Accessibility

Measured WCAG 2.1 relative-luminance contrast ratios (rounded). "AA" refers to
the 4.5:1 threshold for normal text; a dash means the value is intentionally
below it.

| Token          | on `bg` | on `surface` | Used for                    | Note                               |
| -------------- | ------- | ------------ | --------------------------- | ---------------------------------- |
| `fg`           | 13.5    | 12.7         | normal text                 | AAA; comfortably readable.         |
| `ochre-bright` | 8.2     | 7.7          | strong warnings             | AA.                                |
| `ochre`        | 7.1     | 6.7          | numbers, warnings           | AA.                                |
| `olive`        | 6.5     | 6.1          | strings                     | AA.                                |
| `moss`         | 5.7     | 5.4          | keywords, accents, cursor   | AA.                                |
| `red-bright`   | 5.1     | 4.8          | error text, critical errors | AA.                                |
| `muted`        | 4.1     | 3.9          | comments, secondary text    | ≈ AA-large; intentionally below 4.5 |
| `red`          | 4.0     | 3.7          | error icons, squiggles      | slightly below AA; not for error text (§7) |
| `forest`       | 3.3     | 3.1          | operators, tags, decoration | intentionally low; never essential text |
| `faint`        | 2.4     | 2.2          | disabled, line numbers      | exempt categories; never for active content |
| `border` / `active` / `selection` | 1.0–1.5 | — | backgrounds, borders | intentionally low; they are not text |

Additional checks: `fg` on `selection` ≈ 9.0:1 — selected text stays fully
readable. `bg`↔`surface`↔`overlay` are ≈ 1.07–1.08:1 apart — cohesive, as
intended.

**Policy for this phase:** the goal is comfortable readability, not strict AA
on every token. Comments and errors are intentionally near, but below, the
4.5:1 body-text threshold; this keeps them visually quiet, which is part of the
identity. Future ports may adapt for platform constraints (see §11): small
lightness lifts (e.g. `muted` by ≤ 6%)
are permitted **with documentation**, and the **hue must never change**.
Core identity colors (`bg`, `fg`, `moss`, `ochre`, palette §3.1) must never be
altered silently.

## 11. Porting Rules

A port is any editor, terminal, or app integration of MOSS.

1. **`SPEC.md` is the source of truth.** `index.html` is the visual reference.
   When in doubt, follow the spec; if the spec is ambiguous, open an issue —
   do not improvise silently.
2. **Map every role in §4–§8** to the platform's tokens. Unsupported scopes get
   a documented fallback to the nearest role (e.g. no decorator scope → reuse
   `ochre` roles).
3. **Do not invent colors.** No new hex values unless a platform limitation
   requires them. If one is required, derive it from an existing hue family,
   add it to the port's deviation log with hex + reason, and propose it to the
   spec if it is generally useful.
4. **Prefer semantic equivalence over literal token naming.** A port's
   `background`, `bg`, or `editor.background` all map to `bg` — what matters is
   the documented mapping, not the name.
5. **Preserve the near-black background.** Never pure `#000000`; never shift
   the background blue or grey in a way that leaves the green-grey family.
6. **Preserve the muted, low-saturation identity.** Never increase saturation
   to make a port "pop". Brightness lifts are fine; chroma lifts are not.
7. **Preserve the hierarchy.** Normal text brightest; comments below accents;
   values warm; structure green. Do not equalize brightness across roles.
8. **Preserve hue-family assignments.** Do not swap `moss`↔`ochre` roles "for
   variety". The green family carries structure; the warm family carries values.
9. **Keep surfaces close.** `bg`/`surface`/`overlay` differ by ≈1.1:1 steps;
   do not introduce light panels or dark-on-light chrome.
10. **Every port ships a deviation log**: spec version, date, list of
    deviations (colors added, roles remapped, adaptions) and their reasons.
11. **Green is intentional, not ambient.** Do not tint all UI chrome green;
    do not add green headers, green buttons everywhere, etc. Accent roles only.

## 12. Naming Conventions

**Canonical token names (16):** `bg`, `surface`, `overlay`, `fg`, `muted`,
`faint`, `border`, `active`, `selection`, `moss`, `forest`, `olive`, `ochre`,
`red`, `ochre-bright`, `red-bright`.

- Tokens are kebab-case; `-bright` marks a lifted variant of a base accent.
- `bg`/`surface`/`overlay` describe **elevation**; `fg`/`muted`/`faint`
  describe **text level**; `border`/`active`/`selection` describe **function**;
  `moss`/`forest`/`olive`/`ochre`/`red` are **identity hues**. No token encodes
  a platform (no `vim-*`, no `zed-*`).
- Semantic roles (§4–§8) are referenced by their role name (`keyword`,
  `error`, `added`, …) and are mapped to tokens in the tables above.
- The visual reference (`index.html`) binds tokens to CSS custom properties as
  `--moss-<token>` (token `moss` → `--moss-moss`) and may bind roles to classes
  (`kw`, `str`, …). Ports may use any binding, as long as the mapping is
  documented (rule 4).

## 13. Things Ports Must Not Do

1. **No pure black** background and **no pure white** foreground.
2. **No neon, glow, or vivid variants** — including "terminal bright" escapes.
3. **No "green everywhere"** — green stays an accent family, not a wash.
4. **No full-spectrum expansion** (blue/purple/pink syntax accents) without a
   documented, spec-level decision. MOSS is not a rainbow theme.
5. **No bright comments.** Comments stay below accent brightness, clearly
   dimmer than normal text.
6. **No flattening the hierarchy** — all roles at equal brightness is a
   different theme.
7. **No silent identity changes.** `bg`, `fg`, `moss`, `ochre` and the rest of
   §3.1 are fixed; hue changes are not "adjustments".
8. **No token renaming masquerading as equivalence** — if a port renames,
   the mapping must be documented (rule 4).
9. **No palette creep** — new tokens require a spec revision, not a port's
   private extension.
10. **No using the red family for decoration** — red is for errors,
    destructive states, and exceptional syntax.
11. **No red/ochre for focus** — focus is `moss`; warm colors mean
    warning/value, focus means identity.
12. **No ANSI shortcuts** — 16-color ports follow §9, including the TBD slots;
    "vivid" approximations of `red`/`ochre` (i.e. pure ANSI 1/3 defaults) are
    not MOSS.
13. **No shipping without a deviation log.**

## 14. Provisional Decisions

These decisions are recorded as provisional so they can be revised **before**
ports are created. Each lists the revision trigger. Anything fixed in §3.1 or
marked "fixed" in §9.2 is not open for revision without a version bump.

| # | Decision | Current value | Revision trigger |
| - | -------- | ------------- | ---------------- |
| 1 | functions / methods | `fg` (neutral) | If `index.html` review finds neutral functions too flat against variables. |
| 2 | types / classes | `fg` (bold ok) | If typed code needs more type presence (candidate: `moss`). |
| 3 | properties / fields | `fg` | If property chains need quieting (candidate: `muted`). |
| 4 | parameters | `fg` + italic | If italics are unavailable in a platform; falls back to `fg` plain. |
| 5 | doc comments | `muted` + italic | If docs read as identical to plain comments (candidate: `forest` markers). |
| 6 | hint diagnostics | `muted` | If hints are indistinguishable from plain UI text (candidate: `forest`). |
| 7 | search match presentation | `selection` bg + `moss` text; current match `fg` + `moss` outline | Visual review of `index.html` states section. |
| 8 | cursor | solid `moss` | Platform cursor conventions (e.g. block vs beam) may need a text-contrast variant. |
| 9 | derived-color hexes (§3.2) | as listed | Formulas are fixed; exact hexes may be tuned until v1.0. |
| 10 | ANSI slots 4, 5, 12, 13, 14 | TBD (§9) | Fixed at first terminal port, following §9.1 rules. |
| 11 | bold/italic assignments | as noted in §5.1 | Typography details settle during first editor port. |

## Appendix — Revision History

| Version | Date       | Change                                  |
| ------- | ---------- | --------------------------------------- |
| v0.1    | (initial)  | Initial specification; specification phase. |