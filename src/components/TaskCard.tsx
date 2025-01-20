import useDaysStore from "@/hooks/useDaysStore";
import { getDays } from "@prisma/client/sql";
import { LucideTrash2 } from "lucide-react";
import { deleteTask as deleteTaskServer } from "@/server";

export default function TaskCard({
  task,
  dayIndex,
  taskIndex,
}: {
  task: getDays.Result;
  dayIndex: number;
  taskIndex: number;
}) {
  const { deleteTask } = useDaysStore();

  const handleDeleteClick = async () => {
    await deleteTaskServer(task.id!);
    deleteTask(dayIndex, taskIndex);
  };

  return (
    <div className="flex items-center gap-3 py-1">
      <input type="checkbox" defaultChecked={task.done!} />
      <input type="text" defaultValue={task.name!} className="flex-1" />
      <button onClick={handleDeleteClick} className="text-gray-500">
        <LucideTrash2 size={18} />
      </button>
    </div>
  );
}
