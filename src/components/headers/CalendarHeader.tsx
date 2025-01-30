import { LucideChevronLeft } from "lucide-react";
import Link from "next/link";

export default function CalendarHeader() {
  return (
    <div className="sticky top-0 flex h-14 items-center gap-2 border-b bg-white px-3">
      <Link href="/">
        <LucideChevronLeft />
      </Link>
      <div className="font-bold">カレンダー</div>
    </div>
  );
}
