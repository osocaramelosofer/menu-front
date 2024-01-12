'use client'

import { type IProduct } from '@/interfaces/product'
import { useProductsStore } from '@/store/dulce_trago/products-store'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Code,
  Image
} from '@nextui-org/react'
import { FaDollarSign, FaChevronRight } from 'react-icons/fa'

export default function FeaturedProductCard ({
  product
}: {
  product: IProduct
}) {
  const { setSelectedProduct, openModal } = useProductsStore()
  const handleSelectedProduct = () => {
    setTimeout(() => {
      setSelectedProduct(product)
      openModal()
    }, 250)
  }
  let image = ''
  if (product.main_image !== null) {
    image = 'https://res.cloudinary.com/drzrkaoje/' + product.main_image
  } else {
    image = 'https://i.imgur.com/VjWugql.png'
  }

  return (
    <Card
      isPressable
      onPress={handleSelectedProduct}
      className='cursor-pointer rounded-xl shadow-xs border border-white
       bg-gradient-to-br from-secondary/50 to-background min-w-fit overflow-hidden'
    >
      <CardBody className='flex flex-col gap-2 max-w-[8.5rem] md:max-w-[12rem] overflow-hidden'>
        {/* Card Image */}
        <Image
          width={200}
          height={200}
          className=' object-cover aspect-square w-full h-full rounded-xl'
          src={image}
          alt='NextUI Image with fallback'
        />

        <div className='justify-between flex flex-col flex-1 gap-2'>
          {/* Card Info */}
          <div className='flex flex-col gap-1'>
            <div className='font-semibold text-sm capitalize line-clamp-1'>
              {product.name}
            </div>
            <div className='font-medium text-xs opacity-70 line-clamp-2'>
              {product.description}
            </div>
          </div>
        </div>
      </CardBody>
      {/* Footer */}
      <CardFooter className='justify-between flex flex-row items-center'>
        <Chip
          className=' text-sm'
          startContent={<FaDollarSign />}
          variant='light'
          color='primary'
        >
          {product.price}
        </Chip>
        <Button
          as={Code}
          onPress={handleSelectedProduct}
          className=' text-white rounded-xl'
          size='sm'
          isIconOnly
          color='primary'
        >
          <FaChevronRight />
        </Button>
      </CardFooter>
    </Card>
  )
}
