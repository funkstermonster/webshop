import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { PrismaClient, User } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
const prisma = new PrismaClient();

const handler = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "credentials",
      id: "credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        console.log(credentials);

        try {
          const user = await prisma?.user.findUnique({
            where: {
              email: credentials?.email,
            },
          });
          if (
            user &&
            credentials &&
            //credentials.password == user.password
            (await compare(credentials.password, user.password))
          ) {
            console.log("asd", user);

            return user;
          } else {
            console.log("user not found / incorrect password");

            return null;
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
   async jwt({ token, user }) {
      if(user) token.role = user.role
      return token
    },
    async session({ session, token }) {
     if(session?.user)  
      session.user.role = token.role
      return session
    }
  }
});

export { handler as GET, handler as POST };
