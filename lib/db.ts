import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined
}

const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalThis.prisma = db


// reason for including the globalthis.prisma method is because of the 
// hot reload in the nextjs which on every reload create a new prisma client object
// which can get u errors so we just stotre it in the globalthis.prisma and wont create 
// a new obj if the site is reloaded