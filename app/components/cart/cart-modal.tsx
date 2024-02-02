'use client'
import { useCartsStore } from '@/store/dulce_trago/carts-store'
import { useProductsStore } from '@/store/dulce_trago/products-store'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Image,
  Chip
} from '@nextui-org/react'
import CartProductCard from '../cart/cart-product-card'
import { useEffect } from 'react'

export default function CartModal () {
  const {
    cartList,
    addToCart,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    calculateCartPrice,
    cartPrice,
    isModalOpen,
    closeModal
  } = useCartsStore()

  const { products, getProductsList } = useProductsStore()

  const incrementCartItemQuantityHandler = (id: number) => {
    incrementCartItemQuantity(id)
  }

  const decrementCartItemQuantityHandler = (id: number) => {
    decrementCartItemQuantity(id)
  }

  useEffect(() => {
    calculateCartPrice()
  }, [])

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      size='4xl'
      placement='center'
      scrollBehavior='inside'
    >
      <ModalContent>
        {closeModal => (
          <>
            <ModalHeader>
              {/* Product Name and Category */}
              <div className='flex flex-col gap-1'>
                <h1 className='font-bold text-2xl'>CART</h1>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className='border'>
                <h1>CART</h1>
                <h1>TOTAL: ${cartPrice}</h1>

                <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8'>
                  {cartList.map(product => (
                    <CartProductCard
                      key={product.id}
                      product={product}
                      incrementCartItemQuantityHandler={
                        incrementCartItemQuantityHandler
                      }
                      decrementCartItemQuantityHandler={
                        decrementCartItemQuantityHandler
                      }
                    />
                  ))}
                </div>
              </div>
            </ModalBody>
            <ModalFooter className='flex flex-col justify-between items-center gap-4'>
              <div className=' flex flex-1 w-full justify-between items-end'>
                <div className='flex flex-col justify-center items-center'>
                  <p className='text-sm font-medium'>Precio</p>
                  <h3 className='text-2xl font-bold '>
                    <span className='text-success'>$</span>
                    {cartPrice}
                  </h3>
                </div>
                <Button
                  color='primary'
                  variant='solid'
                  className='text-white'
                  onPress={closeModal}
                >
                  Cerrar
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
