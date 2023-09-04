import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { executeQueries } from '@/middlewares/db';
import { isValidPassword } from '@/middlewares/password';

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    jwt({ user, token }) {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { type: "text" },
        password: { type: "password" }
      },
      async authorize(credentials, req) {
        return executeQueries<any>(async (prisma) => {
          const user = await prisma.user.findFirst({
            where: { email: credentials?.email }
          });
          
          return user && isValidPassword(credentials?.password, user.password) ? {
            ...user, id: user.id.toString()
          } : null;
        });
      },
    })
  ]
};

export default NextAuth(authOptions);
