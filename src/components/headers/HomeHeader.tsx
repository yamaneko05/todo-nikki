import { LucideCalendarDays, LucideSettings } from "lucide-react";
import Link from "next/link";

export default function HomeHeader() {
  return (
    <div className="sticky top-0 flex h-14 items-center justify-between border-b bg-white px-3">
      <div className="text-xl font-bold">Todo日記</div>
      <div className="flex gap-4">
        <Link href="/setting">
          <LucideSettings />
        </Link>
        <Link href="/calendar">
          <LucideCalendarDays />
        </Link>
      </div>
    </div>
  );
}
