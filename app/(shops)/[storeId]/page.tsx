import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import type { IStore } from '@/interfaces/store'
import { fetchStoreById } from '@/lib/actions/store.actions'
import { Spacer } from '@nextui-org/react'
import { notFound } from 'next/navigation'
import NavBar from '@/app/components/common/nav-bar'
import ProductDetailModal from '@/app/components/common/product-detail-modal'
import FeaturedProductsList from '@/app/components/featured-products/featured-products-list'
import FeaturedProductsSkeleton from '@/app/components/skeletons/featured-products-skeleton'
import ProductsSkeleton from '@/app/components/skeletons/products-skeleton'
import ProductsList from '@/app/components/products/products-list'
import Categories from '@/app/components/categories/categories'
import CategoriesSkeleton from '@/app/components/skeletons/categories-skeleton'
import clsx from 'clsx'
import BannersCarousel from '@/app/components/carousel/banners-carousel'
import { fetchAllStoreBanners } from '@/lib/actions/banner.actions'
import Await from './await'
import BannersSkeleton from '@/app/components/skeletons/banners-skeleton'

interface RootPageProps {
  searchParams: {
    categoryId?: string
    categoryName?: string
    page?: string
  }
  params: { storeId: number | string }
}
export async function generateMetadata ({
  params
}: RootPageProps): Promise<Metadata> {
  // fetch data
  const store: IStore = await fetchStoreById(params.storeId)

  return {
    title: `${store.name} - MenuApp`,
    description: store.description
  }
}

export default async function Page ({ searchParams, params }: RootPageProps) {
  const store: IStore = await fetchStoreById(params.storeId)
  const storeBanners = fetchAllStoreBanners(params.storeId)

  if (store === null) {
    return notFound()
  }

  return (
    <React.Fragment>
      <NavBar store={store} />

      <main
        className={clsx(
          'flex flex-col w-full h-full px-4 py-8',
          store.themeColor ?? ''
        )}
      >
        <Suspense fallback={<BannersSkeleton />}>
          <Await promise={storeBanners}>
            {banners => <BannersCarousel data={banners} />}
          </Await>
        </Suspense>

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

      <ProductDetailModal themeColor={store.themeColor} />
    </React.Fragment>
  )
}
