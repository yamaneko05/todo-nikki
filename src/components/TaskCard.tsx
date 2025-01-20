import { getDays } from "@prisma/client/sql";
import { LucideTrash2 } from "lucide-react";

export default function TaskCard({ task }: { task: getDays.Result }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <input type="checkbox" defaultChecked={task.done!} />
      <input type="text" defaultValue={task.name!} className="flex-1" />
      <button className="text-gray-500">
        <LucideTrash2 size={18} />
      </button>
    </div>
  );
}
