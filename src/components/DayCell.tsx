"use client";

import { Day } from "@/hooks/useDaysStore";
import dayjs from "@/utils/dayjs";
import { LucideCheckSquare2, LucideNotebookPen } from "lucide-react";
import Link from "next/link";

export default function DayCell({
  day,
  currentMonth,
}: {
  day: Day;
  currentMonth: Date;
}) {
  return (
    <Link
      href={{
        pathname: "/",
        query: { date: dayjs(day.date).format("YYYY-MM-DD") },
      }}
      className={`rounded ${dayjs(day.date).isToday() ? "bg-indigo-200 hover:bg-indigo-300" : "hover:bg-slate-100"} ${!dayjs(day.date).isSame(currentMonth, "month") && "text-gray-400"}`}
    >
      <div className="text-center">{dayjs(day.date).format("D")}</div>
      <div className="mt-0.5 flex flex-col items-center gap-1">
        {day.tasks.length > 0 && (
          <div className="flex items-center justify-center gap-0.5">
            <LucideCheckSquare2 size={14} />
            <div className="text-sm">
              {day.tasks.filter((task) => task.done).length}/{day.tasks.length}
            </div>
          </div>
        )}
        {day.diary && (
          <div className="flex justify-center">
            <LucideNotebookPen size={14} />
          </div>
        )}
      </div>
    </Link>
  );
}
