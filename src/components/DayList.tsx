"use client";

import useDaysStore from "@/hooks/useDaysStore";
import DayCard from "./DayCard";
import { useEffect, useRef } from "react";
import dayjs from "@/utils/dayjs";

export default function DayList() {
  const daysStore = useDaysStore();
  const searchParams = new URLSearchParams();
  const refs = useRef<{ [K in string]: HTMLDivElement }>({});
  const scrolledRef = useRef(false);
  const dateRef = useRef(dayjs().format("YYYY-MM-DD"));

  useEffect(() => {
    if (searchParams.has("date")) {
      dateRef.current = searchParams.get("date")!;
    }

    daysStore.loadDays(dayjs(dateRef.current));
  }, []);

  useEffect(() => {
    if (refs.current[dateRef.current] && !scrolledRef.current) {
      refs.current[dateRef.current].scrollIntoView();
      scrolledRef.current = true;
    }
  });

  return (
    <div className="flex flex-col divide-y">
      <button onClick={daysStore.loadPreviousDays}>load prev</button>
      {daysStore.days.map((day, i) => (
        <DayCard key={i} day={day} dayIndex={i} refs={refs} />
      ))}
      <button onClick={daysStore.loadNextDays}>load prev</button>
    </div>
  );
}
