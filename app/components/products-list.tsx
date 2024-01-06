'use client'
import { useProductsStore } from '@/store/dulce_trago/products-store'
import { useEffect, useMemo } from 'react'
import { useCategoriesStore } from '@/store/dulce_trago/categories-store'
import EmptyState from './empty-products'
import { useDisclosure, ScrollShadow, Skeleton } from '@nextui-org/react'

import ProductCard from './product-card'
import ProductDetailModal from './product-detail-modal'

export default function ProductsList () {
  // const products = await api.list()
  const { loading, products, getProductsList } = useProductsStore()
  const { currentCategory } = useCategoriesStore()
  const { isOpen, onOpenChange, onOpen } = useDisclosure()

  useEffect(() => {
    getProductsList()
  }, [])

  const filteredProducts = useMemo(() => {
    return currentCategory.id === null
      ? products
      : products.filter(product => product.category.id === currentCategory.id)
  }, [products, currentCategory.id])

  if (loading) {
    return (
      <section className='bg-background flex flex-col shadow-none gap-4 w-full pt-5'>
        <ScrollShadow
          size={20}
          orientation='horizontal'
          className='flex overflow-x-auto gap-4 pb-5'
        >
          {Array(7)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className=' min-w-[12rem] rounded-lg p-4 shadow-sm border border-[#f0f0f0]'
              >
                <div className='w-full flex flex-col gap-3 flex-1 h-full'>
                  <div className='aspect-square w-full min-h-[10rem]'>
                    <Skeleton className='flex rounded-lg w-full h-full ' />
                  </div>
                  <div className='w-full h-full flex flex-col justify-between flex-1 gap-8'>
                    <div className='flex flex-col  gap-2'>
                      <Skeleton className='h-3 w-3/5 rounded-lg' />
                      <Skeleton className='h-3 w-4/5 rounded-lg' />
                    </div>

                    <div className='flex justify-between items-center flex-none'>
                      <Skeleton className='h-3 w-12 rounded-lg' />
                      <Skeleton className='h-8 w-8 rounded-lg' />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </ScrollShadow>
      </section>
    )
  }

  if (filteredProducts.length < 1) {
    return <EmptyState />
  }

  return (
    <section className='bg-background flex flex-col shadow-none gap-4 w-full pt-5'>
      <ScrollShadow
        size={20}
        orientation='horizontal'
        className='flex overflow-x-auto gap-4 pb-5'
      >
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={`${product.id}${index}`}
            product={product}
            onOpen={onOpen}
          />
        ))}
      </ScrollShadow>
      <ProductDetailModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </section>
  )
}
