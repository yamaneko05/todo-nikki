import { auth, signIn } from "@/utils/auth";
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
      <button
        onClick={handleClick}
        className="rounded bg-slate-800 px-4 py-2 font-bold text-white"
      >
        GitHubアカウントでログイン
      </button>
    </div>
  );
}
