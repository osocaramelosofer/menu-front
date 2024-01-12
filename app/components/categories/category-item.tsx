import qs from 'query-string'
import { Button } from '@nextui-org/react'
import { useCategoriesStore } from '@/store/dulce_trago/categories-store'
import { type Category } from '@/interfaces/product'
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams
} from 'next/navigation'
import { useCallback } from 'react'
export default function CategoryItem ({ category }: { category: Category }) {
  // const { currentCategory, setCurrentCategory } = useCategoriesStore()

  const router = useRouter()
  const params = useSearchParams()
  const pathname = usePathname()

  const currentCategoryId = Number(params.get('categoryId'))
  const isSelected = currentCategoryId === category.id

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: isSelected ? null : category.id,
          categoryName: isSelected ? null : category.name
        }
      },
      { skipNull: true, skipEmptyString: true }
    )
    router.push(url)
  }

  const handleClick = useCallback(
    (category: Category) => {
      let currentQuery = {}

      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (params) {
        currentQuery = qs.parse(params.toString())
      }

      const updatedQuery: any = {
        ...currentQuery,
        category: category.id
      }

      if (params?.get('category') === category.id) {
        delete updatedQuery.category
      }

      const url = qs.stringifyUrl(
        {
          url: '/dulce-trago',
          query: updatedQuery
        },
        { skipNull: true }
      )

      // setCurrentCategory(category)
      router.push(url)
      // redirect(url)

      // router.replace(url, { shallow: true })
    },
    [currentCategoryId, params]
  )

  return (
    <>
      <Button
        onClick={onClick}
        key={`${category.id}${category.name}`}
        variant={isSelected ? 'solid' : 'flat'}
        color={isSelected ? 'primary' : 'secondary'}
        size='sm'
        className='min-w-fit flex text-sm'
      >
        <p className={`${isSelected ? 'text-white' : 'text-primary'}`}>
          {category.name}
        </p>
      </Button>
    </>
  )
}
