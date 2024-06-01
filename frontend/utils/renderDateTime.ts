import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";



dayjs.extend(utc);
dayjs.extend(timezone);



export default function renderDateTime(
  date: number | string | Date, tzoffset?: number,
): string {
  let day = dayjs(date);
  if(tzoffset) {
    day = day.utcOffset(tzoffset);
  }

  // const offsetStr = timezoneOffsetToString(date.getTimezoneOffset());

  return day.format("YYYY-MM-DD HH:mm (Z)");
  // return `${date.toLocaleDateString()} ${date.toLocaleTimeString()} (${offsetStr})`;
}
