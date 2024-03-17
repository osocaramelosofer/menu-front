'use client'

import clsx from 'clsx'
import { useProductsStore } from '@/zustand-store/products-store'

import { Button, Image, Chip, ScrollShadow } from '@nextui-org/react'
import AddToCartButtonPopover from '../cart/add-to-cart-button-popover'
import { getOptimizedImageUrl } from '@/lib/utils'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '../ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from '../ui/drawer'

export default function ProductDetailDialog ({
  themeColor
}: {
  themeColor?: string
}) {
  const {
    selectedProduct: product,
    isModalOpen,
    closeModal,
    setIsModalOpen
  } = useProductsStore()

  const isDesktop = true

  if (isDesktop) {
    return (
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className={clsx('', themeColor ?? '')}>
          <DialogHeader>
            {/* Product Name and Category */}
            <div className='flex flex-col gap-1'>
              <h1 className='font-bold text-2xl text-left'>{product?.name}</h1>

              <Chip size='sm' color='warning' variant='flat'>
                {product?.category?.name}
              </Chip>
            </div>
          </DialogHeader>
          <ScrollShadow
            hideScrollBar
            size={70}
            className='overflow-y-auto max-h-[70vh]'
          >
            {/* Product Image */}
            {product != null && (
              <div className='w-full flex-1  shadow-sm relative rounded-xl aspect-square'>
                <Image
                  alt='Product image in a detail modal'
                  className='object-cover h-full w-full rounded-xl aspect-square'
                  src={getOptimizedImageUrl(product.image, 470)}
                />
              </div>
            )}

            {/* Product Description */}
            <div className=' mt-2 text-start'>
              <h5 className='font-bold'>Descripción</h5>
              <p className='opacity-80 text-sm overflow-x-hidden'>
                {product?.description}
              </p>
            </div>
          </ScrollShadow>
          <DialogFooter>
            <div className='flex flex-1 w-full justify-between items-end'>
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
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={isModalOpen} onClose={closeModal}>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>
            <div className='flex flex-col gap-1'>
              <h1 className='font-bold text-2xl text-left'>{product?.name}</h1>
              <Chip size='sm' color='warning' variant='flat'>
                {product?.category?.name}
              </Chip>
            </div>
          </DrawerTitle>
          <div>
            {/* Product Image */}
            {product != null && (
              <div className='w-full flex-1  shadow-sm relative rounded-xl aspect-square'>
                <Image
                  alt='Product image in a detail modal'
                  className='object-cover h-full w-full rounded-xl aspect-square'
                  src={getOptimizedImageUrl(product.image, 450)}
                />
              </div>
            )}
          </div>
          {/* Product Description */}
          <DrawerDescription className='text-start mt-2 overflow-y-auto max-h-44'>
            <h5 className='font-bold text-base'>Descripción</h5>
            <p className='opacity-80 text-sm overflow-x-hidden'>
              {product?.description}
            </p>
          </DrawerDescription>
        </DrawerHeader>

        <DrawerFooter className='pt-2'>
          <div className=' flex flex-1 w-full justify-between items-end'>
            <div>
              <p className='text-sm text-center'>Precio</p>
              <h3 className='text-xl font-bold text-center'>
                <span className='text-success'>$</span>
                {product?.price}
              </h3>
            </div>
            <div className=' flex gap-2 items-end'>
              <DrawerClose asChild>
                <Button
                  size='sm'
                  color='danger'
                  variant='light'
                  onPress={closeModal}
                >
                  Cerrar
                </Button>
              </DrawerClose>
              <AddToCartButtonPopover product={product} />
            </div>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
