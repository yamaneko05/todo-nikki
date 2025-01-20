"use client";

import useDaysStore from "@/hooks/useDaysStore";
import DayCard from "./DayCard";
import { useEffect } from "react";
import { getDays } from "@/server";
import dayjs from "@/utils/dayjs";

export default function DayList() {
  const { days, setDays } = useDaysStore();

  useEffect(() => {
    (async () => {
      setDays(await getDays(dayjs().add(-4, "day").toDate()));
    })();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {days.map((day, i) => (
        <DayCard key={i} day={day} dayIndex={i} />
      ))}
    </div>
  );
}
