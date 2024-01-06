'use client'
import ProductCard from './product-card'
import { useMemo } from 'react'
import { useCategoriesStore } from '@/store/dulce_trago/categories-store'

import { type IProduct } from '@/interfaces/product'

export default function ProductsContainerClient ({
  products
}: {
  products: IProduct[]
}) {
  const { currentCategory } = useCategoriesStore()
  const filteredProducts = useMemo(() => {
    return currentCategory.id === null
      ? products
      : products.filter(product => product.category.id === currentCategory.id)
  }, [products, currentCategory.id])

  return (
    <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
      {filteredProducts.map((product, index) => (
        <ProductCard
          key={index}
          id={product.id}
          srcImage={product.main_image}
          dishName={product.name}
          description={product.description}
          price={product.price}
          tags={product.tags}
        />
      ))}
    </section>
  )
}
