'use client'
import React from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  Chip,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@nextui-org/react'
import useSWR from 'swr'
import { BASE_URL, getOptimizedImageUrl, truncateString } from '@/lib/utils'

import type { IProduct } from '@/interfaces/product'
import AddProductCategoryButton from './add-product-category-button'
import DropdownProductActions from './dropdown-product-actions'

// Define a type for the fetcher function's arguments.
type FetcherArgs = [input: RequestInfo, init?: RequestInit]

const fetcher = async (...args: FetcherArgs) =>
  await fetch(...args).then(async res => await res.json())
export default function ProductsTablePaginated ({
  storeId
}: {
  storeId: number | string
}) {
  const [page, setPage] = React.useState(1)
  const rowsPerPage = 7

  const url = `${BASE_URL}/products?store=${storeId}&page=${page}&resultsPerPage=${rowsPerPage}`

  const { data, isLoading, error } = useSWR(url, fetcher, {
    keepPreviousData: true
  })

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const pages = data?.count ? Math.ceil(data.count / rowsPerPage) : 0

  const loadingState = isLoading
    ? 'loading'
    : data?.results.length === 0
      ? 'idle'
      : 'idle'

  const renderCell = React.useCallback((product: IProduct, columnKey: any) => {
    const image = getOptimizedImageUrl(product.image, 80)
    switch (columnKey) {
      case 'product':
        return (
          <div className='flex gap-2'>
            <Image
              width={300}
              height={300}
              className=' object-cover max-w-[2.5rem] md:max-w-[4.5rem] rounded-md md:min-w-full aspect-square'
              src={image}
              alt='Dulce Trago Product Image'
            />
            <div>
              <h2 className=' line-clamp-1 font-semibold md:text-lg'>
                {product.name}
              </h2>
              <p className=' line-clamp-1 text-tiny opacity-80 md:text-base'>
                {product.description}
              </p>
            </div>
          </div>
        )
      case 'category':
        return (
          <Popover shouldBlockScroll color='warning' placement='right'>
            <PopoverTrigger>
              <Chip size='sm'>{truncateString(product.category.name, 7)}</Chip>
            </PopoverTrigger>
            <PopoverContent>
              <h1 className='text-small font-medium'>
                {product.category.name}
              </h1>
            </PopoverContent>
          </Popover>
        )
      case 'actions':
        return (
          <div className='relative flex items-center justify-end gap-2'>
            <DropdownProductActions product={product} />
          </div>
        )

      default:
        return null
    }
  }, [])

  const columns = [
    { name: 'PRODUCTO', id: 'product' },
    { name: 'CATEGORÍA', id: 'category' },
    { name: 'ACTIONS', id: 'actions' }
  ]

  return (
    <section className=' flex flex-col gap-4 relative'>
      <div className=' flex justify-between items-end w-full'>
        <h2 className='font-semibold text-lg'>Productos ({data?.count})</h2>
        <AddProductCategoryButton label='Nuevo Producto' />
      </div>
      <Table
        aria-label='Products table with client async pagination'
        bottomContent={
          pages > 0 && (
            <div className='flex w-full justify-center'>
              <Pagination
                isCompact
                showControls
                className=' text-white'
                showShadow
                color='primary'
                page={page}
                total={pages}
                onChange={page => {
                  setPage(page)
                }}
              />
            </div>
          )
        }
      >
        <TableHeader columns={columns}>
          {column => <TableColumn key={column.id}>{column.name}</TableColumn>}
        </TableHeader>
        <TableBody
          emptyContent={'No hay productos aún.'}
          items={data?.results ?? []}
          loadingContent={<Spinner size='lg' color='warning' />}
          loadingState={loadingState}
        >
          {(item: IProduct) => (
            <TableRow key={item.id}>
              {columnKey => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  )
}
