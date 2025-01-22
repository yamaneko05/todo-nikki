import useDaysStore from "@/hooks/useDaysStore";
import { getDays } from "@prisma/client/sql";
import { LucideX } from "lucide-react";
import {
  deleteTask as deleteTaskServer,
  updateTask as updateTaskServer,
} from "@/server";
import Checkbox from "./Checkbox";

export default function TaskCard({
  task,
  dayIndex,
  taskIndex,
}: {
  task: getDays.Result;
  dayIndex: number;
  taskIndex: number;
}) {
  const { deleteTask, updateTask } = useDaysStore();

  const handleDeleteClick = async () => {
    await deleteTaskServer(task.id!);
    deleteTask(dayIndex, taskIndex);
  };

  const handleCheckboxChange = async () => {
    await updateTaskServer(task.id!, task.name!, !task.done, task.date!);
    updateTask(dayIndex, taskIndex, task.name!, !task.done, task.date!);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTask(dayIndex, taskIndex, e.target.value, task.done!, task.date!);
  };

  const handleInputBlur = async () => {
    await updateTaskServer(task.id!, task.name!, task.done!, task.date!);
  };

  return (
    <div className="group flex items-center gap-3 border-y border-transparent py-2 has-[:focus]:border-gray-300">
      <button onClick={handleCheckboxChange} className="peer">
        <Checkbox checked={task.done!} />
      </button>
      <input
        type="text"
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        value={task.name!}
        className={`peer flex-1 outline-none ${task.done && "text-gray-500 line-through"}`}
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
