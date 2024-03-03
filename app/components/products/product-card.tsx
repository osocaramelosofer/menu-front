'use client'
import { Card, CardBody, Chip, Image } from '@nextui-org/react'
import { type IProduct } from '@/interfaces/product'
import { useProductsStore } from '@/store/dulce_trago/products-store'
import { FaChevronRight, FaDollarSign } from 'react-icons/fa'

export default function ProductCard ({ product }: { product: IProduct }) {
  const { setSelectedProduct, openModal } = useProductsStore()
  const handleSelectedProduct = () => {
    setSelectedProduct(product)
    openModal()
  }
  let image = ''
  if (product?.main_image != null && product !== null) {
    const pathArray = product.main_image.split('/')
    const uploadIndex = pathArray.indexOf('upload')
    pathArray.splice(uploadIndex + 1, 0, 'w_280,q_auto,f_webp')
    const optimizedImagePath = pathArray.join('/')
    image = 'https://res.cloudinary.com/drzrkaoje/' + optimizedImagePath
  } else {
    image = 'https://i.imgur.com/VjWugqlm.png'
  }

  return (
    <Card
      isPressable
      onClick={handleSelectedProduct}
      className='cursor-pointer rounded-xl shadow-xs border border-white  bg-gradient-to-br from-secondary/50 to-background overflow-hidden'
    >
      <CardBody className='flex flex-row md:flex-col gap-2 overflow-hidden'>
        {/* Card Image */}
        <Image
          loading='lazy'
          width={300}
          height={300}
          className=' object-cover max-w-[8rem] md:min-w-full aspect-square'
          src={image}
          alt='Dulce Trago Product Image'
        />

        <div className='justify-between flex flex-col flex-1 gap-2'>
          {/* Card Info */}
          <div className='flex flex-col gap-1'>
            <div className='font-semibold text-base line-clamp-1'>
              {product.name}
            </div>
            <div className='font-medium text-sm opacity-70 line-clamp-2'>
              {product.description}
            </div>
          </div>

          {/* Footer */}
          <div className='justify-end flex flex-row items-center'>
            <Chip
              className=' text-sm px-0'
              endContent={<FaChevronRight />}
              variant='light'
              color='primary'
            >
              <strong>$ {product.price}</strong>
            </Chip>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
