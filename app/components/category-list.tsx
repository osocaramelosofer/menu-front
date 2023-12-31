import { Button, ScrollShadow } from '@nextui-org/react'
import { useCategoriesStore } from '@/store/dulce_trago/categories-store'
import { type Category } from '@/interfaces/product'

export default function CategoryList () {
  const {
    categories,
    currentCategory,
    setCurrentCategory,
    getInitialCategory
  } = useCategoriesStore()

  const handleCategoryClick = (category: Category) => {
    setCurrentCategory(category)
  }
  const initialCategory = getInitialCategory()

  return (
    <ScrollShadow
      orientation='horizontal'
      className='flex overflow-x-auto gap-4 pb-5'
    >
      {[initialCategory, ...categories].map(category => (
        <Button
          key={`${category.id}${category.name}`}
          variant={category.id === currentCategory.id ? 'solid' : 'flat'}
          color={category.id === currentCategory.id ? 'primary' : 'secondary'}
          size='sm'
          className='min-w-fit flex text-sm'
          onClick={() => {
            handleCategoryClick(category)
          }}
        >
          <p
            className={`${
              category.id === currentCategory.id ? 'text-white' : 'text-primary'
            }`}
          >
            {category.name}
          </p>
        </Button>
      ))}
    </ScrollShadow>
  )
}
