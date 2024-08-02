
// Therefore, to use a database adapter that isn’t explicitly “edge compatible”, we will need to
//  find a way to query the database using the features that we do have available to us.

import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [GitHub],
} satisfies NextAuthConfig