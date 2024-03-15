'use client'

import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

interface EmptyStateProps {
  title?: string
  subtitle?: string
  storeId?: string | number
}

export default function EmptyState ({
  title = 'Sin coincidencias exactas',
  subtitle = 'Intenta ajustar los filtros o explora otras categorías.',
  storeId
}: EmptyStateProps) {
  // const { resetCurrentCategory } = useCategoriesStore()
  const router = useRouter()
  const handleResetCategoryFilter = () => {
    router.push(`/${storeId}`, { scroll: false })
  }
  return (
    <div className='h-[40vh] flex flex-col gap-2 justify-center items-center px-4 text-center'>
      <h1 className=' text-2xl font-semibold'>{title}</h1>
      <p className=' opacity-70 font-medium text-sm'>{subtitle}</p>
      {storeId !== undefined && (
        <div className='w-48 mt-4'>
          <Button
            radius='full'
            color='primary'
            variant='flat'
            onClick={handleResetCategoryFilter}
          >
            Restablecer Filtros
          </Button>
        </div>
      )}
    </div>
  )
}
