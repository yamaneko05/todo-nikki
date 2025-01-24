import { LucideChevronLeft } from "lucide-react";
import Link from "next/link";

export default function SettingHeader() {
  return (
    <div className="sticky top-0 flex h-14 items-center gap-3 border-b bg-white px-3">
      <Link href="/">
        <LucideChevronLeft />
      </Link>
      <div className="text-xl font-bold">設定</div>
    </div>
  );
}
