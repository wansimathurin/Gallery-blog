import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

 const handler = NextAuth ({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      idToken: true,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        }
      }
    }),
    // ...add more providers here
  ],
})

export {handler as GET, handler as POST}