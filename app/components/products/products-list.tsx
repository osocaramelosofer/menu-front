import { BASE_URL } from '@/lib/utils'
import type { IApiResponse } from '@/interfaces/product'
import { fetchPaginatedProducts } from '@/lib/actions'
import ProductCard from './product-card'

import EmptyState from '../common/empty-products'

import CustomPagination from '../common/custom-pagination'

export default async function ProductsList ({
  currentCategoryId,
  currentPage,
  storeId
}: {
  currentCategoryId?: string
  currentPage?: string
  currentOffset?: string
  storeId: string | number
}) {
  const resultsPeerPage = 3

  const url: string = `${BASE_URL}/products?store=${storeId}&resultsPerPage=${resultsPeerPage}&page=${
    currentPage != null || '1'
  }&categoryId=${currentCategoryId}`

  const products: IApiResponse = await fetchPaginatedProducts(url)

  if (products.results.length === 0) {
    return <EmptyState storeId={storeId} />
  }

  return (
    <div className='flex flex-col gap-10'>
      <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {products.results.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </section>
      <section className='flex flex-col flex-1 w-full justify-center items-center  z-10'>
        <CustomPagination data={products} resultsPeerPage={resultsPeerPage} />
      </section>
    </div>
  )
}
