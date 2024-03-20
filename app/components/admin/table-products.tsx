'use client'
import React from 'react'
import type { ICategory, IProduct } from '@/interfaces/product'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Image,
  Chip
} from '@nextui-org/react'

import DropdownProductActions from './dropdown-product-actions'
import { getOptimizedImageUrl } from '@/lib/utils'

export default function TableProduct ({
  products,
  category
}: {
  products: IProduct[]
  category?: ICategory
}) {
  const filteredProducts = products.filter(
    product => product.category.id === category?.id
  )

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

  return (
    <Table
      shadow='none'
      border={1}
      className=' border-2 rounded-xl border-default-100'
      aria-label='Example table with custom cells'
    >
      <TableHeader columns={columns}>
        {column => <TableColumn key={column.id}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody
        emptyContent={'No hay productos aun.'}
        items={category != null ? filteredProducts : products}
      >
        {item => (
          <TableRow key={item.id}>
            {columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
