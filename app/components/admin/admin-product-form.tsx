'use client'

import { addProduct } from '@/lib/actions'
import { Button, Input } from '@nextui-org/react'
import UploadProductImage from './upload-product-image'

export default function AdminProductForm () {
  return (
    <section className='flex flex-col w-full h-full px-4 py-8 border'>
      <form action={addProduct} className='flex flex-col gap-4'>
        <UploadProductImage />
        <Input
          isRequired
          label='Nombre'
          name='name'
          placeholder='Ingresa el nombre del Producto'
        />
        <Input
          isRequired
          label='Descripción'
          name='description'
          placeholder='Ingresa una descripción del producto'
        />
        <Input
          isRequired
          label='Precio'
          name='price'
          type='number'
          placeholder='Ingresa el Precio del producto'
        />
        <Input
          type='number'
          label='Category'
          name='category'
          labelPlacement='outside'
        />

        <div className='flex gap-2'>
          <Button color='success' variant='shadow' fullWidth type='submit'>
            Crear Nuevo Producto
          </Button>
        </div>
      </form>
    </section>
  )
}
