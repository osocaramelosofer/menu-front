'use client'
import { useProductsStore } from '@/store/dulce_trago/products-store'
import DishCard from './dish-card'
import { useEffect, useMemo } from 'react'
import EmptyState from '../empty-products'
import { useCategoriesStore } from '@/store/dulce_trago/categories-store'
import ProductsSkeleton from '../skeletons/products-skeleton'

export default function DishesContainer () {
  // const products = await api.list()
  const { loading, products, getProductsList } = useProductsStore()
  const { currentCategory } = useCategoriesStore()

  useEffect(() => {
    getProductsList()
  }, [])
  console.log(products)

  const filteredProducts = useMemo(() => {
    return currentCategory.id === null
      ? products
      : products.filter(product => product.category.id === currentCategory.id)
  }, [products, currentCategory.id])

  if (loading) {
    return <ProductsSkeleton />
  }

  if (filteredProducts.length < 1) {
    return <EmptyState />
  }

  return (
    <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
      {filteredProducts.map((product, index) => (
        <DishCard
          key={product.id}
          srcImage={`https://res.cloudinary.com/drzrkaoje/${product.main_image}`}
          dishName={product.name}
          description={product.description}
          price={product.price}
          tags={product.tags}
        />
      ))}
    </section>
  )
}
