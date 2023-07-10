import { NextAuthOptions, User } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import clientPromise from "./mongodb";
import { JWT } from "next-auth/jwt";


interface MyToken extends JWT {
  accessToken?: string;
}

export const authConfig: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      authorization: {
        params: {
          scope: 'openid https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
        }
      }
    }),
    GithubProvider({
      clientId: `${process.env.GITHUB_CLIENT_ID}`,
      clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
    }),
  ],
  pages: {
    newUser: "/register",
  },
  jwt:{},
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session ({ session, token }) {
      if (session?.user) {
        const myToken = token as MyToken;
        session.accessToken = myToken?.accessToken;
      }
      return session;
    },
}
};
