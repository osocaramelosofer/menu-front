'use client'
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

export default function ProductDetailModal () {
  const {
    selectedProduct: product,
    isModalOpen,
    closeModal
  } = useProductsStore()

  let image = ''
  if (product?.main_image !== null) {
    image = 'https://res.cloudinary.com/drzrkaoje/' + product?.main_image
  } else {
    image = 'https://i.imgur.com/VjWugql.png'
  }

  return (
    <Modal
      backdrop='blur'
      isOpen={isModalOpen}
      onClose={closeModal}
      radius='lg'
      scrollBehavior='inside'
    >
      <ModalContent>
        {closeModal => (
          <>
            <ModalHeader>
              {/* Product Name and Category */}
              <div className='flex flex-col gap-1'>
                <h1 className='capitalize font-bold text-2xl'>
                  {product?.name}
                </h1>

                <Chip size='sm' color='warning' variant='flat'>
                  {product?.category.name}
                </Chip>
              </div>
            </ModalHeader>
            <ModalBody>
              {/* Product Image */}
              <div className='w-full flex-1  shadow-sm relative rounded-xl'>
                <Image
                  alt='Woman listing to music'
                  // removeWrapper
                  isZoomed
                  className='object-cover h-full w-full rounded-xl'
                  src={image}
                />
              </div>

              {/* Product Description */}
              <div>
                <h5 className='font-bold'>Descripción</h5>
                <p className='opacity-80 text-sm'>{product?.description}</p>
              </div>
              {/* Product Sizes  */}
              <div className=' flex  flex-1 flex-col w-full'>
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
              </div>
            </ModalBody>
            <ModalFooter className='flex flex-col justify-between items-center gap-4'>
              <div className=' flex flex-1 w-full justify-between items-end'>
                <div className='flex flex-col justify-center items-center'>
                  <p className='text-sm font-medium'>Precio</p>
                  <h3 className='text-2xl font-bold '>
                    <span className='text-success'>$</span>
                    {product?.price}
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
