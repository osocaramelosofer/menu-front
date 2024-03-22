'use client'
import React, { useMemo } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  getKeyValue,
  Chip
} from '@nextui-org/react'
import useSWR from 'swr'
import { BASE_URL, capitalize, formatDate } from '@/lib/utils'
import type { IOrder } from '@/interfaces/order'

// Define a type for the fetcher function's arguments.
type FetcherArgs = [input: RequestInfo, init?: RequestInit]

const fetcher = async (...args: FetcherArgs) =>
  await fetch(...args).then(async res => await res.json())

export default function OrdersTablePaginated ({
  storeId
}: {
  storeId: number | string
}) {
  const [page, setPage] = React.useState(1)
  const rowsPerPage = 10

  const { data, isLoading } = useSWR(
    `${BASE_URL}/orders?store=${storeId}&page=${page}&resultsPerPage=${rowsPerPage}`,
    fetcher,
    {
      keepPreviousData: true
    }
  )

  const pages = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    return data?.count ? Math.ceil(data.count / rowsPerPage) : 0
  }, [data?.count, rowsPerPage])

  const loadingState =
    isLoading
      ? 'loading'
      : data?.results.length === 0
        ? 'idle'
        : 'idle'

  const renderCell = React.useCallback((order: IOrder, columnKey: any) => {
    switch (columnKey) {
      case 'createdAt':
        return (
          <div className='flex gap-2'>
            <p className=' line-clamp-1 text-tiny opacity-80 md:text-base'>
              {capitalize(formatDate(order.createdAt))}
            </p>
          </div>
        )
      case 'total':
        return (
          <Chip color='success' variant='flat' size='sm'>
            ${order.total?.toFixed(2)}
          </Chip>
        )
      case 'paymentType':
        return (
          <div className='relative flex items-center justify-end gap-2'>
            {/* <DropdownProductActions product={product} /> */}
            <Chip size='sm'>{order.paymentType}</Chip>
          </div>
        )

      default:
        return null
    }
  }, [])

  const columns = [
    { name: 'FECHA', id: 'createdAt' },
    { name: 'TOTAL', id: 'total' },
    { name: 'PAGO', id: 'paymentType' }
  ]

  return (
    <section className=' flex flex-col gap-4 relative'>
      <h2 className='font-semibold text-lg'>Ordenes ({data?.count})</h2>
      <Table
        aria-label='Example table with client async pagination'
        bottomContent={
          // eslint-disable-next-line multiline-ternary
          pages > 0 ? (
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
          ) : null
        }
        //   {...args}
      >
        <TableHeader columns={columns}>
          {column => <TableColumn key={column.id}>{column.name}</TableColumn>}
        </TableHeader>
        <TableBody
          emptyContent={'No hay ordenes aun.'}
          items={data?.results ?? []}
          loadingContent={<Spinner size='lg' color='warning' />}
          loadingState={loadingState}
        >
          {(item: IOrder) => (
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
