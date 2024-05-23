


export function renderDateTime(date: number | string | Date): string {
  if(typeof date === "number" || typeof date === "string") {
    date = new Date(date);
  }

  const rawOffset = date.getTimezoneOffset();
  const offsetHours = Math.abs(Math.floor(rawOffset / 60));
  const offsetMinutes = Math.abs(rawOffset - offsetHours * 60);
  const leading = rawOffset < 0 ? "-" : "+";
  const offsetStr = `${leading}${offsetHours.toString().padStart(2, "0")}:${offsetMinutes.toString().padStart(2, "0")}`;

  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()} (${offsetStr})`;
}
