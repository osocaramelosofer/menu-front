'use client'

import { type IProduct } from '@/interfaces/product'
import { deleteProduct } from '@/lib/actions'
import { useProductsStore } from '@/zustand-store/products-store'
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

export default function DropdownProductActions ({
  product
}: {
  product: IProduct
}) {
  const { setSelectedProduct, selectedProduct } = useProductsStore()
  const [loading, setLoading] = useState(false)
  const handleSelectedProduct = () => {
    setSelectedProduct(product)
  }

  const handleDeleteProduct = async () => {
    setLoading(true)
    await deleteProduct(product.id)
  }

  return (
    <Dropdown onOpenChange={handleSelectedProduct} showArrow backdrop='opaque'>
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
          <p className='font-semibold'>{selectedProduct?.name}</p>
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
          onPress={handleDeleteProduct}
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
            onPress={handleDeleteProduct}
          >
            Eliminar Producto
          </Button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
