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

export default function ProductDetailModal ({
  isOpen,
  onOpenChange
}: {
  isOpen: boolean
  onOpenChange: () => void
}) {
  const { selectedProduct: product } = useProductsStore()

  return (
    <Modal
      backdrop='blur'
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      radius='lg'
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader>
              <div className=' w-full flex-1 aspect-square shadow-sm relative rounded-xl overflow-hidden'>
                <Image
                  isBlurred
                  removeWrapper
                  alt='Woman listing to music'
                  isLoading={false}
                  className='object-cover h-full w-full rounded-lg'
                  src={`https://res.cloudinary.com/drzrkaoje/${product?.main_image}`}
                  //   src='https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg'
                />
              </div>
            </ModalHeader>
            <ModalBody>
              <div className=' flex flex-col gap-2'>
                <h1 className=' capitalize font-bold text-2xl'>
                  {product?.name}
                </h1>
                <Chip color='warning' variant='flat'>
                  {product?.category.name}
                </Chip>
              </div>
              <div>
                <h5 className=' font-bold'>Descripción</h5>
                <p className=' opacity-80'>{product?.description}</p>
              </div>
              <div>
                <h5 className=' font-bold mb-2'>Tamaños</h5>
                <div className='flex gap-2'>
                  <Button
                    color='primary'
                    variant='flat'
                    size='sm'
                    className='border-2 border-primary flex-1'
                  >
                    18 oz
                  </Button>
                  <Button variant='flat' size='sm' className=' flex-1'>
                    16 oz
                  </Button>
                  <Button variant='flat' size='sm' className=' flex-1'>
                    14 oz
                  </Button>
                </div>
              </div>
            </ModalBody>
            <ModalFooter className='flex justify-between items-center'>
              <div className='flex flex-col justify-center items-center'>
                <p className=' text-sm font-medium'>Precio</p>
                <h3 className=' text-2xl font-bold '>
                  <span className='text-success'>$</span>
                  {product?.price}
                </h3>
              </div>
              <Button
                color='primary'
                variant='solid'
                className=' text-white'
                onPress={onClose}
              >
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
