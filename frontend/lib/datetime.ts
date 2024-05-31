


export function timezoneOffsetToString(tzoffset: number): string {
  const hours = Math.floor(tzoffset);
  const minutes = Math.abs(tzoffset - hours) * 60;

  const hourStr = Math.abs(hours).toString()
    .padStart(2, "0");
  const minStr = minutes.toString().padStart(2, "0");
  const sign = tzoffset < 0 ? "-" : "+";

  return `${sign}${hourStr}:${minStr}`;
}
