'use client'

import React, { type ChangeEvent, useRef, useState } from 'react'
import type { ICategory } from '@/interfaces/product'
import { addProduct } from '@/lib/actions'
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import { useAdminStore } from '@/zustand-store/admin-store'
import { SubmitButton } from './submit-button'
import { FaPlus } from 'react-icons/fa'
import UploadProductImage from '../upload-product-image'

export default function ProductForm ({
  categories,
  storeId,
  changeTab
}: {
  categories: ICategory[]
  storeId: string | number
  changeTab: () => void
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
    <form
      ref={ref}
      action={async formData => {
        await addProduct(formData, storeId)
        closeModal('productCategoryModal')
      }}
      className='flex flex-col gap-5'
    >
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

      <div className='flex gap-3 items-end'>
        <Select
          size='sm'
          isRequired
          isDisabled={categories.length === 0}
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
        <Button isIconOnly size='lg' onPress={changeTab}>
          <FaPlus />
        </Button>
      </div>
      <input type='hidden' name='category' value={categoryValue} />

      <SubmitButton label='Crear Nuevo Producto' />
    </form>
  )
}
