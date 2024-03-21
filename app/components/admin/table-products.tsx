'use client'
import React from 'react'
import type { IApiResponse, IProduct } from '@/interfaces/product'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Image,
  Chip,
  Pagination
} from '@nextui-org/react'

import DropdownProductActions from './dropdown-product-actions'
import { getOptimizedImageUrl } from '@/lib/utils'

export default function TableProduct ({
  products,
  productsApiResponse,
  resultsPeerPage
}: {
  products: IProduct[]
  productsApiResponse: IApiResponse
  resultsPeerPage: number
}) {
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
        return <Chip size='sm'>{product.category.name}</Chip>
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

  const [page, setPage] = React.useState(1)
  const rowsPerPage = 2

  const pages = Math.ceil(products.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return products.slice(start, end)
  }, [page, products])

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
