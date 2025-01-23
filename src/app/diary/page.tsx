import DiaryCard from "@/components/DiaryCard";
import { prisma } from "@/utils/prisma";

export default async function DiaryListPage() {
  const diaries = await prisma.diary.findMany();

  return (
    <div className="flex flex-col gap-3">
      {diaries.map((diary) => (
        <DiaryCard key={diary.id} diary={diary} />
      ))}
    </div>
  );
}
