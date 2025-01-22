"use client";

import { Day } from "@/hooks/useDaysStore";
import dayjs from "@/utils/dayjs";
import TaskCard from "./TaskCard";
import CreateTaskButton from "./CreateTaskButton";

export default function DayCard({
  day,
  dayIndex,
}: {
  day: Day;
  dayIndex: number;
}) {
  return (
    <div className="">
      <div className="bg-gray-50 font-bold">{dayjs(day.date).calendar()}</div>
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
