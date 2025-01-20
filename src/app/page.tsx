import { auth, signOut } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) redirect("/login");

  const handleClick = async () => {
    "use server";
    await signOut();
  };

  return <button onClick={handleClick}>ログアウト</button>;
}
