import type { IApiResponse } from '@/interfaces/product'
import { fetchFilteredProducts } from '@/lib/actions'
import ProductCard from './product-card'

import EmptyState from '../common/empty-products'
import { Pagination } from '@nextui-org/react'
import { redirect } from 'next/navigation'

export default async function ProductsList ({
  currentCategoryId
}: {
  currentCategoryId: string
}) {
  const products: IApiResponse = await fetchFilteredProducts(currentCategoryId)

  if (products.results.length === 0) {
    return <EmptyState />
  }

  return (
    <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
      {products.results.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
      {/* <Pagination
        showControls
        isCompact
        total={products.results.length}
        onChange={() => {
          redirect(products.next)
        }}
      /> */}
      {/* <LoadMore /> */}
    </section>
  )
}
