// types
import type { ICategory } from '@/interfaces/product'

// components
import AddProductCategoryButton from '@/app/components/admin/add-product-category-button'
import { Chip } from '@nextui-org/react'

export default async function AdminCategoriesSection ({
  categories
}: {
  categories: ICategory[]
}) {
  return (
    <section className='flex flex-col gap-4 relative'>
      <div className=' flex justify-between items-end w-full'>
        <h2 className='font-semibold text-lg'>
          Categorías ({categories.length})
        </h2>
        <AddProductCategoryButton label='Nueva Categoría' />
      </div>

      <div className='flex gap-3 flex-wrap'>
        {categories.map(category => (
          <Chip size='lg' variant='shadow' color='warning' key={category.id}>
            {category.name}
          </Chip>
        ))}
      </div>
    </section>
  )
}
