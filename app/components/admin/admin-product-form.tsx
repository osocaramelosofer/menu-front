'use client'

import React, { useRef, useState } from 'react'
import type { Category } from '@/interfaces/product'
import { addProduct } from '@/lib/actions'
import { Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import UploadProductImage from './upload-product-image'
import PopoverInfo from '../common/popover-info'
import { useAdminStore } from '@/store/dulce_trago/admin-store'
import { SubmitButton } from './submit-button'

export default function AdminProductForm ({
  categories
}: {
  categories: Category[]
}) {
  const { closeModal } = useAdminStore()
  const [categoryValue, setCategoryValue] = useState<string>('')
  const ref = useRef<HTMLFormElement>(null)

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategoryValue(event.target.value)
  }

  function handlePriceChange (event: any) {
    // Asegúrate de que el valor no sea negativo.
    const value = Math.max(1, parseFloat(event.target.value))
    // Actualiza el valor del input con el valor no negativo.
    event.target.value = value.toFixed(2)
  }

  return (
    <section className='flex flex-col w-full h-full py-4'>
      <form
        ref={ref}
        action={async formData => {
          await addProduct(formData)
          closeModal()
        }}
        className='flex flex-col gap-5'
      >
        <div className=' flex gap-2'>
          <h2 className=' font-medium opacity-80'>
            Agrega una foto de tu producto
          </h2>
          <PopoverInfo
            title='¡Muestra a todos cómo es tu producto!'
            subtitle='Recuerda que solamente podrás elegir una imagen, elige con sabiduría y haz que tu producto luzca lo mejor posible. ¡La elección es tuya, asegúrate de que sea la mejor!'
          />
        </div>
        <UploadProductImage />

        <Input
          isRequired
          label='Nombre'
          name='name'
          placeholder='Ingresa el nombre del Producto'
        />
        <Textarea
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
          min='1'
          onChange={handlePriceChange}
          placeholder='0.00'
          endContent='(MXN)'
          startContent={
            <div className='pointer-events-none flex items-center'>
              <span className='text-default-400 text-small'>$</span>
            </div>
          }
        />

        <Select
          isRequired
          label='Categoría'
          placeholder='Elige una categoría'
          onChange={handleSelectionChange}
        >
          {categories.map(category => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </Select>
        <input type='hidden' name='category' value={categoryValue} />

        <SubmitButton />
      </form>
    </section>
  )
}
