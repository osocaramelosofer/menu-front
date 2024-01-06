import Categories from '@/app/components/categories'
import ProductsContainer from '@/app/components/dish-card/products-container'
import ProductsList from '@/app/components/products-list'
import PromoCard from '@/app/components/promo-card'

export default async function DulceTragoPage () {
  return (
    <div className='flex flex-col w-full h-full px-4 py-8'>
      <PromoCard />

      <Categories />

      <ProductsList />
      <h2 className=' my-8 text-base font-semibold'>
        Descubre todos nuestros productos
      </h2>

      <ProductsContainer />
    </div>
  )
}
