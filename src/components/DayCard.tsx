"use client";

import { Day } from "@/hooks/useDaysStore";
import dayjs from "@/utils/dayjs";
import TaskCard from "./TaskCard";
import CreateTaskButton from "./CreateTaskButton";
import DiaryCard from "./DiaryCard";
import CreateDiaryButton from "./CreateDiaryButton";
import { useEffect, useRef } from "react";

const getDiffLabel = (diff: number) => {
  switch (diff) {
    case -1:
      return "昨日";
    case 0:
      return "今日";
    case 1:
      return "明日";
    case 2:
      return "明後日";
    default:
      return null;
  }
};

export default function DayCard({
  day,
  dayIndex,
}: {
  day: Day;
  dayIndex: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const diff = Math.round(dayjs(day.date).diff(new Date(), "day", true));
  const label = getDiffLabel(diff);

  useEffect(() => {
    if (diff === 0 && containerRef.current) {
      containerRef.current.scrollIntoView();
    }
  }, [diff]);

  return (
    <div ref={containerRef} className="scroll-m-14 p-3 pt-2">
      <div className="mt-1 flex gap-2 font-bold">
        {label && <div>{label}</div>}
        <div className="text-gray-500">
          {dayjs(day.date).format("M/D (ddd)")}
        </div>
      </div>
      <div className="mt-1">
        {day.diary ? (
          <DiaryCard diary={day.diary} />
        ) : (
          <CreateDiaryButton date={day.date} />
        )}
      </div>
      <div className="mt-1 flex flex-col">
        {day.tasks.map((task, i) => (
          <TaskCard
            key={task.id}
            task={task}
            dayIndex={dayIndex}
            taskIndex={i}
          />
        ))}
        <div className="mt-1">
          <CreateTaskButton date={day.date} dayIndex={dayIndex} />
        </div>
      </div>
    </div>
  );
}
