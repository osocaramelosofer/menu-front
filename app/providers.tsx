'use client'
import { NextUIProvider } from '@nextui-org/react'
import { useEffect, type ReactNode } from 'react'
import ThemeContextProvider from './context/theme-context'
import { SessionProvider } from 'next-auth/react'
import useSWR, { SWRConfig, mutate } from 'swr'

export function Providers ({
  children,
  session
}: {
  children: ReactNode
  session: any
}) {
  type FetcherArgs = [input: RequestInfo, init?: RequestInit]
  const fetcher = async (...args: FetcherArgs) =>
    await fetch(...args).then(async res => await res.json())
  return (
    <SWRConfig value={{ fetcher, suspense: true, use: [trackLiveQueries] }}>
      <SessionProvider session={session}>
        <ThemeContextProvider>
          <NextUIProvider>{children}</NextUIProvider>
        </ThemeContextProvider>
      </SessionProvider>
    </SWRConfig>
  )
}
const liveQueries = new Set()

function trackLiveQueries (useSWRNext: any) {
  return (key: any, fetcher: any, config: any) => {
    const swr = useSWRNext(key, fetcher, config)

    console.log(liveQueries)

    useEffect(() => {
      liveQueries.add(key)

      return () => {
        liveQueries.delete(key)
      }
    }, [key])

    return swr
  }
}

export async function revalidateLiveQueries () {
  const promises = [...liveQueries.values()].map(async key => await mutate(key))

  return await Promise.all(promises)
}
