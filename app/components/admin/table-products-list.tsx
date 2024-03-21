import { BASE_URL } from '@/lib/utils'

import TableProduct from './table-products'
import type { IApiResponse } from '@/interfaces/product'
import { fetchPaginatedProducts } from '@/lib/actions'

export default async function TableProductsList ({
  currentCategoryId,
  currentPage,
  storeId
}: {
  currentCategoryId?: string
  currentPage?: string
  storeId: string | number
}) {
  const resultsPeerPage = 10

  const url: string = `${BASE_URL}/products?store=${storeId}&resultsPerPage=${resultsPeerPage}`

  const products: IApiResponse = await fetchPaginatedProducts(url)

  return (
    <section className=' flex flex-col gap-4 mb-4 relative'>
      <h2 className='font-semibold text-lg'>Mis Productos</h2>

      <TableProduct
        resultsPeerPage={resultsPeerPage}
        products={products.results}
        productsApiResponse={products}
      />
    </section>
  )
}
