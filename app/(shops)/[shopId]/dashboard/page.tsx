import React from 'react'
import type { Category, IApiResponse } from '@/interfaces/product'
import type { IStore } from '@/interfaces/store'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import AddNewProductModal from '@/app/components/admin/add-new-product-modal'
import AdminAccordionProducts from '@/app/components/admin/admin-accordion-products'
import AdminHeader from '@/app/components/admin/admin-header'
import {
  fetchAllStoreProducts,
  fetchStoreById,
  fetchUserByEmail
} from '@/lib/actions'
import NoAccessPermission from '@/app/components/admin/no-access-permission'
import NavBar from '@/app/components/common/nav-bar'

export default async function DashboardPage ({
  params
}: {
  params: { shopId: string }
}) {
  const session = await getServerSession()
  const userEmail = session?.user?.email
  const user = await fetchUserByEmail(userEmail)

  const store: IStore = await fetchStoreById(params.shopId)
  const allStoreProducts: IApiResponse = await fetchAllStoreProducts(
    params.shopId
  )
  const categories: Category[] = store.categories.sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  if (session === null) {
    redirect('/api/auth/signin')
  }

  if (user.storeId !== store.id) {
    return <NoAccessPermission />
  }

  return (
    <React.Fragment>
      <NavBar store={store} />
      <main className='flex flex-col w-full min-h-full px-4 pb-8'>
        <AdminHeader session={session} />

        <section className=' flex flex-col gap-4'>
          {categories.map(category => (
            <AdminAccordionProducts
              key={category.id}
              products={allStoreProducts.results}
              category={category}
            />
          ))}
        </section>
      </main>
      <AddNewProductModal categories={categories} storeId={store.id} />
    </React.Fragment>
  )
}
