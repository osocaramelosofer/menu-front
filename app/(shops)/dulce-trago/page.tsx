import Categories from '@/app/components/categories/categories'
import PromoCard from '@/app/components/promo-card'
import { Spacer } from '@nextui-org/react'
import { Suspense } from 'react'
import ProductsSkeleton from '@/app/components/skeletons/products-skeleton'
import FeaturedProductsSkeleton from '@/app/components/skeletons/featured-products-skeleton'
import FeaturedProductsList from '@/app/components/featured-products/featured-products-list'
import ProductsList from '@/app/components/products/products-list'
import ProductDetailModal from '@/app/components/common/product-detail-modal'
import CardsCarousel from '@/app/components/carousel/cards-carousel'

interface RootPageProps {
  searchParams: {
    categoryId: string
    categoryName: string
    offset: string
  }
}

export default async function DulceTragoPage ({ searchParams }: RootPageProps) {
  const currentCategoryId = searchParams.categoryId
  const currentOffset = Number(searchParams.offset)

  return (
    <main className='flex flex-col w-full h-full px-4 py-8 max-w-7xl mx-auto'>
      <PromoCard />

      <Spacer y={6} />
      <h2 className='text-base font-semibold'>Productos Destacados</h2>
      {/* <Suspense fallback={<FeaturedProductsSkeleton />}> */}
      <FeaturedProductsList />
      {/* </Suspense> */}
      <Categories />
      <Spacer y={6} />
      {/* <Suspense key={Math.random()} fallback={<ProductsSkeleton />}> */}
      <ProductsList
        currentCategoryId={currentCategoryId}
        currentOffset={currentOffset}
      />
      {/* </Suspense> */}
      <ProductDetailModal />
    </main>
  )
}
