import useDaysStore from "@/hooks/useDaysStore";
import { LucideX } from "lucide-react";
import * as server from "@/server";
import Checkbox from "./Checkbox";
import { Task } from "@prisma/client";

export default function TaskCard({
  task,
  dayIndex,
  taskIndex,
}: {
  task: Task;
  dayIndex: number;
  taskIndex: number;
}) {
  const daysStore = useDaysStore();

  const handleDeleteClick = async () => {
    daysStore.deleteTask(dayIndex, taskIndex);
    await server.deleteTask(task.id!);
  };

  const handleCheckboxChange = async () => {
    daysStore.updateTaskDone(dayIndex, taskIndex, !task.done);
    await server.updateTaskDone(task.id!, !task.done);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    daysStore.updateTaskName(dayIndex, taskIndex, e.target.value);
  };

  const handleInputBlur = async () => {
    await server.updateTaskName(task.id!, task.name!);
  };

  return (
    <div className="group flex items-center gap-3 border-y border-transparent py-1.5 has-[:focus]:border-gray-300">
      <button onClick={handleCheckboxChange} className="peer">
        <Checkbox checked={task.done!} />
      </button>
      <input
        type="text"
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        value={task.name!}
        className={`peer flex-1 bg-transparent outline-none ${task.done && "text-gray-500 line-through"}`}
      />
      <button
        onClick={handleDeleteClick}
        className="hidden text-gray-500 focus:block group-hover:block peer-focus:block"
      >
        <LucideX size={18} />
      </button>
    </div>
  );
}
