'use client'

import qs from 'query-string'
import { Pagination } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { IApiResponse } from '@/interfaces/product'

export default function CustomPagination ({
  data,
  resultsPeerPage
}: {
  data: IApiResponse
  resultsPeerPage: number
}) {
  const router = useRouter()
  const params = useSearchParams()
  const pathname = usePathname()
  const pageParam = params.get('page')
  const currentPage = pageParam !== null ? Number(pageParam) : 1

  const updateURL = (newOffset: number, newPage: number) => {
    // Preserve existing query parameters
    const currentQueryParams = Object.fromEntries(params.entries())
    const updatedQuery = {
      ...currentQueryParams,
      offset: newOffset.toString(),
      page: newPage.toString(),
      resultsPeerPage: resultsPeerPage.toString()
    }

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: updatedQuery
      },
      { skipNull: true, skipEmptyString: true }
    )
    router.push(url, { scroll: false })
    setTimeout(() => {
      window.scrollTo({
        top: 500,
        behavior: 'smooth'
      })
    }, 200)
  }

  // const handlePrevNext = (direction: string) => {
  //   const itemsPerPage = 3 // Assuming 3 items per page
  //   const offset = (currentPage - 1) * itemsPerPage // Calculate current offset
  //   const newPage =
  //     direction === 'next' ? currentPage + 1 : Math.max(1, currentPage - 1)
  //   updateURL(
  //     offset + (direction === 'next' ? itemsPerPage : -itemsPerPage),
  //     newPage
  //   )
  // }

  const handlePageChange = (selectedPage: number) => {
    const newOffset = (selectedPage - 1) * resultsPeerPage

    updateURL(newOffset, selectedPage)
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
