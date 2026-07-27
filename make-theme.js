ObjC.import('AppKit');

// hex may carry alpha: '#RRGGBB' or ['#RRGGBB', alpha]
function color(spec) {
  const [hex, a] = Array.isArray(spec) ? spec : [spec, 1.0];
  const n = parseInt(hex.slice(1), 16);
  const c = $.NSColor.colorWithSRGBRedGreenBlueAlpha(
    ((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255, a);
  return $.NSKeyedArchiver.archivedDataWithRootObjectRequiringSecureCodingError(c, true, null);
}

const themes = {
  'Liquid Glass Dark': {
    colors: {
      BackgroundColor: ['#191C22', 0.72], TextColor: '#ECEEF3', BoldTextColor: '#FFFFFF',
      CursorColor: '#D97757', SelectionColor: ['#8A9BB8', 0.35],
      // Color slots sit at the sRGB primary/secondary hues, held at the lightness the
      // plate needs. Saturated enough to name on sight, short of neon.
      ANSIBlackColor: '#2E333C', ANSIRedColor: '#FF7666', ANSIGreenColor: '#74DD6A',
      ANSIYellowColor: '#ECD64C', ANSIBlueColor: '#88B2FF', ANSIMagentaColor: '#EE88EB',
      ANSICyanColor: '#48E1E1', ANSIWhiteColor: '#D6DAE2',
      ANSIBrightBlackColor: '#707888', ANSIBrightRedColor: '#FFA497', ANSIBrightGreenColor: '#A3F09B',
      ANSIBrightYellowColor: '#FAEA8B', ANSIBrightBlueColor: '#AFCCFF', ANSIBrightMagentaColor: '#F9B3F6',
      ANSIBrightCyanColor: '#8DF2F1', ANSIBrightWhiteColor: '#F7F8FB',
    },
    // 0..1 — the glass itself
    blur: 0.62,
  },
};

const dir = $('~/Workshop/liquid-glass-theme').stringByExpandingTildeInPath.js;
const written = [];
for (const name in themes) {
  const t = themes[name];
  const d = $.NSMutableDictionary.alloc.init;
  d.setObjectForKey($(name), $('name'));
  d.setObjectForKey($('Window Settings'), $('type'));
  d.setObjectForKey($.NSNumber.numberWithDouble(2.07), $('ProfileCurrentVersion'));
  d.setObjectForKey($.NSNumber.numberWithDouble(t.blur), $('BackgroundBlur'));
  for (const key in t.colors) d.setObjectForKey(color(t.colors[key]), $(key));
  const path = dir + '/' + name + '.terminal';
  const ok = d.writeToFileAtomically($(path), true);
  written.push(path + ' ok=' + ok);
}
written.join('\n');
