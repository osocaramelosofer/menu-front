import React, { Suspense } from 'react'
import type { IStore } from '@/interfaces/store'
import { fetchStoreById } from '@/lib/actions'
import { Spacer } from '@nextui-org/react'
import { notFound } from 'next/navigation'
import NavBar from '@/app/components/common/nav-bar'
import ProductDetailModal from '@/app/components/common/product-detail-modal'
import FeaturedProductsList from '@/app/components/featured-products/featured-products-list'
import FeaturedProductsSkeleton from '@/app/components/skeletons/featured-products-skeleton'
import StoreBanner from '@/app/components/store-banner'
import ProductsSkeleton from '@/app/components/skeletons/products-skeleton'
import ProductsList from '@/app/components/products/products-list'
import Categories from '@/app/components/categories/categories'
import CategoriesSkeleton from '@/app/components/skeletons/categories-skeleton'

interface RootPageProps {
  searchParams: {
    categoryId?: string
    categoryName?: string
    page?: string
  }
  params: { storeId: number | string }
}

export default async function Page ({ searchParams, params }: RootPageProps) {
  const store: IStore = await fetchStoreById(params.storeId)
  // const allStoreProducts: IApiResponse = await fetchAllStoreProducts(
  //   params.shopId
  // )

  if (store === null) {
    return notFound()
  }

  return (
    <React.Fragment>
      <NavBar store={store} />

      <main className='flex flex-col w-full h-full px-4 py-8'>
        {/* {store.amenities.length > 0 && <StoreBanner store={store} />} */}

        <h2 className='text-base font-semibold'>Productos Destacados</h2>
        <Suspense fallback={<FeaturedProductsSkeleton />}>
          <FeaturedProductsList storeId={params.storeId} />
        </Suspense>
        <Suspense fallback={<CategoriesSkeleton />}>
          <Categories categories={store.categories} storeId={params.storeId} />
        </Suspense>

        <Spacer y={6} />

        <Suspense key={Math.random()} fallback={<ProductsSkeleton />}>
          <ProductsList
            storeId={params.storeId}
            currentCategoryId={searchParams.categoryId}
            currentPage={searchParams.page}
          />
        </Suspense>
      </main>

      <ProductDetailModal />
    </React.Fragment>
  )
}
