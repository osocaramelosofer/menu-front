import { fetchFilteredProducts } from '@/lib/actions'
import ProductCard from './product-card'

import { type IProduct } from '@/interfaces/product'
import EmptyState from '../common/empty-products'

export default async function ProductsList ({
  currentCategoryId
}: {
  currentCategoryId: string
}) {
  const products: IProduct[] = await fetchFilteredProducts(currentCategoryId)

  if (products.length === 0) {
    return <EmptyState />
  }

  return (
    <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
      {/* <LoadMore /> */}
    </section>
  )
}
