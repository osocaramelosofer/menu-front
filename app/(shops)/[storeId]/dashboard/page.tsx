import React, { Suspense } from 'react'
import Await from './await'
import clsx from 'clsx'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

// types
import type { ICategory } from '@/interfaces/product'
import type { IStore } from '@/interfaces/store'

// actions
import { fetchUserByEmail } from '@/lib/actions'
import { fetchStoreById } from '@/lib/actions/store.actions'
import { fetchAllStoreBanners } from '@/lib/actions/banner.actions'

// components
import NoAccessPermission from '@/app/components/admin/no-access-permission'
import NavBar from '@/app/components/common/nav-bar'
import AdminHeader from '@/app/components/admin/admin-header'
// import AdminAccordionProducts from '@/app/components/admin/admin-accordion-products'
import AdminBannersSection from '@/app/components/admin/admin-banners-section'
import BannersSkeleton from '@/app/components/skeletons/banners-skeleton'
import AddProductCategoryButton from '@/app/components/admin/add-product-category-button'
import { Chip } from '@nextui-org/react'
// paginated tables
import OrdersTablePaginated from '@/app/components/orders/orders-table-paginated'
import ProductsTablePaginated from '@/app/components/admin/products-table-paginated'

// modals
import {
  ProductCategoryModal,
  StoreModal,
  BannerModal
} from '@/app/components/admin/modals'

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

  if (session === null) {
    redirect('/api/auth/signin')
  }

  if (user?.storeId !== store.id) {
    return <NoAccessPermission />
  }

  return (
    <React.Fragment>
      <NavBar store={store} isHiddenCart />
      <main
        className={clsx(
          'flex flex-col w-full h-full px-4 pb-20 relative gap-8',
          store.themeColor ?? ''
        )}
      >
        {/* HEADER SECTION  */}
        <AdminHeader session={session} />

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
        <ProductsTablePaginated storeId={params.storeId} />

        {/* CATEGORIES SECTION  */}
        <section className='flex flex-col gap-4 relative'>
          <div className=' flex justify-between items-end w-full'>
            <h2 className='font-semibold text-lg'>
              Categorías ({categories.length})
            </h2>
            <AddProductCategoryButton label='Nueva Categoría' />
          </div>

          <div className='flex gap-3 flex-wrap'>
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

        {/* ORDERS SECTION  */}
        <OrdersTablePaginated storeId={params.storeId} />
      </main>

      {/* MODALS SECTION  */}
      <ProductCategoryModal categories={categories} store={store} />
      <BannerModal store={store} />
      <StoreModal store={store} />
    </React.Fragment>
  )
}
