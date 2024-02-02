import PromoCard from '@/app/components/promo-card'
import { fetchAllCategories } from '@/lib/actions'
import CoffeeCategories from './coffee-pagination.client'
import api from '@/services/dulce_trago/api'
import ProductCard from '@/app/components/products/product-card'
import { type IApiResponse } from '@/interfaces/product'

export default async function CoffeesPage ({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const offset = (searchParams.offset ?? '1') as string
  const limit = (searchParams.limit ?? '2') as string
  const response: IApiResponse = await api.fetchFilteredProducts('3', offset, limit) // category, offset, limit
  return (
    <section className='w-full mx-auto'>
      <div className="wrapper max-w-[700px] mx-auto">
        <h1>coffees</h1>
        <main>
          <PromoCard />
        </main>
        <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {response.results?.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </section>

        <CoffeeCategories/>
      </div>
    </section>
  )
}
