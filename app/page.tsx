import HomeC from "@/components/core/HomeC";
import { Signin } from "@/components/core/Signin";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authConfig);

  return <main>{session ? <HomeC /> : <Signin />}</main>;
}
