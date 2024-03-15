'use client'
import { Card, CardBody, CardHeader, Chip, Image } from '@nextui-org/react'
import { type IProduct } from '@/interfaces/product'
import { useProductsStore } from '@/zustand-store/products-store'
import { FaChevronRight } from 'react-icons/fa'
import { getOptimizedImageUrl } from '@/lib/utils'

export default function ProductCard ({ product }: { product: IProduct }) {
  const { setSelectedProduct, openModal } = useProductsStore()
  const handleSelectedProduct = () => {
    setSelectedProduct(product)
    openModal()
  }
  // const image = getOptimizedImageUrl(product.main_image, 280)
  const image = 'https://i.imgur.com/mhYwQyfm.png'

  return (
    <Card
      isPressable
      disableRipple
      onClick={handleSelectedProduct}
      className='cursor-pointer rounded-xl shadow-xs border border-black border-opacity-5  bg-gradient-to-br from-secondary/50 to-background
       overflow-hidden flex flex-row md:flex-col p-3 gap-3'
    >
      <CardHeader className='flex flex-1 p-0'>
        {/* Card Image */}
        <Image
          isBlurred
          loading='lazy'
          width={300}
          height={300}
          className='object-cover min-w-full max-w-[8rem] md:max-w-full aspect-square'
          src={image}
          alt='Dulce Trago Product Image'
        />
      </CardHeader>
      <CardBody className='flex flex-col gap-3 justify-between h-full p-0'>
        {/* Card Info */}
        <div className='flex flex-col gap-1'>
          <h3 className='font-semibold text-small line-clamp-1'>
            {product.name}
          </h3>
          <p className='text-small opacity-70 line-clamp-2'>
            {product.description}
          </p>
        </div>

        {/* Footer */}
        <div className='justify-between flex flex-row items-center'>
          <Chip className=' text-sm px-0' variant='flat' color='primary'>
            <p className='text-sm font-semibold'>${product.price}</p>
          </Chip>
          <FaChevronRight />
        </div>
      </CardBody>
    </Card>
  )
}
