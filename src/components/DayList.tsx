"use client";

import useDaysStore from "@/hooks/useDaysStore";
import DayCard from "./DayCard";
import { useEffect } from "react";
import dayjs from "@/utils/dayjs";

export default function DayList() {
  const { days, loadDays } = useDaysStore();

  useEffect(() => {
    loadDays(dayjs().add(-4, "day").toDate());
  }, [loadDays]);

  return (
    <div className="flex flex-col gap-4">
      {days.map((day, i) => (
        <DayCard key={i} day={day} dayIndex={i} />
      ))}
    </div>
  );
}
