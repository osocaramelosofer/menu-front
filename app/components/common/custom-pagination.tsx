'use client'

import qs from 'query-string'
import { Pagination } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { IApiResponse } from '@/interfaces/product'
import type { IApiOrderResponse } from '@/interfaces/order'

export default function CustomPagination ({
  data,
  resultsPeerPage,
  disableAnimation
}: {
  data: IApiResponse | IApiOrderResponse
  resultsPeerPage: number
  disableAnimation?: boolean
}) {
  const router = useRouter()
  const params = useSearchParams()
  const pathname = usePathname()
  const pageParam = params.get('page')
  const currentPage = pageParam !== null ? Number(pageParam) : 1

  const updateURL = (newPage: number) => {
    // Preserve existing query parameters
    const currentQueryParams = Object.fromEntries(params.entries())
    const updatedQuery = {
      ...currentQueryParams,
      page: newPage.toString()
    }

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: updatedQuery
      },
      { skipNull: true, skipEmptyString: true }
    )
    router.push(url, { scroll: false })

    if (disableAnimation === false) {
      setTimeout(() => {
        window.scrollTo({
          top: 500,
          behavior: 'smooth'
        })
      }, 200)
    }
  }

  const handlePageChange = (selectedPage: number) => {
    updateURL(selectedPage)
  }

  return (
    <Pagination
      size='sm'
      isCompact
      showControls
      total={Math.ceil(data.count / resultsPeerPage)}
      color='primary'
      className=' text-white'
      page={currentPage}
      onChange={page => {
        handlePageChange(page)
      }}
    />
  )
}
