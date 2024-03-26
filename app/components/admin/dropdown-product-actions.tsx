'use client'

import { type IProduct } from '@/interfaces/product'
import {
  Button,
  Code,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Switch
} from '@nextui-org/react'

import { useState } from 'react'
import { FaEllipsisV, FaTrash } from 'react-icons/fa'

import { deleteProductAction } from '@/lib/actions/product.actions'
import { revalidateLiveQueries } from '@/app/providers'

export default function DropdownProductActions ({
  product,
  mutate
}: {
  product: IProduct
  mutate?: any
}) {
  const [loading, setLoading] = useState(false)

  async function removeProductEvent () {
    setLoading(true)

    await deleteProductAction(product.id)

    // Actualiza los datos locales
    // await mutate()
    await revalidateLiveQueries()
    setLoading(false)
  }

  return (
    <Dropdown showArrow backdrop='opaque'>
      <DropdownTrigger>
        <Button
          as={Code}
          size='sm'
          isIconOnly
          variant='faded'
          radius='full'
          color='primary'
        >
          <FaEllipsisV />
        </Button>
      </DropdownTrigger>
      <DropdownMenu disabledKeys={['edit']} aria-label='Static Actions'>
        <DropdownItem
          showDivider
          textValue='Product Info'
          key='product-info'
          className='h-14 gap-2'
        >
          <p>Acciones para</p>
          <p className='font-semibold'>{product.name}</p>
        </DropdownItem>
        <DropdownItem
          textValue='switch to update availability'
          isReadOnly
          showDivider
          key='edit'
          endContent={
            <Switch
              size='sm'
              color='success'
              defaultSelected
              aria-label='Automatic updates'
            />
          }
        >
          Producto <br /> <strong>Disponible</strong>
        </DropdownItem>

        <DropdownItem
          isReadOnly
          textValue='delete product'
          key='delete'
          className='text-danger'
          color='danger'
        >
          <Button
            isDisabled={loading}
            isLoading={loading}
            size='sm'
            fullWidth
            color='danger'
            startContent={<FaTrash />}
            onPress={removeProductEvent}
          >
            Eliminar Producto
          </Button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
