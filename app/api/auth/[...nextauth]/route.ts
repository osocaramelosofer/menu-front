import { BASE_URL } from '@/lib/utils'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'string' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize (credentials, req) {
        try {
          const res = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password
            }),
            headers: { 'Content-Type': 'application/json' }
          })

          if (!res.ok) {
            // credentials are invalid
            return null
          }

          const parsedResponse = await res.json()

          // accessing the jwt returned by server
          const jwt = parsedResponse.token
          const user = parsedResponse.user
          return user
        } catch (e) {
          return null
        }
      }
    })
  ],

  callbacks: {
    async jwt ({ token, user }: any) {
      // Si 'user' está definido, entonces es el objeto usuario retornado desde el provider
      if (user) {
        token.user = user
      }
      return token
    },
    async session ({ session, token }: any) {
      session.user = token.user

      return session
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
