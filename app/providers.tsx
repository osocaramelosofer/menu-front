'use client'
import { NextUIProvider } from '@nextui-org/react'
import { type ReactNode } from 'react'
import ThemeContextProvider from './context/theme-context'
import { SessionProvider } from 'next-auth/react'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export function Providers ({
  children,
  session
}: {
  children: ReactNode
  session: any
}) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <SessionProvider session={session}>
        <ThemeContextProvider>
          <NextUIProvider>{children}</NextUIProvider>
        </ThemeContextProvider>
      </SessionProvider>
    </QueryClientProvider>
  )
}
