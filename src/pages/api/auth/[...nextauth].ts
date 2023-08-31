import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { executeQueries } from '@/middlewares/db';
import { isValidPassword } from '@/middlewares/password';

export default NextAuth({
  session: {
    strategy: 'jwt'
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
});
