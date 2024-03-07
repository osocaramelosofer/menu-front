import type { IApiResponse } from '@/interfaces/product'
import { fetchFilteredProducts } from '@/lib/actions'
import ProductCard from './product-card'

import EmptyState from '../common/empty-products'

import CustomPagination from '../common/custom-pagination'

export default async function ProductsList ({
  currentCategoryId,
  currentOffset,
  products2
}: {
  currentCategoryId?: string
  currentOffset?: number | string
  products2: IApiResponse
}) {
  // const products: IApiResponse = await fetchFilteredProducts(
  //   currentCategoryId,
  //   currentOffset,
  //   5
  // )

  if (products2.results.length === 0) {
    return <EmptyState />
  }

  return (
    <div className='flex flex-col gap-10'>
      <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {products2.results.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </section>
      <section className='flex flex-col flex-1 w-full justify-center items-center  z-10'>
        <CustomPagination data={products2} />
      </section>
    </div>
  )
}
