"use server"

import { LoginSchema } from "@/schema"
import { z } from "zod"

export const login = async (values: z.infer<typeof LoginSchema>) => {

  // additonal validaton because it can be easily bypassed in the frontend but not in the back end
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields) {
    return { error: "Invalid Fields" }
  }

  return { success: "Email sent!" }
}

