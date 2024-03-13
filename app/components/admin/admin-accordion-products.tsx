'use client'
import AdminProductCard from '@/app/components/admin/admin-product-card'

import type { Category, IProduct } from '@/interfaces/product'

import {
  Accordion,
  AccordionItem,
  Badge,
  Chip,
  ScrollShadow,
  Spacer
} from '@nextui-org/react'

export default function AdminAccordionProducts ({
  products,
  category
}: {
  products: IProduct[]
  category: Category
}) {
  return (
    <Accordion isCompact variant='bordered'>
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
              </strong>
              productos
            </Chip>
          </div>
        }
      >
        <ScrollShadow
          size={20}
          orientation='horizontal'
          className='flex overflow-x-auto gap-4 pb-5'
        >
          {products
            .filter(product => product.category.id === category.id) // Filtramos los productos por categoría.
            .reverse()
            .map((product, index) => (
              <AdminProductCard
                key={`${product.id}${index}`}
                product={product}
              />
            ))}
        </ScrollShadow>
      </AccordionItem>
    </Accordion>
  )
}
