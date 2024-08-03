
// Therefore, to use a database adapter that isn’t explicitly “edge compatible”, we will need to
//  find a way to query the database using the features that we do have available to us.


import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getUserByEmail } from "./data/users"
import { LoginSchema } from "./schema"
import bcrypt from 'bcryptjs'

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email)

          if (!user || !user.password) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(
            password,
            user.password
          )

          if (passwordMatch) return user;
        }
        return null;
      }
    })
  ],
} satisfies NextAuthConfig