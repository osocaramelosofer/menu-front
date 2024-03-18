'use client'

import clsx from 'clsx'
import { useProductsStore } from '@/zustand-store/products-store'

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
import AddToCartButtonPopover from '../cart/add-to-cart-button-popover'
import { getOptimizedImageUrl } from '@/lib/utils'

export default function ProductDetailModal ({
  themeColor
}: {
  themeColor?: string
}) {
  const {
    selectedProduct: product,
    isModalOpen,
    closeModal
  } = useProductsStore()

  return (
    <Modal
      backdrop='opaque'
      disableAnimation
      isOpen={isModalOpen}
      onClose={closeModal}
      radius='lg'
      scrollBehavior='inside'
      className={clsx('overflow-hidden', themeColor ?? '')}
    >
      <ModalContent>
        {closeModal => (
          <>
            <ModalHeader>
              {/* Product Name and Category */}
              <div className='flex flex-col gap-1'>
                <h1 className='font-bold text-2xl'>{product?.name}</h1>

                <Chip size='sm' color='warning' variant='flat'>
                  {product?.category?.name}
                </Chip>
              </div>
            </ModalHeader>
            <ModalBody>
              {/* Product Image */}
              {product != null && (
                <div className='w-full flex-1  shadow-sm relative rounded-xl aspect-square'>
                  <Image
                    alt='Product image in a detail modal'
                    className='object-cover h-full w-full rounded-xl aspect-square'
                    src={getOptimizedImageUrl(product.image, 'auto')}
                  />
                </div>
              )}

              {/* Product Description */}
              <div>
                <h5 className='font-bold'>Descripción</h5>
                <p className='opacity-80 text-sm overflow-x-hidden'>
                  {product?.description}
                </p>
              </div>
              {/* Product Sizes  */}
              {/* <div className=' flex  flex-1 flex-col w-full'>
                <h5 className='font-bold mb-2'>Tamaños</h5>
                <div className='flex gap-2'>
                  <Button
                    color='primary'
                    variant='flat'
                    size='sm'
                    className='border-2 border-primary flex-1'
                  >
                    18 oz
                  </Button>
                  <Button variant='flat' size='sm' className='flex-1'>
                    16 oz
                  </Button>
                  <Button variant='flat' size='sm' className='flex-1'>
                    14 oz
                  </Button>
                </div>
              </div> */}
            </ModalBody>
            <ModalFooter>
              <div className=' flex flex-1 w-full justify-between items-end'>
                <div>
                  <p className='text-sm text-center'>Precio</p>
                  <h3 className='text-xl font-bold text-center'>
                    <span className='text-success'>$</span>
                    {product?.price}
                  </h3>
                </div>
                <div className=' flex gap-2 items-end'>
                  <Button
                    size='sm'
                    color='danger'
                    variant='light'
                    onPress={closeModal}
                  >
                    Cerrar
                  </Button>
                  <AddToCartButtonPopover product={product} />
                </div>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
