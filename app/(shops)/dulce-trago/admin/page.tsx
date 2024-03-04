import AddNewProductModal from '@/app/components/admin/add-new-product-modal'
import AdminAccordionProducts from '@/app/components/admin/admin-accordion-products'
import AdminHeader from '@/app/components/admin/admin-header'

import type { Category, IProduct } from '@/interfaces/product'
import { fetchAllCategories, fetchAllProducts } from '@/lib/actions'
import { ScrollShadow } from '@nextui-org/react'

import { getServerSession } from 'next-auth'

import { redirect } from 'next/navigation'

export default async function DulceTragoAdminPage () {
  const session = await getServerSession()
  const products: IProduct[] = await fetchAllProducts()
  const categories: Category[] = await fetchAllCategories()

  if (session === null) {
    redirect('/api/auth/signin')
  }
  const sortedCategories = categories.sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  return (
    <main className='flex flex-col w-full h-full px-4 pb-8'>
      <AdminHeader session={session} />

      <section className=' flex flex-col gap-4'>
        {sortedCategories.map(category => (
          <AdminAccordionProducts
            key={category.id}
            products={products}
            category={category}
          />
        ))}
      </section>

      <AddNewProductModal categories={categories} />
    </main>
  )
}
