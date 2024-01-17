import type { IApiResponse, IProduct } from '@/interfaces/product'
import { ScrollShadow } from '@nextui-org/react'
import EmptyState from '../common/empty-products'

import ProductCard from './featured-product-card'
import { fetchAllProducts } from '@/lib/actions'

export default async function FeaturedProductsList () {
  const products: IApiResponse = await fetchAllProducts()

  // Filtrar solo los productos con ID impar
  const oddIdProducts = products.results.filter(
    product => parseInt(product.id.toString()) % 2 !== 0
  )

  if (oddIdProducts.length < 1) {
    return <EmptyState />
  }

  return (
    <section className='relative bg-background flex flex-col shadow-none gap-4 w-full pt-5'>
      <ScrollShadow
        size={20}
        orientation='horizontal'
        className='flex overflow-x-auto gap-4 pb-5'
      >
        {oddIdProducts.reverse().map((product, index) => (
          <ProductCard key={`${product.id}${index}`} product={product} />
        ))}
      </ScrollShadow>
    </section>
  )
}
