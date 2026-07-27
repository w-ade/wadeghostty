# Liquid Glass

A translucent dark terminal theme for macOS — **Terminal.app** and **Ghostty**. The
Terminal profile is generated from one small JXA script, so the palette lives in readable
source instead of a binary plist.

## Install

### Terminal.app

```sh
open "Liquid Glass Dark.terminal"
```

It opens a new window using the profile and adds it to **Terminal → Settings → Profiles**.
Select it and click **Default** to keep it.

### Ghostty

```sh
cp ghostty/liquid-glass-dark ~/.config/ghostty/themes/
```

Then in `~/.config/ghostty/config`:

```
theme = liquid-glass-dark
```

Reload with **⌘⇧,**.

The theme file carries its own `background-opacity` and `background-blur-radius`. **Do not
also set those two keys in `config`** — a value there wins over the theme file.

## Design notes

### Frost is why this is dark only

Blur averages the desktop behind the window into flat gray mush. A dark plate hides that
mush and reads rich; a light plate reveals it and turns milky. A light variant shipped in
the first two commits and was dropped for this reason.

### The color slots sit at the sRGB primaries and secondaries

Red 29°, yellow 100°, green 142°, cyan 195°, blue 262°, magenta 328° in OKLCH. Landing on
the named hues means each slot is identified on sight rather than read as a pastel.

Chroma is carried as far as the plate takes it before the color turns neon. Lightness is
set per hue so no slot jumps forward of the others. Everything clears 6.5:1 against the
background. Blue and cyan sit at the sRGB gamut edge and cannot go further without losing
lightness.

### Translucency is real, not painted

The background color carries an alpha channel and `BackgroundBlur` sets the frost, so what
is behind the window shows through. This is a property of the profile, not a screenshot
effect.

## Palette

| Role | Value |
| --- | --- |
| Background | `#191C22` @ 72% |
| Text | `#ECEEF3` |
| Bold | `#FFFFFF` |
| Cursor | `#D97757` |
| Selection | `#8A9BB8` @ 35% |
| Dim / comments | `#707888` |

| Slot | Normal | Bright |
| --- | --- | --- |
| Black | `#2E333C` | `#707888` |
| Red | `#FF7666` | `#FFA497` |
| Green | `#74DD6A` | `#A3F09B` |
| Yellow | `#ECD64C` | `#FAEA8B` |
| Blue | `#88B2FF` | `#AFCCFF` |
| Magenta | `#EE88EB` | `#F9B3F6` |
| Cyan | `#48E1E1` | `#8DF2F1` |
| White | `#D6DAE2` | `#F7F8FB` |

Blur is expressed in different units by each terminal and the two are not
interchangeable: Terminal.app takes `BackgroundBlur = 0.62` on a 0–1 scale, Ghostty takes
`background-blur-radius = 20` in pixels.

## Regenerate

```sh
osascript -l JavaScript make-theme.js
```

Edit the `themes` object in `make-theme.js` — hex strings, or `['#RRGGBB', alpha]` for the
translucent slots — and re-run. `Liquid Glass Dark.terminal` is rewritten in place.

Three things to know before editing:

- The output directory is hardcoded to `~/Workshop/liquid-glass-theme` at the bottom of
  `make-theme.js`. Change that line if the repo lives elsewhere.
- The Ghostty file in `ghostty/` is hand-maintained. The generator does not touch it; keep
  it in step by hand.
- Terminal caches an imported profile, so a regenerated file will not update a profile you
  already imported. Delete the old one in **Settings → Profiles** first, then re-open the
  file.

Do not try to change the glass through Terminal's AppleScript `background color` — that
API silently drops the alpha channel and leaves the profile opaque.

## License

MIT — see [LICENSE](LICENSE).
