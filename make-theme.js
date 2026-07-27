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
      ANSIBlackColor: '#2E333C', ANSIRedColor: '#F18080', ANSIGreenColor: '#85D796',
      ANSIYellowColor: '#EFD183', ANSIBlueColor: '#84B6F4', ANSIMagentaColor: '#C4A1F0',
      ANSICyanColor: '#83D9DE', ANSIWhiteColor: '#D6DAE2',
      ANSIBrightBlackColor: '#707888', ANSIBrightRedColor: '#FFA3A0', ANSIBrightGreenColor: '#ADEBBA',
      ANSIBrightYellowColor: '#FBE7AC', ANSIBrightBlueColor: '#ABCEFA', ANSIBrightMagentaColor: '#DBC2F8',
      ANSIBrightCyanColor: '#ACEBEE', ANSIBrightWhiteColor: '#F7F8FB',
    },
    // 0..1 — the glass itself
    blur: 0.62,
  },
  'Liquid Glass Light': {
    colors: {
      BackgroundColor: ['#F4F6FA', 0.58], TextColor: '#23272F', BoldTextColor: '#0B0D12',
      CursorColor: '#D97757', SelectionColor: ['#7A8CA8', 0.28],
      ANSIBlackColor: '#2B303A', ANSIRedColor: '#C5453F', ANSIGreenColor: '#2F8B4A',
      ANSIYellowColor: '#8E7418', ANSIBlueColor: '#2F6FCB', ANSIMagentaColor: '#7D4FC0',
      ANSICyanColor: '#20757D', ANSIWhiteColor: '#6B7280',
      ANSIBrightBlackColor: '#8B93A0', ANSIBrightRedColor: '#A93531', ANSIBrightGreenColor: '#23713B',
      ANSIBrightYellowColor: '#735C10', ANSIBrightBlueColor: '#1F58AC', ANSIBrightMagentaColor: '#663CA4',
      ANSIBrightCyanColor: '#155E65', ANSIBrightWhiteColor: '#4B515C',
    },
    // thinner than the dark plate — dark text carries on a lighter wash
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
