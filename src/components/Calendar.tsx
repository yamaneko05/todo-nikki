"use client";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import * as server from "@/server";
import { LucideChevronLeft, LucideChevronRight } from "lucide-react";
import { Day } from "@/hooks/useDaysStore";
import DayCell from "./DayCell";

export default function Calendar() {
  const [month, setMonth] = useState(dayjs());
  const [days, setDays] = useState<Day[]>([]);

  const handlePrevButtonClick = () => {
    setMonth((prev) => prev.subtract(1, "month"));
  };

  const handleNextButtonClick = () => {
    setMonth((prev) => prev.add(1, "month"));
  };

  useEffect(() => {
    const startOfMonth = month.startOf("month");
    const endOfMonth = month.endOf("month");

    const dateGte = startOfMonth.subtract(startOfMonth.day(), "day");
    const dateLte = endOfMonth.add(6 - endOfMonth.day(), "day");

    server.getDays(dateGte.toDate(), dateLte.toDate()).then((days) => {
      setDays(days);
    });
  }, [month]);

  return (
    <>
      <div className="flex items-center justify-center gap-2">
        <button onClick={handlePrevButtonClick}>
          <LucideChevronLeft />
        </button>
        <div className="font-bold">{month.format("YYYY[年]M月")}</div>
        <button onClick={handleNextButtonClick}>
          <LucideChevronRight />
        </button>
      </div>
      <div className="mt-6 grid h-[520px] grid-cols-7 grid-rows-7">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="text-center font-bold">
            {dayjs().day(i).format("ddd")}
          </div>
        ))}
        {days.map((day, i) => (
          <DayCell key={i} day={day} currentMonth={month.toDate()} />
        ))}
      </div>
    </>
  );
}
