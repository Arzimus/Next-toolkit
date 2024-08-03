"use server"

import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginSchema } from "@/schema"

import { z } from "zod"
import { AuthError } from 'next-auth'
import { signIn } from "@/auth"

export const login = async (values: z.infer<typeof LoginSchema>) => {

  // additonal validaton because it can be easily bypassed in the frontend but not in the back end
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid Fields" }
  }

  const { email, password } = validatedFields.data

  try {
    console.log("login")
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" }
        default:
          return { error: "Something went wrong" }
      }
    }
    throw error
  }
}

