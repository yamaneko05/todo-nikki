import dayjs from "@/utils/dayjs";
import { Diary } from "@prisma/client";
import { LucideChevronLeft } from "lucide-react";
import Link from "next/link";

export default function DiaryHeader({ diary }: { diary: Diary }) {
  return (
    <div className="sticky top-0 flex h-14 items-center gap-2 border-b bg-white px-3">
      <Link
        href={{
          pathname: "/",
          query: { date: dayjs(diary.date).format("YYYY-MM-DD") },
        }}
      >
        <LucideChevronLeft />
      </Link>
      <div className="font-bold">日記を編集</div>
    </div>
  );
}
