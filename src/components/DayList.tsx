"use client";

import useDaysStore from "@/hooks/useDaysStore";
import DayCard from "./DayCard";
import { useEffect } from "react";

export default function DayList() {
  const daysStore = useDaysStore();

  useEffect(() => {
    daysStore.loadDays();
  }, []);

  return (
    <div className="flex flex-col divide-y">
      <button onClick={daysStore.loadPreviousDays}>load prev</button>
      {daysStore.days.map((day, i) => (
        <DayCard key={i} day={day} dayIndex={i} />
      ))}
      <button onClick={daysStore.loadNextDays}>load prev</button>
    </div>
  );
}
