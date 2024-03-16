'use client'

import type { ICategory, IProduct } from '@/interfaces/product'

import { Accordion, AccordionItem, Chip, ScrollShadow } from '@nextui-org/react'
import TableProduct from './table-products'

export default function AdminAccordionProducts ({
  products,
  category
}: {
  products: IProduct[]
  category: ICategory
}) {
  return (
    <Accordion>
      <AccordionItem
        key={category.id}
        textValue={category.name}
        subtitle={category.description}
        title={
          <div className=' flex items-center justify-between w-full'>
            <h2 className='font-medium'>{category.name}</h2>
            <Chip size='sm' color='warning' variant='flat'>
              <strong>
                {
                  products.filter(
                    product => product.category.id === category.id
                  ).length
                }
              </strong>{' '}
              productos
            </Chip>
          </div>
        }
      >
        <ScrollShadow
          size={20}
          orientation='horizontal'
          className='flex gap-4 pb-5'
        >
          <TableProduct category={category} products={products} />
        </ScrollShadow>
      </AccordionItem>
    </Accordion>
  )
}
