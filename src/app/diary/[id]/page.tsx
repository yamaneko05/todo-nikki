import DiaryEdit from "@/components/DiaryEdit";
import DiaryHeader from "@/components/headers/DiaryHeader";
import { prisma } from "@/utils/prisma";
import { notFound } from "next/navigation";

export default async function DiaryEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const diary = await prisma.diary.findUnique({ where: { id: id } });

  if (!diary) notFound();

  return (
    <>
      <DiaryHeader diary={diary} />
      <div className="px-3 py-2">
        <DiaryEdit diary={diary} />
      </div>
    </>
  );
}
