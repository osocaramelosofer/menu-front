'use client'

import { type IProduct } from '@/interfaces/product'
import { deleteProduct } from '@/lib/actions'
import { getOptimizedImageUrl } from '@/lib/utils'
import { useProductsStore } from '@/store/dulce_trago/products-store'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Code,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Switch
} from '@nextui-org/react'
import { useState } from 'react'
import { FaEllipsisV, FaTrash } from 'react-icons/fa'

export default function AdminProductCard ({ product }: { product: IProduct }) {
  const { setSelectedProduct, selectedProduct } = useProductsStore()
  const [loading, setLoading] = useState(false)
  const handleSelectedProduct = () => {
    setSelectedProduct(product)
  }

  // const image = getOptimizedImageUrl(product.main_image, 180)
  const image = 'https://i.imgur.com/mhYwQyfm.png'

  const handleDeleteProduct = async () => {
    setLoading(true)
    await deleteProduct(product.id)
  }

  return (
    <Card
      isPressable
      onPress={handleSelectedProduct}
      className='cursor-pointer rounded-xl shadow-xs border border-white
       bg-gradient-to-br from-secondary/50 to-background min-w-fit overflow-hidden'
    >
      <CardBody className='flex flex-col gap-2 max-w-[6.5rem] md:max-w-[12rem] overflow-hidden'>
        {/* Card Image */}
        <Image
          loading='lazy'
          width={200}
          height={200}
          className=' object-cover aspect-square w-full h-full rounded-xl'
          src={image}
          alt='NextUI Image with fallback'
        />

        {/* Card Info */}
        <div className='flex flex-col justify-between gap-1'>
          <div className='font-semibold text-xs line-clamp-1'>
            {product.name}
          </div>

          <div className='text-xs opacity-70 line-clamp-2'>
            {product.description}
          </div>
        </div>
      </CardBody>
      {/* Footer */}
      <CardFooter className='justify-between flex flex-row items-center pt-0'>
        <Chip className=' text-sm' variant='light' color='success'>
          $ {product.price}
        </Chip>
        <div className=' absolute right-1 top-1 z-10'>
          <Dropdown
            onOpenChange={handleSelectedProduct}
            showArrow
            backdrop='opaque'
          >
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
        </div>
      </CardFooter>
    </Card>
  )
}
