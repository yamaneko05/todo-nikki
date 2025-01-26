import djs, { Dayjs } from "dayjs";
import calendar from "dayjs/plugin/calendar";
import ja from "dayjs/locale/ja";

const dayjs = djs;

djs.extend(calendar);
djs.locale(ja);

export function getDaysBetween(start: Dayjs, end: Dayjs) {
  const range = [];
  let current = start;
  while (!current.isAfter(end)) {
    range.push(current);
    current = current.add(1, "days");
  }
  return range;
}

export default dayjs;
