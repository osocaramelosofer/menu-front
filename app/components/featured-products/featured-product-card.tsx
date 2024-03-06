'use client'

import { type IProduct } from '@/interfaces/product'
import { getOptimizedImageUrl } from '@/lib/utils'
import { useProductsStore } from '@/store/dulce_trago/products-store'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Code,
  Image
} from '@nextui-org/react'
import { FaChevronRight } from 'react-icons/fa'
import AddToCartButtonPopover from '../cart/add-to-cart-button-popover'

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
      disableRipple
      as={'div'}
      onPress={handleSelectedProduct}
      className='cursor-pointer rounded-xl shadow-xs border border-white max-w-[12rem] min-w-[12rem]
       bg-gradient-to-br from-secondary/50 to-background w-full overflow-hidden'
    >
      <CardHeader>
        {/* Card Image */}
        <Image
          // isZoomed
          isBlurred
          loading='lazy'
          width={300}
          height={300}
          className='object-cover min-w-full aspect-square'
          src={image}
          alt='Dulce Trago Product Image'
        />
      </CardHeader>
      <CardBody>
        {/* Card Info */}
        <div className='flex justify-between items-center min-w-full flex-1'>
          <h3 className='font-semibold text-small line-clamp-1'>
            {product.name}
          </h3>
          <p className='text-small font-medium text-default-500'>
            ${product.price}
          </p>
        </div>
      </CardBody>
      {/* Footer */}
      <CardFooter className='justify-between w-full flex flex-row items-center pt-0'>
        <AddToCartButtonPopover product={product} />
      </CardFooter>
    </Card>
  )
}
