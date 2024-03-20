import React from 'react'
import type { ICategory, IApiResponse } from '@/interfaces/product'
import type { IStore } from '@/interfaces/store'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import AdminAccordionProducts from '@/app/components/admin/admin-accordion-products'
import AdminHeader from '@/app/components/admin/admin-header'
import {
  fetchAllStoreProducts,
  fetchStoreById,
  fetchUserByEmail
} from '@/lib/actions'
import NoAccessPermission from '@/app/components/admin/no-access-permission'
import NavBar from '@/app/components/common/nav-bar'

// modals
import { ProductCategoryModal, StoreModal } from '@/app/components/admin/modals'
import AddProductButton from '@/app/components/admin/add-product-button'
import clsx from 'clsx'
import TableProduct from '@/app/components/admin/table-products'
import BannersCarousel from '@/app/components/carousel/banners-carousel'
import AdminBannersSection from '@/app/components/admin/admin-banners-section'
import BannerModal from '@/app/components/admin/modals/banner-modal'

export default async function DashboardPage ({
  params
}: {
  params: { storeId: string }
}) {
  const session = await getServerSession()
  const userEmail = session?.user?.email
  const user = await fetchUserByEmail(userEmail)

  const store: IStore = await fetchStoreById(params.storeId)
  const allStoreProducts: IApiResponse = await fetchAllStoreProducts(
    params.storeId
  )
  const categories: ICategory[] = store.categories.sort((a, b) =>
    a.name.localeCompare(b.name)
  )

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
        <AdminHeader session={session} />
        <AdminBannersSection store={store} />
        <section className=' flex flex-col gap-4 mb-4 relative'>
          <h2 className='font-semibold text-lg'>
            Mis Productos ({allStoreProducts.results.length})
          </h2>
          <TableProduct products={allStoreProducts.results} />
        </section>

        <section className=' flex flex-col gap-4 mb-4 relative'>
          <h2 className='font-semibold text-lg'>
            Mis Categorías ({categories.length})
          </h2>

          {categories.map(category => (
            <AdminAccordionProducts
              key={category.id}
              products={allStoreProducts.results}
              category={category}
            />
          ))}
          <AddProductButton />
        </section>
      </main>
      <ProductCategoryModal categories={categories} store={store} />
      <BannerModal store={store} />
      <StoreModal store={store} />
    </React.Fragment>
  )
}