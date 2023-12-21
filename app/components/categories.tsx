'use client'

import React, { useEffect } from 'react'
import { Chip, ScrollShadow, Skeleton } from '@nextui-org/react'
import CategoryList from './category-list'

import { useCategoriesStore } from '@/store/categories-store'

export interface Category {
  id: number
  name: string
  description: string
}

export default function Categories () {
  const { loading, getCategoriesList } = useCategoriesStore()

  useEffect(() => {
    getCategoriesList()
  }, [])

  return (
    <section className="sticky top-16 z-10 bg-background flex flex-col shadow-none gap-4 w-full pt-5">
      <div className="flex justify-between items-end font-bold text-base">
        <h3>Categorías</h3>
        {/* {category && (
          <Chip
            color="primary"
            onClose={handleRemoveCategory}
            variant="flat"
            size="sm"
          >
            {category}
          </Chip>
        )} */}
      </div>

      <ScrollShadow
        orientation="horizontal"
        className="flex overflow-x-auto gap-4 pb-5"
      >
        {loading
          ? (
          <>
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} className=" w-32 h-10" />
              ))}
          </>
            )
          : (
          <CategoryList />
            )
        }
      </ScrollShadow>
    </section>
  )
}
