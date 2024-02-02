'use client'
import { Button, Input } from '@nextui-org/react'
import { type Session } from 'next-auth'

export default async function AdminProductForm ({
  session
}: {
  session: Session | null
}) {
  return (
    <section className='flex flex-col w-full h-full px-4 py-8 border'>
      <form className='flex flex-col gap-4'>
        <Input
          isRequired
          label='Nombre'
          placeholder='Ingresa el nombre del Producto'
        />
        <Input
          isRequired
          label='Descripción'
          placeholder='Ingresa una descripción del producto'
        />
        <Input
          isRequired
          label='Precio'
          placeholder='Ingresa el Precio del producto'
        />
        <Input
          type='number'
          label='Store'
          placeholder='2'
          labelPlacement='outside'
          defaultValue='2'
        />

        <div className='flex gap-2'>
          <Button color='warning' variant='flat' onPress={() => {}}>
            Crear Nuevo Producto
          </Button>
        </div>
      </form>
    </section>
  )
}
