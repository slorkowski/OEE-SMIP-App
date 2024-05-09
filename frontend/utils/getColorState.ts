export type ColorState = "success" | "warn" | "error" | "info";

export default (oee: number): ColorState => {
  if(oee > 80) {
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
