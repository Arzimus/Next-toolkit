import NextAuth from 'next-auth'
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from './auth.config'
import { db } from './lib/db'

// these signIn and signOut are only accessible from the server components
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  callbacks: {
    jwt({ token, user }) {
      // if(user) token.role = user.role
      return token
    },
    session({ session, token }) {
      // session.user.role = token.role
      return session
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig
}) 