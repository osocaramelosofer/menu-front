import Categories from '@/app/components/categories'
import ProductsContainer from '@/app/components/dish-card/products-container'
import ProductsList from '@/app/components/products-list'
import PromoCard from '@/app/components/promo-card'
import { Spacer } from '@nextui-org/react'

export default async function DulceTragoPage () {
  return (
    <div className='flex flex-col w-full h-full px-4 py-8'>
      <PromoCard />

      <h2 className=' mt-8 text-base font-semibold'>Productos Destacados</h2>
      <ProductsList />

      <Categories />
      <Spacer y={4} />
      <ProductsContainer />
    </div>
  )
}
