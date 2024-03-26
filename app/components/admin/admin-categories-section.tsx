// types
import type { ICategory } from '@/interfaces/product'

// components
import AddProductCategoryButton from '@/app/components/admin/add-product-category-button'
import { Chip } from '@nextui-org/react'
import EmptyData from '../common/empty-data'

export default async function AdminCategoriesSection ({
  categories
}: {
  categories: ICategory[]
}) {
  if (categories.length === 0) {
    return (
      <section className='flex flex-col gap-4 relative'>
        <div className=' flex justify-between items-end w-full'>
          <h2 className='font-semibold text-lg'>
            Categorías ({categories.length})
          </h2>
          <AddProductCategoryButton label='Nueva Categoría' />
        </div>

        <EmptyData
          title='Sin categorías'
          subtitle='Agrega las categorías a las que después asignaras a cada uno de tus productos.'
        />
      </section>
    )
  }
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
          <Chip size='lg' variant='flat' color='warning' key={category.id}>
            {category.name}
          </Chip>
        ))}
      </div>
    </section>
  )
}
