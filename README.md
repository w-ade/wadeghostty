# Liquid Glass

A translucent, blurred theme for macOS Terminal.app — dark and light. Generated from
one small JXA script, so the palette lives in readable source instead of a binary plist.

![Liquid Glass Dark](preview-dark.png)
![Liquid Glass Light](preview-light.png)

## Install

```sh
open "Liquid Glass Dark.terminal"
open "Liquid Glass Light.terminal"
```

Each opens a new window using the profile and adds it to **Terminal → Settings → Profiles**.
Select one and click **Default** to keep it.

The glass is real window blur (`BackgroundBlur`), not a flat tint — the background color
carries alpha, so what's behind the window shows through.

## Palette

| Role | Dark | Light |
| --- | --- | --- |
| Background | `#191C22` @ 72% | `#F4F6FA` @ 58% |
| Text | `#ECEEF3` | `#23272F` |
| Bold | `#FFFFFF` | `#0B0D12` |
| Cursor | `#D97757` | `#D97757` |
| Selection | `#8A9BB8` @ 35% | `#7A8CA8` @ 28% |
| Dim / comments | `#707888` | `#8B93A0` |

Both share the same hues; only lightness moves. The cursor is the one constant across
the pair. The light plate is the thinner of the two — dark text carries on a lighter wash,
so more of the desktop comes through.

One deliberate break from convention in the light theme: the **bright** ANSI slots go
*darker* rather than lighter. Brighter-than-near-white is invisible, so "bright" is read
as "more emphatic." `bright black` stays a light gray, since tools use it for comments.

## Regenerate

```sh
osascript -l JavaScript make-theme.js
```

Edit the `themes` object in `make-theme.js` — hex strings, or `['#RRGGBB', alpha]` for the
translucent slots — and re-run. Both `.terminal` files are rewritten in place.

`preview.html` renders the mock terminal above in both palettes; it is a plain HTML file
you can open directly.

## License

MIT — see [LICENSE](LICENSE).
