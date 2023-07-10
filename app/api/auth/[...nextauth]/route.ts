import { authConfig } from "@/lib/auth";
import NextAuth from "next-auth/next";

const handler = NextAuth(authConfig);
export const dynamic = 'force-dynamic';

export { handler as GET, handler as POST };
