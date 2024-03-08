import React from 'react'
import type { Category, IProduct } from '@/interfaces/product'
import type { IStore } from '@/interfaces/store'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import AddNewProductModal from '@/app/components/admin/add-new-product-modal'
import AdminAccordionProducts from '@/app/components/admin/admin-accordion-products'
import AdminHeader from '@/app/components/admin/admin-header'
import {
  fetchAllCategories,
  fetchAllStoreProducts,
  fetchStoreById
} from '@/lib/actions'
import { signOut } from 'next-auth/react'
import { Button } from '@nextui-org/react'
import NoAccessPermission from '@/app/components/admin/no-access-permission'

export default async function DashboardPage ({
  params
}: {
  params: { shopId: string }
}) {
  const session = await getServerSession()
  const store: IStore = await fetchStoreById(params.shopId)
  const allStoreProducts: IProduct[] = await fetchAllStoreProducts(
    params.shopId
  )

  const categories: Category[] = await fetchAllCategories()
  const sortedCategories = categories.sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  console.log(session)

  const handleLogout = async () => {
    await signOut()
  }

  if (session === null) {
    redirect('/api/auth/signin')
  }

  if (session?.user?.name !== store.id.toString()) {
    return <NoAccessPermission />
  }

  console.log(store.id)

  return (
    <React.Fragment>
      <main className='flex flex-col w-full h-full px-4 pb-8 border border-red-500'>
        <AdminHeader session={session} />

        <section className=' flex flex-col gap-4'>
          {sortedCategories.map(category => (
            <AdminAccordionProducts
              key={category.id}
              products={allStoreProducts}
              category={category}
            />
          ))}
        </section>

        <AddNewProductModal categories={categories} storeId={store.id} />
      </main>
    </React.Fragment>
  )
}
