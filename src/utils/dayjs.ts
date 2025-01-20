import djs from "dayjs";
import calendar from "dayjs/plugin/calendar";

const dayjs = djs;

djs.extend(calendar);

export default dayjs;
