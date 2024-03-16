'use client'

import { type IProduct } from '@/interfaces/product'

import { useProductsStore } from '@/zustand-store/products-store'
import { Card, CardBody, CardFooter, Chip, Image } from '@nextui-org/react'

import DropdownProductActions from './dropdown-product-actions'
import { getOptimizedImageUrl } from '@/lib/utils'

export default function AdminProductCard ({ product }: { product: IProduct }) {
  const { setSelectedProduct } = useProductsStore()
  const handleSelectedProduct = () => {
    setSelectedProduct(product)
  }
  const image = getOptimizedImageUrl(product.image, 180)

  return (
    <Card
      isPressable
      onPress={handleSelectedProduct}
      className='cursor-pointer rounded-xl shadow-xs border border-white
       bg-gradient-to-br from-primary/10 to-background min-w-fit overflow-hidden'
    >
      <CardBody className='flex flex-col gap-2 max-w-[6.5rem] md:max-w-[12rem] overflow-hidden'>
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
          <div className='font-semibold text-xs line-clamp-1'>
            {product.name}
          </div>

          <div className='text-xs opacity-70 line-clamp-2'>
            {product.description}
          </div>
        </div>
      </CardBody>
      {/* Footer */}
      <CardFooter className='justify-between flex flex-row items-center pt-0'>
        <Chip className=' text-sm' variant='light' color='success'>
          $ {product.price}
        </Chip>
        <div className=' absolute right-1 top-1 z-10'>
          <DropdownProductActions product={product} />
        </div>
      </CardFooter>
    </Card>
  )
}
