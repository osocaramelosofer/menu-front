import React from 'react'
import { Button } from '@nextui-org/react'
import { useCategoriesStore } from '@/store/categories-store'

export default function CategoryList () {
  const { categories, selectedCategoryId, selectCategory } = useCategoriesStore()

  const handleCategoryClick = (categoryId: number) => {
    // getFilteredProducts(`?category=${categoryId}`)
    console.log('hello', categoryId)
    selectCategory(categoryId)
  }

  return (
    <>
     <Button color={`${selectedCategoryId === null ? 'primary' : 'secondary'}`} className="min-w-fit flex text-sm" onClick={() => { selectCategory(null) }}>
          <p className="capitalize">
            Todos
          </p>
      </Button>
      {categories.map((category) => (
        <Button
        key={category.id}
          color={`${category.id === selectedCategoryId ? 'primary' : 'secondary'}`}
          className="min-w-fit flex text-sm"
          onClick={() => { handleCategoryClick(category.id) }}

        >
          <p
            className={`${
              category.id === selectedCategoryId ? 'text-[#fff]' : 'text-primary'
            } capitalize`}
          >
            {category.name}
          </p>
        </Button>
      ))}
    </>
  )
}
