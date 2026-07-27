# Liquid Glass

<img src="preview-ghostty.jpg" width="680" alt="Liquid Glass Dark in Ghostty">

A translucent dark terminal theme for macOS — **Terminal.app** and **Ghostty**. The
Terminal profile is generated from one small JXA script, so the palette lives in readable
source instead of a binary plist.

## Install

**Terminal.app** — `open "Liquid Glass Dark.terminal"`. It opens a window using the
profile and adds it under **Settings → Profiles**; click **Default** to keep it.

**Ghostty:**

```sh
mkdir -p ~/.config/ghostty/themes
cp ghostty/liquid-glass-dark ~/.config/ghostty/themes/
```

Then set `theme = liquid-glass-dark` in `~/.config/ghostty/config` and reload with **⌘⇧,**.
The theme file carries its own `background-opacity` and `background-blur-radius` — don't
also set those two keys in `config`, where they would win.

## Design notes

Blur averages the desktop behind the window into gray mush. A dark plate hides that mush
and reads rich; a light plate reveals it and turns milky. That is why there is no light
variant — one shipped in the first two commits and was dropped.

Color slots sit at the sRGB primaries and secondaries — OKLCH red 29°, yellow 100°, green
142°, cyan 195°, blue 262°, magenta 328° — so each is named on sight rather than read as a
pastel. Chroma runs as far as the plate takes before the color turns neon; lightness is
set per hue so no slot jumps forward. All clear 6.5:1 against the background. Blue and
cyan sit at the sRGB gamut edge.

The translucency is a property of the profile, not the screenshot: the background color
carries alpha and `BackgroundBlur` sets the frost, so the window composites against the
live desktop.

## Palette

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

Background `#191C22` @ 72% · Text `#ECEEF3` · Bold `#FFFFFF` · Cursor `#D97757` ·
Selection `#8A9BB8` @ 35% · Dim `#707888`

Ghostty has no separate bold color and takes no alpha on selection, so it gets the
selection pre-composited as `#3D4656`. Blur units differ and are not interchangeable:
Terminal takes `0.62` on a 0–1 scale, Ghostty takes `20` in pixels.

## Regenerate

```sh
osascript -l JavaScript make-theme.js
```

Edit the `themes` object — hex strings, or `['#RRGGBB', alpha]` for translucent slots.
`Liquid Glass Dark.terminal` is rewritten in place. Three catches: the output directory is
hardcoded to `~/Workshop/liquid-glass-theme`; the Ghostty file is hand-maintained and the
generator never touches it; and Terminal caches imported profiles, so delete the old one
in **Settings → Profiles** before re-opening. Do not set the glass through Terminal's
AppleScript `background color` — that API drops the alpha channel silently.

## License

MIT — see [LICENSE](LICENSE).
