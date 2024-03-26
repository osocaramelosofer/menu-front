'use client'

import React, { useRef } from 'react'

import { Input, Textarea } from '@nextui-org/react'
import { SubmitButton } from './submit-button'
import UploadProductImage from '../upload-product-image'
import PopoverInfo from '../../common/popover-info'
import { useAdminStore } from '@/zustand-store/admin-store'
import { addBanner } from '@/lib/actions/banner.actions'

export default function BannerForm ({ storeId }: { storeId: string | number }) {
  const ref = useRef<HTMLFormElement>(null)
  const { closeModal } = useAdminStore()

  return (
    <form
      ref={ref}
      action={async formData => {
        await addBanner(formData, storeId)
        closeModal('bannerModal')
      }}
      className='flex flex-col gap-5'
    >
      <UploadProductImage
        inputName='image'
        popoverLabel={
          <div className=' flex gap-2'>
            <h2 className=' font-medium opacity-80'>
              Agrega una foto para tu Banner
            </h2>
            <PopoverInfo
              title='¡Muestra a todos algo que quieras destacar!'
              subtitle='Recuerda que solamente podrás elegir una imagen, elige con sabiduría y haz que tu negocio luzca lo mejor posible. ¡La elección es tuya, asegúrate de que sea la mejor!'
            />
          </div>
        }
      />
      <Input
        isRequired
        maxLength={40}
        label='Titulo'
        name='title'
        placeholder='Ingresa el titulo del banner'
      />
      <Input
        maxLength={40}
        isRequired
        label='Subtitulo'
        name='subtitle'
        placeholder='Ingresa un subtitulo para tu banner'
      />
      <Textarea
        isRequired
        maxLength={150}
        label='Descripción'
        name='description'
        placeholder='Ingresa una breve descripción del banner'
      />

      <input required type='hidden' name='storeId' value={storeId} />

      <SubmitButton label='Agregar nuevo Banner' />
    </form>
  )
}
