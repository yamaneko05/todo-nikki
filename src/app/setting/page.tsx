import SettingHeader from "@/components/headers/SettingHeader";
import { auth, signOut } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function SettingPage() {
  const session = await auth();

  if (!session) redirect("/login");

  const handleClick = async () => {
    "use server";
    await signOut();
  };

  return (
    <>
      <SettingHeader />
      <div className="px-3 py-2">
        <button onClick={handleClick} className="w-full py-2 text-left">
          ログアウト
        </button>
      </div>
    </>
  );
}
