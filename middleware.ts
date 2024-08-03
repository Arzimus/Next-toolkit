
import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "./routes"
import { NextResponse } from "next/server"

const { auth } = NextAuth(authConfig)

export default auth((req): any => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth;
  console.log(nextUrl)

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  console.log(nextUrl.pathname)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)

  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    console.log("here1")
    return null;
  }

  if (isAuthRoute) {
    console.log("here21")
    if (isLoggedIn) {
      console.log("here22")
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    console.log("here")
    return Response.redirect(new URL("/auth/login", nextUrl))
  }

  return null;
})

export const config = {

  // what matcher does is all routes inside it triggers the auth middleware function above
  matcher: [

    // Skip Next.js internals and all static files, unless found in search params

    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',

    // Always run for API routes

    '/(api|trpc)(.*)',

  ],
}

// middleware has an edge runtime


