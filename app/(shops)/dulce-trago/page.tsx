import Categories from '@/app/components/categories/categories'
import PromoCard from '@/app/components/promo-card'
import { Spacer } from '@nextui-org/react'
import { Suspense } from 'react'
import ProductsSkeleton from '@/app/components/skeletons/products-skeleton'
import FeaturedProductsSkeleton from '@/app/components/skeletons/featured-products-skeleton'
import FeaturedProductsList from '@/app/components/featured-products/featured-products-list'
import ProductsList from '@/app/components/products/products-list'
import ProductDetailModal from '@/app/components/common/product-detail-modal'

interface RootPageProps {
  searchParams: {
    categoryId: string
    categoryName: string
  }
}

export default async function DulceTragoPage ({ searchParams }: RootPageProps) {
  const currentCategoryId = searchParams.categoryId

  return (
    <main className='flex flex-col w-full h-full px-4 py-8'>
      <PromoCard />
      <Spacer y={6} />
      <h2 className='text-base font-semibold'>Productos Destacados</h2>
      <Suspense fallback={<FeaturedProductsSkeleton />}>
        <FeaturedProductsList />
      </Suspense>
      <Categories />
      <Spacer y={6} />
      <Suspense key={Math.random()} fallback={<ProductsSkeleton />}>
        <ProductsList currentCategoryId={currentCategoryId} />
      </Suspense>
      <ProductDetailModal />
    </main>
  )
}
