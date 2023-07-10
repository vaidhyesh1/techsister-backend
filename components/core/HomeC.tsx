import Navbar from "@/components/core/Navbar";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import SuccessStories from "./SuccessStories";

export default async function HomeC() {
  const session = await getServerSession(authConfig);

  return (
    <main className="h-screen mx-auto max-w-7xl">
      <Navbar image={session?.user?.image as string} />
      <div className="p-5">
        {/* <h1>Home</h1>
        <p>{session?.user?.name}</p> */}
        <SuccessStories apiEndpoint="/api/successStories" />
      </div>
    </main>
  );
}
