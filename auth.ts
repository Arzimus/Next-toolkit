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
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig
})