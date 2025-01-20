import djs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import ja from "dayjs/locale/ja";

const dayjs = djs;

djs.extend(calendar);
djs.locale(ja);

export default dayjs;
