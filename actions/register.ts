"use server"

import { RegisterSchema } from "@/schema"
import { z } from "zod"

export const register = async (values: z.infer<typeof RegisterSchema>) => {

  // additonal validaton because it can be easily bypassed in the frontend but not in the back end
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields) {
    return { error: "Invalid Fields" }
  }

  return { success: "Email sent!" }
}

