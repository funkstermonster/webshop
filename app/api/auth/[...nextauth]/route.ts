import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              email: { },
              password: { },
              confirmPassword: { }
            },
            async authorize(credentials) {
                const user = await prisma?.user.findUnique({
                  where: {
                    email: credentials?.email
                  }
                });
                
                if (!user || user.password !== credentials?.password) {
                  // User not found or password incorrect
                  return null;
                }
        
                return user;
              }
            })
          ]
        });

  export { handler as GET, handler as POST }