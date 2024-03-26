'use client'
import { revalidateLiveQueries } from '@/app/providers'
// types
import type { ICategory } from '@/interfaces/product'
import { deleteCategoryAction } from '@/lib/actions/category.actions'
// components
import { Chip } from '@nextui-org/react'
import { useState } from 'react'

export default async function CategoryChipDeletable ({
  category
}: {
  category: ICategory
}) {
  const [loading, setLoading] = useState(false)

  async function removeProductEvent () {
    // Muestra un cuadro de diálogo de confirmación
    const message =
      '¿Estás seguro de que quieres eliminar esta categoría y sus productos relacionados?\n' +
      'Al confirmar, se eliminará la categoría y todos lo productos que estén relacionados a ella'

    const isConfirmed = window.confirm(message)
    if (isConfirmed) {
      setLoading(true)
      await deleteCategoryAction(category.id)

      // Actualiza los datos locales
      await revalidateLiveQueries()
      setLoading(false)
    }
  }

  return (
    <Chip
      onClose={removeProductEvent}
      isCloseable
      isDisabled={loading}
      size='lg'
      variant='flat'
      color='warning'
    >
      {category.name}
    </Chip>
  )
}
