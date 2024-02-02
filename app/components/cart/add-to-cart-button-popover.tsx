'use client'
import { type IProduct } from '@/interfaces/product'
import { useCartsStore } from '@/store/dulce_trago/carts-store'

import {
  Button,
  Chip,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@nextui-org/react'

export default function AddToCartButtonPopover ({
  product
}: {
  product: IProduct | null
}) {
  const { addToCart } = useCartsStore()

  const handleAddToOrder = (product: IProduct) => {
    addToCart(product)
  }

  return (
    <>
      {product != null && (
        <Popover
          color='primary'
          onOpenChange={() => {
            handleAddToOrder(product)
          }}
          placement='bottom'
          showArrow
          offset={10}
        >
          <PopoverTrigger>
            <Button
              as={Chip}
              //   startContent={<FaPlus />}

              color='primary'
              variant='solid'
              className='text-white'
              onPress={() => {
                handleAddToOrder(product)
              }}
            >
              Agregar al carrito
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className='px-1 py-2 text-white'>
              <div className='text-small font-bold'>¡Producto Agregado!</div>
              <div className='text-tiny'>
                Se ha agregado {product.name} <br />a tu carrito de compras.
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </>
  )
}
