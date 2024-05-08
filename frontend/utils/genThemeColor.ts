export interface CarbonyTheme {
  surface: string;
  carbony5: string;
  carbony10: string;
  carbony15: string;
  carbony20: string;
  carbony25: string;
  carbony30: string;
  carbony35: string;
  carbony40: string;
  carbony45: string;
  carbony50: string;
  carbony55: string;
  carbony60: string;
  carbony65: string;
  carbony70: string;
  carbony75: string;
  carbony80: string;
  carbony85: string;
  carbony90: string;
  carbony95: string;
  carbony100: string;
}

export function hslToHex(hsl: {
  hue: number;
  saturation: number;
  luminance: number;
}): string {
  const { hue, saturation, luminance } = hsl;

  const hDecimal = luminance / 100;
  const a = (saturation * Math.min(hDecimal, 1 - hDecimal)) / 100;
  const f = (n: number) => {
    const k = (n + hue / 30) % 12;
    const color = hDecimal - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

    // Convert to Hex and prefix with "0" if required
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// www.jameslmilner.com/posts/converting-rgb-hex-hsl-colors/
export function hexToHSL(hex: string): {
  hue: number;
  saturation: number;
  luminance: number;
} {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if(!result) {
    throw new Error("Could not parse Hex Color");
  }

  const rHex = Number.parseInt(result[1], 16);
  const gHex = Number.parseInt(result[2], 16);
  const bHex = Number.parseInt(result[3], 16);

  const r = rHex / 255;
  const g = gHex / 255;
  const b = bHex / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = (max + min) / 2;
  let s = h;
  let l = h;

  if(max === min) {
    // Achromatic
    l = l * 100;
    l = Math.round(l);
    return { hue: 0, saturation: 0, luminance: l };
  }

  const d = max - min;
  s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  switch (max) {
    case r:
      h = (g - b) / d + (g < b ? 6 : 0);
      break;
    case g:
      h = (b - r) / d + 2;
      break;
    case b:
      h = (r - g) / d + 4;
      break;
  }
  h /= 6;

  s = s * 100;
  s = Math.round(s);
  l = l * 100;
  l = Math.round(l);
  h = Math.round(360 * h);

  return { hue: h, saturation: s, luminance: l };
}

export default (hex: string) => {
  // www.jameslmilner.com/posts/converting-rgb-hex-hsl-colors/


  // Based on https://github.com/carbon-design-system/carbon/blob/main/packages/colors/src/colors.js
  // export function genThemeColors(hex: string): CarbonyTheme {
  //   const base = hexToHSL(hex);

  //   let lumIncrements = [96, 88, 78, 66, 55, 44, 32, 22, 15, 9];

  //   let lumStartingIndex = 0;

  //   lumIncrements.forEach((val, index) => {
  //     if (
  //       Math.abs(val - base.luminance) <
  //       Math.abs(lumIncrements[lumStartingIndex] - base.luminance)
  //     ) {
  //       lumStartingIndex = index;
  //     }
  //   });

  //   const lumAdjust = lumIncrements[lumStartingIndex] - base.luminance;

  //   lumIncrements = lumIncrements.map((val) => val + lumAdjust);

  //   const hsl = lumIncrements.map((val) => ({
  //     hue: base.hue,
  //     saturation: base.saturation,
  //     luminance: val,
  //   }));

  //   const themeColors: CarbonyTheme = {
  //     surface: hex,
  //     carbony10: hslToHex(hsl[0]),
  //     carbony20: hslToHex(hsl[1]),
  //     carbony30: hslToHex(hsl[2]),
  //     carbony40: hslToHex(hsl[3]),
  //     carbony50: hslToHex(hsl[4]),
  //     carbony60: hslToHex(hsl[5]),
  //     carbony70: hslToHex(hsl[6]),
  //     carbony80: hslToHex(hsl[7]),
  //     carbony90: hslToHex(hsl[8]),
  //     carbony100: hslToHex(hsl[9]),
  //   };

  //   return themeColors;
  // }

  function genThemeColors(hex: string): CarbonyTheme {
    const base = hexToHSL(hex);

    let lumIncrements = [ 96, 88, 78, 66, 55, 44, 32, 22, 15, 9 ];

    let lumStartingIndex = 0;

    lumIncrements.forEach((val, index) => {
      if(
        Math.abs(val - base.luminance)
        < Math.abs(lumIncrements[lumStartingIndex] - base.luminance)
      ) { lumStartingIndex = index; }
    });

    const lumAdjust = lumIncrements[lumStartingIndex] - base.luminance;

    lumIncrements = lumIncrements.map((val) => val + lumAdjust);

    const halfSteps: number[] = [];

    lumIncrements.forEach((val, index) => {
      if(lumIncrements[index + 1]) {
        halfSteps.push(val, Math.round((val + lumIncrements[index + 1]) / 2));
      } else { halfSteps.push(val, Math.round((val + 0) / 2)); }
    });

    const hsl: [string, string][] = halfSteps.map((val, index) => [
  `carbony${(index + 1) * 5}`,
  hslToHex({
    hue: base.hue,
    saturation: base.saturation,
    luminance: val,
  }),
    ]);

    hsl.push([ "surface", hex ]);

    const themeColors: CarbonyTheme = Object.fromEntries(
      hsl,
    ) as unknown as CarbonyTheme;

    return themeColors;
  }

  return genThemeColors(hex);
};
