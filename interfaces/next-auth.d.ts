// import NextAuth from 'next-auth'

// declare module 'next-auth' {
//   interface Session {
//     user: {
//       id: number
//       storeId: number
//       [key: string]: string
//     }
//   }
// }

import { type DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: number
      storeId?: number
    } & DefaultSession['user']
  }
}
