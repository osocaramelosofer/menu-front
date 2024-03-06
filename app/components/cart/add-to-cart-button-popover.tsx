'use client'
import { type IProduct } from '@/interfaces/product'
import { useCartsStore } from '@/store/dulce_trago/carts-store'

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@nextui-org/react'

export default function AddToCartButtonPopover ({
  product
}: {
  product: IProduct | null
}) {
  const { addToCart, calculateCartPrice } = useCartsStore()

  const handleAddToOrder = (product: IProduct) => {
    addToCart(product)
    calculateCartPrice()
  }

  return (
    <>
      {product != null && (
        <Popover
          shouldBlockScroll
          className='bg-success rounded-xl'
          color='success'
          onClose={() => {
            calculateCartPrice()
          }}
          showArrow
          offset={10}
        >
          <PopoverTrigger>
            <Button
              fullWidth
              size='sm'
              color='primary'
              variant='solid'
              className='text-white sweetDrink'
              onClick={() => {
                handleAddToOrder(product)
              }}
            >
              Agregar al carrito
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className='px-1 py-2 '>
              <div className='text-small font-bold'>¡Producto Agregado!</div>
              <div className='text-tiny'>
                Se ha agregado{' '}
                <span className=' font-bold'>{product.name}</span> <br />a tu
                carrito de compras.
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </>
  )
}
