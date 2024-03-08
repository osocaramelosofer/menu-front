import type { IApiResponse, IProduct } from '@/interfaces/product'
import { ScrollShadow } from '@nextui-org/react'
import EmptyState from '../common/empty-products'
import { fetchAllProducts } from '@/lib/actions'
import FeaturedProductCard from './featured-product-card'
import type { IStore } from '@/interfaces/store'

export default async function FeaturedProductsList ({
  products
}: {
  products: IProduct[]
}) {
  // const products: IProduct[] = await fetchAllProducts()

  // Filtrar solo los productos con ID impar (!==0) o par (=== 0)
  const oddIdProducts = products.filter(
    product => parseInt(product.id.toString()) % 2 === 0
  )

  if (oddIdProducts.length < 1) {
    return (
      <EmptyState
        title='Sin productos'
        subtitle='Parece que aun no hay productos destacados para mostrar'
      />
    )
  }

  return (
    <section className='relative bg-background flex flex-col shadow-none gap-4 w-full pt-5'>
      <ScrollShadow
        size={20}
        orientation='horizontal'
        className='flex overflow-x-auto gap-4 pb-5'
      >
        {oddIdProducts.map((product, index) => (
          <FeaturedProductCard
            key={`${product.id}${index}`}
            product={product}
          />
        ))}
      </ScrollShadow>
    </section>
  )
}
