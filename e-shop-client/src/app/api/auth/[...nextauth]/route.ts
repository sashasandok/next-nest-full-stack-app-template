import { apiUrl } from '@/constants'
import { NextAuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function refreshToken(token: any): Promise<JWT> {
  const res = await fetch(apiUrl + '/auth/refresh', {
    method: 'POST',
    headers: {
      authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  })
  console.log('refreshed')

  const response = await res.json()

  return {
    ...token,
    backendTokens: response,
  }
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'jsmith',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const { email, password } = credentials
        const res = await fetch(apiUrl + '/auth/login', {
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (res.status == 401) {
          console.log(res.statusText)

          return null
        }
        const user = await res.json()
        return user
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user }

      if (new Date().getTime() < token.backendTokens.expiresIn) return token

      return await refreshToken(token)
    },

    async session({ token, session }) {
      session.user = token.user
      session.backendTokens = token.backendTokens

      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
