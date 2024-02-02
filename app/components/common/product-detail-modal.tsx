'use client'
import { type IProduct } from '@/interfaces/product'
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

export default function ProductDetailModal () {
  const {
    selectedProduct: product,
    isModalOpen,
    closeModal
  } = useProductsStore()

  const { openModal, addToCart } = useCartsStore()

  let image = ''
  if (product?.main_image != null && product !== null) {
    const pathArray = product.main_image.split('/')
    const uploadIndex = pathArray.indexOf('upload')
    pathArray.splice(uploadIndex + 1, 0, 'w_500,q_auto,f_webp')
    const optimizedImagePath = pathArray.join('/')
    image = 'https://res.cloudinary.com/drzrkaoje/' + optimizedImagePath
  } else {
    image = 'https://i.imgur.com/VjWugqlm.png'
  }

  const handleAddToOrder = (product: IProduct) => {
    openModal()
    addToCart(product)
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
                <h1 className='font-bold text-2xl'>{product?.name}</h1>

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
            <ModalFooter className='flex flex-col justify-between items-center gap-4'>
              <div className=' flex flex-1 w-full justify-between items-end'>
                <div className='flex flex-col justify-center items-center'>
                  <p className='text-sm font-medium'>Precio</p>
                  <h3 className='text-2xl font-bold '>
                    <span className='text-success'>$</span>
                    {product?.price}
                  </h3>
                </div>
                <div className=' flex gap-3'>
                  <Button
                    size='sm'
                    color='danger'
                    variant='flat'
                    onPress={closeModal}
                  >
                    Cerrar
                  </Button>
                  <Button
                    size='sm'
                    color='primary'
                    variant='solid'
                    className='text-white'
                    onPress={() => {
                      handleAddToOrder(product)
                    }}
                  >
                    Agregar a la orden
                  </Button>
                </div>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
