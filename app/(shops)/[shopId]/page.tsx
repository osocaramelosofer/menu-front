import React, { Suspense } from 'react'
import NavBar from '@/app/components/common/nav-bar'
import ProductDetailModal from '@/app/components/common/product-detail-modal'
import FeaturedProductsList from '@/app/components/featured-products/featured-products-list'
import FeaturedProductsSkeleton from '@/app/components/skeletons/featured-products-skeleton'
import type { IApiResponse, IProduct } from '@/interfaces/product'
import type { IStore } from '@/interfaces/store'
import {
  fetchFilteredProducts,
  fetchStoreById,
  fetchStoreProducts
} from '@/lib/actions'
import { Spacer } from '@nextui-org/react'
import { notFound } from 'next/navigation'
import PromoCard from '@/app/components/promo-card'
import StoreBanner from '@/app/components/store-banner'
import ProductsSkeleton from '@/app/components/skeletons/products-skeleton'
import ProductsList from '@/app/components/products/products-list'

interface RootPageProps {
  searchParams: {
    categoryId: string
    categoryName: string
    offset: string
  }
  params: { shopId: number | string }
}

export default async function Page ({ searchParams, params }: RootPageProps) {
  const store: IStore = await fetchStoreById(params.shopId)
  const products: IProduct[] = await fetchStoreProducts(params.shopId)
  const products2: IApiResponse = await fetchFilteredProducts(
    params.shopId,
    searchParams.categoryId,
    searchParams.offset,
    5
  )

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!store) {
    return notFound()
  }

  return (
    <React.Fragment>
      <NavBar store={store} />

      <main className='flex flex-col w-full h-full px-4 py-8'>
        {store.amenities.length > 0 && <StoreBanner store={store} />}
        {/* <Spacer y={6} /> */}

        <h2 className='text-base font-semibold'>Productos Destacados</h2>
        <Suspense fallback={<FeaturedProductsSkeleton />}>
          <FeaturedProductsList products={products} />
        </Suspense>

        <Spacer y={6} />

        <Suspense key={Math.random()} fallback={<ProductsSkeleton />}>
          <ProductsList products2={products2} />
        </Suspense>
      </main>

      <ProductDetailModal />
    </React.Fragment>
  )
}
