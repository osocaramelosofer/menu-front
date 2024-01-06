'use client'

import { useCategoriesStore } from '@/store/dulce_trago/categories-store'
import { Button } from '@nextui-org/react'

interface EmptyStateProps {
  title?: string
  subtitle?: string
}

export default function EmptyState ({
  title = 'Sin coincidencias exactas',
  subtitle = 'Prueba a cambiar o quitar algunos de tus filtros'
}: EmptyStateProps) {
  const { resetCurrentCategory } = useCategoriesStore()
  return (
    <div className='h-[40vh] flex flex-col gap-2 justify-center items-center px-4 text-center'>
      <h1 className=' text-2xl font-semibold'>{title}</h1>
      <p className=' opacity-70 font-medium text-sm'>{subtitle}</p>
      <div className='w-48 mt-4'>
        <Button
          radius='full'
          color='primary'
          variant='flat'
          onClick={resetCurrentCategory}
        >
          Eliminar todos los filtros
        </Button>
      </div>
    </div>
  )
}
