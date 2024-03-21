'use client'
import React from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Pagination
} from '@nextui-org/react'

import type { IOrder } from '@/interfaces/order'
import { capitalize, formatDate } from '@/lib/utils'

export default function TableOrder ({ orders }: { orders: IOrder[] }) {
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
        return <Chip size='sm'>${order.total?.toFixed(2)}</Chip>
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

  const [page, setPage] = React.useState(1)
  const rowsPerPage = 5

  const pages = Math.ceil(orders.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return orders.slice(start, end)
  }, [page, orders])

  return (
    <Table
      shadow='none'
      border={1}
      bottomContent={
        <div className='flex w-full justify-center'>
          {/* <CustomPagination
            disableAnimation
            data={productsApiResponse}
            resultsPeerPage={resultsPeerPage}
          /> */}
          <Pagination
            isCompact
            showControls
            showShadow
            className=' text-white'
            // color='secondary'
            page={page}
            total={pages}
            onChange={page => {
              setPage(page)
            }}
          />
        </div>
      }
      className=' border-2 rounded-xl border-default-100 overflow-hidden'
      aria-label='Example table with custom cells'
    >
      <TableHeader columns={columns}>
        {column => <TableColumn key={column.id}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody emptyContent={'No hay productos aun.'} items={items}>
        {item => (
          <TableRow key={item.id}>
            {columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
