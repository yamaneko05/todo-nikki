import useDaysStore from "@/hooks/useDaysStore";
import { createTask as createTaskServer } from "@/server";
import { LucidePlus } from "lucide-react";

export default function CreateTaskButton({
  date,
  dayIndex,
}: {
  date: Date;
  dayIndex: number;
}) {
  const { createTask } = useDaysStore();

  const handleClick = async () => {
    const task = await createTaskServer(date);
    createTask(dayIndex, task);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-3 py-1 text-gray-500"
    >
      <LucidePlus size={18} />
      <div className="text-sm font-bold">タスクを作成</div>
    </button>
  );
}
