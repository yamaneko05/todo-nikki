import * as server from "@/server";
import { LucidePlus } from "lucide-react";

export default function CreateDiaryButton({ date }: { date: Date }) {
  const handleButtonClick = async () => {
    await server.createDiary(date);
  };

  return (
    <button
      onClick={handleButtonClick}
      className="flex w-full items-center gap-3 rounded bg-indigo-50 px-3 py-2 text-gray-500 shadow"
    >
      <LucidePlus size={18} />
      <div className="text-sm">日記を作成</div>
    </button>
  );
}
