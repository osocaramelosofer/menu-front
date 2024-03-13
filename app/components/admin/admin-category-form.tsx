'use client'

import React, { useRef } from 'react'

import { addCategory } from '@/lib/actions'
import { Input } from '@nextui-org/react'
import { SubmitButton } from './submit-button'

export default function AdminCategoryForm ({
  storeId,
  changeTab
}: {
  storeId: string | number
  changeTab: () => void
}) {
  const ref = useRef<HTMLFormElement>(null)

  return (
    <div className='flex flex-col w-full h-full py-4'>
      <form
        ref={ref}
        action={async formData => {
          await addCategory(formData, storeId)
          changeTab()
        }}
        className='flex flex-col gap-5'
      >
        <Input
          isRequired
          label='Nombre'
          name='name'
          placeholder='Ingresa el nombre de la categoría'
        />

        <input type='hidden' name='storeId' value={storeId} />

        <SubmitButton label='Agregar nueva categoría' />
      </form>
    </div>
  )
}
