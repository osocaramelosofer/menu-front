import AddNewProductModal from '@/app/components/admin/add-new-product-modal'
import AdminAccordionProducts from '@/app/components/admin/admin-accordion-products'
import AdminHeader from '@/app/components/admin/admin-header'

import type { Category, IProduct } from '@/interfaces/product'
import { fetchAllCategories, fetchAllProducts } from '@/lib/actions'

import { getServerSession } from 'next-auth'

import { redirect } from 'next/navigation'

export default async function DulceTragoAdminPage () {
  const session = await getServerSession()
  const products: IProduct[] = await fetchAllProducts()
  const categories: Category[] = await fetchAllCategories()

  if (session === null) {
    redirect('/api/auth/signin')
  }

  return (
    <main className='flex flex-col w-full h-full px-4 pb-8'>
      <AdminHeader session={session} />

      <section>
        {categories.map(category => (
          <AdminAccordionProducts
            key={category.id}
            products={products}
            category={category}
          />
        ))}
      </section>
      {/* <Accordion isCompact selectionMode='multiple'>
        <AccordionItem key={'1'} textValue={'lol'}>
          <ScrollShadow
            size={20}
            orientation='horizontal'
            className='flex overflow-x-auto gap-4 pb-5'
          >
            {products.reverse().map((product, index) => (
              <AdminProductCard
                key={`${product.id}${index}`}
                product={product}
              />
            ))}
          </ScrollShadow>
        </AccordionItem>
      </Accordion> */}
      {/* </section> */}

      {/* <AdminUserInfo session={session} /> */}
      {/* <AdminProductForm /> */}
      <AddNewProductModal categories={categories} />
    </main>
  )
}
