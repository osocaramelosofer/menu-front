'use client'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import qs from 'query-string'

export default function useUrl () {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const currentPage = Number(searchParams.get('page')) ?? 1
  const currentOffset = searchParams.get('offset') ?? '1'

  function onChangePagination (newPage: number) {
    const newOffset = (newPage - 1) * 2 // limit
    const currentSearchParams = Object.fromEntries(searchParams.entries())
    const newSearchParams = {
      ...currentSearchParams,
      offset: newOffset.toString(),
      page: newPage.toString()

    }
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: newSearchParams
      },
      { skipNull: true, skipEmptyString: true }
    )
    router.push(url)
  }

  return {
    onChangePagination,
    currentPage
  }
}
