'use client'

import React, { useRef } from 'react'
import { Input, Textarea } from '@nextui-org/react'
import { SubmitButton } from './submit-button'
import { handleUpdateStore } from '@/lib/actions/store.actions'
import type { IStore } from '@/interfaces/store'
import UploadProductImage from '../upload-product-image'
import { getOptimizedImageUrl } from '@/lib/utils'
import { useAdminStore } from '@/zustand-store/admin-store'
import PopoverInfo from '../../common/popover-info'

export default function StoreForm ({ store }: { store: IStore }) {
  const { closeModal } = useAdminStore()
  const ref = useRef<HTMLFormElement>(null)

  return (
    <form
      ref={ref}
      action={async formData => {
        await handleUpdateStore(formData, store.id)
        closeModal('storeModal')
      }}
      className='flex flex-col gap-5'
    >
      <UploadProductImage
        currentImage={store.logoUrl}
        inputName='logoUrl'
        popoverLabel={
          <div className=' flex gap-2'>
            <h2 className=' font-medium opacity-80'>
              Agrega una foto de tu negocio
            </h2>
            <PopoverInfo
              title='¡Muestra a todos tu marca!'
              subtitle='Recuerda que solamente podrás elegir una imagen, elige con sabiduría y haz que tu negocio luzca lo mejor posible. ¡La elección es tuya, asegúrate de que sea la mejor!'
            />
          </div>
        }
      />
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

      <Input
        maxLength={300}
        label='Dirección'
        name='address'
        defaultValue={store.address}
        placeholder='Ingresa la dirección de tu negocio'
      />
      <Input
        maxLength={100}
        label='Instagram Url'
        name='igUrl'
        defaultValue={store.igUrl}
        placeholder='Pon aquí tu Instagram'
      />
      <Input
        maxLength={10}
        label='Celular'
        name='phone'
        defaultValue={store.phone}
        placeholder='Ingresa tu numero de celular'
      />

      <input type='hidden' name='storeId' value={store.id} />

      <SubmitButton label='Actualizar' />
    </form>
  )
}
