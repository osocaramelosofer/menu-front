'use client'

import React, { useRef } from 'react'
import { Input, Textarea } from '@nextui-org/react'
import { SubmitButton } from './submit-button'
import { handleUpdateStore } from '@/lib/actions/store.actions'
import type { IStore } from '@/interfaces/store'

export default function StoreForm ({ store }: { store: IStore }) {
  const ref = useRef<HTMLFormElement>(null)

  return (
    <form
      ref={ref}
      action={async formData => {
        await handleUpdateStore(formData, store.id)
      }}
      className='flex flex-col gap-5'
    >
      <Input
        isRequired
        maxLength={25}
        label='Nombre'
        name='name'
        defaultValue={store.name}
        placeholder='Ingresa el nombre de tu negocio'
      />

      <Textarea
        isRequired
        maxLength={250}
        defaultValue={store.description}
        label='Descripción'
        name='description'
        placeholder='Ingresa una breve descripción de tu negocio.'
      />

      <input type='hidden' name='storeId' value={store.id} />

      <SubmitButton label='Actualizar' />
    </form>
  )
}
