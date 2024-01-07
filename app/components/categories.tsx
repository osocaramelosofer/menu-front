'use client'

import React, { useEffect } from 'react'
import { Chip } from '@nextui-org/react'
import CategoryList from './category-list'

import { useCategoriesStore } from '@/store/dulce_trago/categories-store'
import CategoriesSkeleton from './skeletons/categories-skeleton'

export default function Categories () {
  const { loading, getCategoriesList, currentCategory, resetCurrentCategory } =
    useCategoriesStore()

  useEffect(() => {
    getCategoriesList()
  }, [])

  if (loading) {
    return <CategoriesSkeleton />
  }

  return (
    <section className='sticky top-16 z-20 bg-background flex flex-col shadow-none gap-4 w-full pt-5'>
      <div className='flex justify-between items-end font-semibold text-base'>
        <h3>Categorías</h3>

        {currentCategory.id !== null && (
          <Chip
            color='primary'
            onClose={resetCurrentCategory}
            variant='flat'
            size='sm'
          >
            {currentCategory.name}
          </Chip>
        )}
      </div>

      <CategoryList />
    </section>
  )
}
