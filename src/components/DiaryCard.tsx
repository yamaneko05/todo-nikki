import { Diary } from "@prisma/client";
import Link from "next/link";

export default function DiaryCard({ diary }: { diary: Diary }) {
  return (
    <Link href={`/diary/${diary.id}`} className="rounded p-2 shadow">
      <div className="text-sm font-bold">{diary.title}</div>
      <div className="line-clamp-3 text-xs">{diary.content}</div>
    </Link>
  );
}
