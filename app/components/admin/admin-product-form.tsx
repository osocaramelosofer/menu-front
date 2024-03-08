'use client'

import React, { type ChangeEvent, useRef, useState } from 'react'
import type { Category } from '@/interfaces/product'
import { addProduct } from '@/lib/actions'
import { Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import UploadProductImage from './upload-product-image'
import PopoverInfo from '../common/popover-info'
import { useAdminStore } from '@/store/dulce_trago/admin-store'
import { SubmitButton } from './submit-button'

export default function AdminProductForm ({
  categories,
  storeId
}: {
  categories: Category[]
  storeId: string | number
}) {
  const { closeModal } = useAdminStore()
  const [categoryValue, setCategoryValue] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const ref = useRef<HTMLFormElement>(null)

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategoryValue(event.target.value)
  }

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>): void => {
    let inputValue = event.target.value

    // Primero, asegura que el input sea solo numérico o punto decimal
    inputValue = inputValue.replace(/[^0-9.]/g, '')

    // Permite solo un punto decimal en el valor
    const parts = inputValue.split('.')
    if (parts.length > 2) {
      // Si hay más de un punto, reconstruye el string con solo el primer punto
      inputValue = parts[0] + '.' + parts.slice(1).join('')
    }

    let integerPart = parts[0]
    if (integerPart.length > 1 && integerPart.startsWith('0')) {
      // Evita múltiples ceros al inicio, a menos que sea parte de un número decimal
      integerPart = integerPart.replace(/^0+/, '')
    }

    // Asegura que el punto decimal se mantiene si el usuario lo ingresa al final
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    let decimalPart = parts[1] ? parts[1] : ''
    if (inputValue.endsWith('.')) {
      // Permite el punto decimal al final
      inputValue = `${integerPart}.`
    } else if (decimalPart !== '') {
      // Limita los decimales a dos si hay un punto decimal
      decimalPart = decimalPart.slice(0, 2) // Limita a dos decimales
      inputValue = `${integerPart}.${decimalPart}`
    } else {
      inputValue = integerPart
    }

    if (inputValue === '.') {
      inputValue = '0.'
    }

    setPrice(inputValue)
  }

  return (
    <section className='flex flex-col w-full h-full py-4'>
      <form
        ref={ref}
        action={async formData => {
          await addProduct(formData, storeId)
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
          maxLength={7}
          isRequired
          label='Precio'
          name='price'
          type='text'
          min='1'
          color={/^0(\.0{0,2})?$/.test(price) ? 'warning' : 'default'}
          value={price}
          onChange={handlePriceChange}
          placeholder='0.00'
          endContent={/^0(\.0{0,2})?$/.test(price) ? 'GRATIS' : '(MXN)'}
          startContent={
            <div className='pointer-events-none flex items-center'>
              <span className='text-small text-success'>$</span>
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
