import qs from 'query-string'
import type { Category } from '@/interfaces/product'
import { Button } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
export default function CategoryItem ({ category }: { category: Category }) {
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
    router.push(url, { scroll: false })
  }

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
