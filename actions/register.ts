"use server"

import { RegisterSchema } from "@/schema"
import { z } from "zod"
import bcrypt from 'bcryptjs'
import { db } from "@/lib/db"
import { error } from "console"
import { getUserByEmail } from "@/data/users"

export const register = async (values: z.infer<typeof RegisterSchema>) => {

  // additonal validaton because it can be easily bypassed in the frontend but not in the back end
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid Fields" }
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10)


  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: "Email already exists" }
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    }
  })
  return { success: "User Created" }
}

