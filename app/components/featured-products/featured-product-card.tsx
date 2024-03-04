'use client'

import { type IProduct } from '@/interfaces/product'
import { getOptimizedImageUrl } from '@/lib/utils'
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
import { FaChevronRight } from 'react-icons/fa'

export default function FeaturedProductCard ({
  product
}: {
  product: IProduct
}) {
  const { setSelectedProduct, openModal } = useProductsStore()
  const handleSelectedProduct = () => {
    setSelectedProduct(product)
    openModal()
  }

  const image = getOptimizedImageUrl(product.main_image, 180)

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
          loading='lazy'
          width={200}
          height={200}
          className=' object-cover aspect-square w-full h-full rounded-xl'
          src={image}
          alt='NextUI Image with fallback'
        />

        {/* Card Info */}
        <div className='flex flex-col justify-between gap-1'>
          <div className='font-semibold text-sm line-clamp-1'>
            {product.name}
          </div>
          <div className='text-xs opacity-70 line-clamp-2'>
            {product.description}
          </div>
        </div>
      </CardBody>
      {/* Footer */}
      <CardFooter className='justify-between w-full flex flex-row items-center pt-0'>
        <Chip className=' text-sm px-0' variant='light' color='primary'>
          <strong>$ {product.price}</strong>
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
      {/* <AddToCartButtonPopover product={product} /> */}
    </Card>
  )
}
