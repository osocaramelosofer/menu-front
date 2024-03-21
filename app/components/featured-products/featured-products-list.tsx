import type { IApiResponse } from '@/interfaces/product'
import { ScrollShadow } from '@nextui-org/react'
import EmptyState from '../common/empty-products'
import { fetchTop10StoreProducts } from '@/lib/actions'
import FeaturedProductCard from './featured-product-card'

export default async function FeaturedProductsList ({
  storeId
}: {
  storeId: string | number
}) {
  const top10Products: IApiResponse = await fetchTop10StoreProducts(storeId)

  if (top10Products.results.length < 1) {
    return (
      <EmptyState
        title='Sin productos'
        subtitle='Parece que aun no hay productos destacados para mostrar'
      />
    )
  }

  return (
    <section className='relative bg-background flex flex-col shadow-none gap-4 w-full mt-6'>
      <h2 className='text-base font-semibold'>Productos Destacados</h2>

      <ScrollShadow
        size={20}
        orientation='horizontal'
        className='flex overflow-x-auto gap-4 pb-5'
      >
        {top10Products.results.map((product, index) => (
          <FeaturedProductCard
            key={`${product.id}${index}`}
            product={product}
          />
        ))}
      </ScrollShadow>
    </section>
  )
}
