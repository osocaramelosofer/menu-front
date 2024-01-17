import { Pagination } from '@nextui-org/react'
import { useState, useEffect } from 'react'

export default async function CustomPagination ({
  initialData
}: {
  initialData?: any
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState(initialData)

  useEffect(() => {
    // Fetch new data when currentPage changes
    // and update `data` state accordingly
  }, [currentPage])

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    // Here you would typically make a new request to the backend
    // using the `newPage` value to calculate the offset
  }

  const parsePageFromUrl = (url: string) => {
    if (url.length === 0) return null

    const queryParams = new URLSearchParams(new URL(url).search)
    const offset = queryParams.get('offset')
    const limit = queryParams.get('limit')

    if (offset === null || limit === null) return null

    // Convert string to number and handle arithmetic operation
    const offsetNum = parseInt(offset, 10)
    const limitNum = parseInt(limit, 10)

    if (isNaN(offsetNum) || isNaN(limitNum)) return null

    return Math.floor(offsetNum / limitNum) + 1
  }

  const totalPages = Math.ceil(data.count / 5) // Assuming limit is 5
  const nextPage = parsePageFromUrl(data.next)
  const prevPage = parsePageFromUrl(data.previous)

  // Adjust current page in case of direct navigation
  useEffect(() => {
    if (nextPage != null) setCurrentPage(nextPage - 1)
    else if (prevPage != null) setCurrentPage(prevPage + 1)
  }, [data])

  return (
    <Pagination
      total={totalPages}
      color='secondary'
      page={currentPage}
      onChange={handlePageChange}
    />
  )
}
