import { Diary } from "@prisma/client";
import Link from "next/link";

export default function DiaryCard({ diary }: { diary: Diary }) {
  return (
    <Link
      href={`/diary/${diary.id}`}
      className="block rounded bg-indigo-200 px-3 py-2"
    >
      <div className="font-bold">{diary.title}</div>
      <div className="line-clamp-3 text-sm">{diary.content}</div>
    </Link>
  );
}
