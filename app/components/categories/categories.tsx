'use client'

import React from 'react'
import type { ICategory } from '@/interfaces/product'
import { useRouter, useSearchParams } from 'next/navigation'
import { Chip, ScrollShadow } from '@nextui-org/react'
import CategoryItem from './category-item'

export default function Categories ({
  categories,
  storeId
}: {
  categories: ICategory[]
  storeId: string | number
}) {
  const sortedCategories = categories.sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  const router = useRouter()
  const params = useSearchParams()
  const currentCategoryId = Number(params.get('categoryId'))
  const currentCategoryName = params.get('categoryName')

  const handleResetCategoryFilter = () => {
    router.push(`/${storeId}`, { scroll: false })
  }

  if (categories.length === 0) {
    return null
  }

  return (
    <section className='sticky top-16 z-20 bg-background flex flex-col shadow-none gap-4 w-full pt-5'>
      <div className='flex justify-between items-end font-semibold text-base'>
        <h3>Categorías</h3>

        {currentCategoryId !== 0 && (
          <Chip
            color='primary'
            onClose={handleResetCategoryFilter}
            variant='flat'
            size='sm'
          >
            {currentCategoryName}
          </Chip>
        )}
      </div>
      <ScrollShadow
        orientation='horizontal'
        className='flex overflow-x-auto gap-4 pb-5'
      >
        {sortedCategories.map(category => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </ScrollShadow>
    </section>
  )
}
