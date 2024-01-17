'use client'
import { NextUIProvider } from '@nextui-org/react'
import { type ReactNode } from 'react'
import ThemeContextProvider from './context/theme-context'
import { SessionProvider } from 'next-auth/react'

export function Providers ({
  children,
  session
}: {
  children: ReactNode
  session: any
}) {
  return (
    <SessionProvider session={session}>
      <ThemeContextProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </ThemeContextProvider>
    </SessionProvider>
  )
}
