import DayList from "@/components/DayList";
import HomeHeader from "@/components/HomeHeader";
import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) redirect("/login");

  return (
    <>
      <HomeHeader />
      <div className="px-3 py-2">
        <DayList />
      </div>
    </>
  );
}
