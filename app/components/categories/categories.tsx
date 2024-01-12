'use client'

import { type Category } from '@/interfaces/product'

import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Chip, ScrollShadow } from '@nextui-org/react'
import CategoryItem from './category-item'
import { useCategoriesStore } from '@/store/dulce_trago/categories-store'
import CategoriesSkeleton from '../skeletons/categories-skeleton'

export default function Categories ({ data }: { data?: Category[] }) {
  const { categories, getCategoriesList, loading } = useCategoriesStore()

  useEffect(() => {
    getCategoriesList()
  }, [])

  const router = useRouter()
  const params = useSearchParams()
  const currentCategoryId = Number(params.get('categoryId'))
  const currentCategoryName = params.get('categoryName')

  const handleResetCategoryFilter = () => {
    router.push('/dulce-trago')
  }

  if (loading) {
    return <CategoriesSkeleton />
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
        {categories.map(category => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </ScrollShadow>
    </section>
  )
}
