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
      <div className="font-bold">{dayjs(day.date).calendar()}</div>
      <div className="flex flex-col">
        {day.tasks.map((task, i) => (
          <TaskCard
            key={task.id}
            task={task}
            dayIndex={dayIndex}
            taskIndex={i}
          />
        ))}
        <CreateTaskButton date={day.date} dayIndex={dayIndex} />
      </div>
    </div>
  );
}
