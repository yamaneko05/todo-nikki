"use client";

import { Day } from "@/hooks/useDaysStore";
import dayjs from "@/utils/dayjs";
import TaskCard from "./TaskCard";

export default function DayCard({ day }: { day: Day }) {
  return (
    <div className="">
      <div className="font-bold">{dayjs(day.date).calendar()}</div>
      <div className="flex flex-col">
        {day.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
