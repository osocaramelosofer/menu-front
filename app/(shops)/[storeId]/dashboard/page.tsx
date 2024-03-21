import React, { Suspense } from 'react'
import Await from './await'
import clsx from 'clsx'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

// types
import type { ICategory, IApiResponse } from '@/interfaces/product'
import type { IStore } from '@/interfaces/store'

// actions
import { fetchAllStoreProducts, fetchUserByEmail } from '@/lib/actions'
import { fetchStoreById } from '@/lib/actions/store.actions'
import { fetchAllStoreBanners } from '@/lib/actions/banner.actions'

// components
import NoAccessPermission from '@/app/components/admin/no-access-permission'
import NavBar from '@/app/components/common/nav-bar'
import AdminHeader from '@/app/components/admin/admin-header'
import AddProductButton from '@/app/components/admin/add-product-button'
import TableProduct from '@/app/components/admin/table-products'
// import AdminAccordionProducts from '@/app/components/admin/admin-accordion-products'
import AdminBannersSection from '@/app/components/admin/admin-banners-section'
import BannersSkeleton from '@/app/components/skeletons/banners-skeleton'
import { Chip } from '@nextui-org/react'

// modals
import {
  ProductCategoryModal,
  StoreModal,
  BannerModal
} from '@/app/components/admin/modals'
import OrdersList from '@/app/components/orders/orders-list'
import ProductsSkeleton from '@/app/components/skeletons/products-skeleton'
import TableProductsList from '@/app/components/admin/table-products-list'
import type { IApiOrderResponse } from '@/interfaces/order'
import { fetchPaginatedOrders } from '@/lib/actions/order.actions'
import { BASE_URL } from '@/lib/utils'
import OrdersTable from '@/app/components/orders/orders-table'

interface RootPageProps {
  searchParams: {
    categoryId?: string
    categoryName?: string
    page?: string
    ordersPage?: string
  }
  params: { storeId: number | string }
}

export default async function DashboardPage ({
  searchParams,
  params
}: RootPageProps) {
  const session = await getServerSession()
  const userEmail = session?.user?.email
  const user = await fetchUserByEmail(userEmail)

  const store: IStore = await fetchStoreById(params.storeId)
  const categories: ICategory[] = store.categories.sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  // Promises to Await.tsx
  const storeBanners = fetchAllStoreBanners(params.storeId)

  // const resultsPeerPage = 100

  // const url: string = `${BASE_URL}/orders?store=${params.storeId}&resultsPerPage=${resultsPeerPage}`

  // const orders: IApiOrderResponse = await fetchPaginatedOrders(url)

  // const allStoreProducts = fetchAllStoreProducts(params.storeId)

  if (session === null) {
    redirect('/api/auth/signin')
  }

  if (user?.storeId !== store.id) {
    return <NoAccessPermission />
  }

  return (
    <React.Fragment>
      <NavBar store={store} />
      <main
        className={clsx(
          'flex flex-col w-full h-full px-4 pb-20 relative',
          store.themeColor ?? ''
        )}
      >
        {/* HEADER SECTION  */}
        <AdminHeader session={session} />

        {/* <OrdersTable orders={orders.results} /> */}

        {/* BANNERS SECTION  */}
        <Suspense
          key={Math.random()}
          fallback={<BannersSkeleton isDashboardSection />}
        >
          <Await promise={storeBanners}>
            {banners => <AdminBannersSection banners={banners} />}
          </Await>
        </Suspense>

        {/* PRODUCTS SECTION  */}
        <Suspense key={Math.random()} fallback={<BannersSkeleton />}>
          <TableProductsList
            storeId={params.storeId}
            currentPage={searchParams.page}
            currentCategoryId={searchParams.categoryId}
          />
        </Suspense>
        {/* <section className=' flex flex-col gap-4 mb-4 relative'>
          <h2 className='font-semibold text-lg'>Mis Productos</h2>
          <Suspense fallback={<BannersSkeleton />}>
            <Await promise={allStoreProducts}>
              {(products: IApiResponse) => (
                <TableProduct products={products.results} />
              )}
            </Await>
          </Suspense>
        </section> */}

        {/* CATEGORIES SECTION  */}
        <section className='flex flex-col gap-4 mb-8 relative'>
          <h2 className='font-semibold text-lg'>
            Mis Categorías ({categories.length})
          </h2>

          <div className='flex gap-2 flex-wrap'>
            {categories.map(category => (
              <Chip
                size='lg'
                variant='shadow'
                color='warning'
                key={category.id}
              >
                {category.name}
              </Chip>
            ))}
          </div>
        </section>
        <AddProductButton />

        {/* ORDERS SECTION  */}

        <Suspense key={Math.random()} fallback={<ProductsSkeleton />}>
          <OrdersList
            storeId={params.storeId}
            currentPage={searchParams.ordersPage}
          />
        </Suspense>
      </main>
      {/* MODALS SECTION  */}

      <ProductCategoryModal categories={categories} store={store} />
      <BannerModal store={store} />
      <StoreModal store={store} />
    </React.Fragment>
  )
}
