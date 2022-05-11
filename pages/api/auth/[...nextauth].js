import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/data/mongoAdapter";
import { admins } from "@/config/admins";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
        clientId: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        authorization: { params: { scope: 'identify' } },
    })
  ],
  // A database is optional, but required to persist accounts in a database
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'database',
  },
  pages: {
    signIn: "/login", 
  },
  secret: process.env.AUTH_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET
  },
  callbacks: {
    session({ session, token, user }) {
      admins.includes(user.email) ? session.user.admin = true : session.user.admin = false;
      const id = user.image.split("/")[4];
      session.user.id = id;
      return session
    }
  }
});
