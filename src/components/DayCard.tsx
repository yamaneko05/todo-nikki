"use client";

import { Day } from "@/hooks/useDaysStore";
import dayjs from "@/utils/dayjs";
import TaskCard from "./TaskCard";
import CreateTaskButton from "./CreateTaskButton";
import DiaryCard from "./DiaryCard";
import CreateDiaryButton from "./CreateDiaryButton";

export default function DayCard({
  day,
  dayIndex,
}: {
  day: Day;
  dayIndex: number;
}) {
  return (
    <div className="rounded px-3 py-2 shadow">
      <div className="font-bold text-gray-500">
        {dayjs(day.date).format("M/D (ddd)")}
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
