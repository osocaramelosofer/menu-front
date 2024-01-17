'use client'
import { SessionProvider } from 'next-auth/react'
import React, { type ReactNode } from 'react'

interface Props {
  children: ReactNode
  session: any
}
function Provider ({ children, session }: Props) {
  return <SessionProvider>{children}</SessionProvider>
}

export default Provider
