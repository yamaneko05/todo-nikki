"use client";

import useDaysStore from "@/hooks/useDaysStore";
import DayCard from "./DayCard";
import { useEffect } from "react";
import dayjs from "@/utils/dayjs";

export default function DayList() {
  const daysStore = useDaysStore();

  useEffect(() => {
    daysStore.loadDays(dayjs().add(-4, "day").toDate());
  }, []);

  return (
    <div className="flex flex-col divide-y">
      {daysStore.days.map((day, i) => (
        <DayCard key={i} day={day} dayIndex={i} />
      ))}
    </div>
  );
}
