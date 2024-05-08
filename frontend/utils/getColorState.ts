export type ColorState = "success" | "warn" | "error" | "info";

export default (oee: number, isPaused: boolean): ColorState => {
  if(isPaused) {
    return "info";
  } else if(oee > 80) {
    return "success";
  } else if(oee > 50) {
    return "warn";
  } else {
    return "error";
  }
};


export function hslToString(hsl: { hue: number; saturation: number; luminance: number }): string {
  return `${hsl.hue} ${hsl.saturation} ${hsl.luminance}`;
}

// export function progressGradient(oee: number, progressColor: string, barColor: string): string {
//   return `linear-gradient(90deg, hsl(${progressColor}) 0%, hsl(${progressColor}) ${oee}%, hsl(${barColor}) ${oee}%)`;
// };

// function progressGradient(colorState: ColorState): string {
//   return `linear-gradient(90deg, hsl(${hslToString(hexToHSL(theme.current.value.colors[colorState]))}) 0%, hsl(${hslToString(hexToHSL(theme.current.value.colors[colorState]))}) ${equipment.oee}%, hsl(${hslToString(hexToHSL(theme.current.value.colors["carbony15"]))}) ${equipment.oee}%)`;
// };
