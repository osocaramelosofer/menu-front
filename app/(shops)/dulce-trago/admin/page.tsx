import AdminProductCard from '@/app/components/admin/admin-product-card'
import AdminProductForm from '@/app/components/admin/admin-product-form'
import AdminUserInfo from '@/app/components/admin/admin-user-info'
import FeaturedProductCard from '@/app/components/featured-products/featured-product-card'
import type { IProduct } from '@/interfaces/product'
import { fetchAllProducts } from '@/lib/actions'
import { ScrollShadow } from '@nextui-org/react'
import { getServerSession } from 'next-auth'

import { redirect } from 'next/navigation'

export default async function DulceTragoAdminPage () {
  const session = await getServerSession()
  const products: IProduct[] = await fetchAllProducts()

  if (session === null) {
    redirect('/api/auth/signin')
  }

  return (
    <main className='flex flex-col w-full h-full px-4 py-8'>
      <h1>This is a protected route</h1>
      <ScrollShadow
        size={20}
        orientation='horizontal'
        className='flex overflow-x-auto gap-4 pb-5'
      >
        {products.reverse().map((product, index) => (
          <AdminProductCard key={`${product.id}${index}`} product={product} />
        ))}
      </ScrollShadow>

      {/* <AdminUserInfo session={session} /> */}
      <AdminProductForm />
    </main>
  )
}
