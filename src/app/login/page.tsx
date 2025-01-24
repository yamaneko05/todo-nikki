import { auth, signIn } from "@/utils/auth";
import { LucideGithub } from "lucide-react";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session) redirect("/");

  const handleClick = async () => {
    "use server";
    await signIn("github");
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="">
        <div className="text-center text-2xl font-bold">Todo日記</div>
        <button
          onClick={handleClick}
          className="mt-8 flex items-center gap-3 rounded bg-slate-800 px-4 py-2 font-bold text-white"
        >
          <LucideGithub />
          GitHubアカウントでログイン
        </button>
      </div>
    </div>
  );
}
