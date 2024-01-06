import { type IProduct } from '@/interfaces/product'
import { useProductsStore } from '@/store/dulce_trago/products-store'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Image
} from '@nextui-org/react'
import { FaDollarSign, FaChevronRight } from 'react-icons/fa'

export default function ProductCard ({
  product,
  onOpen
}: {
  product: IProduct
  onOpen: () => void
}) {
  const { setSelectedProduct } = useProductsStore()
  const handleSelectedProduct = () => {
    setSelectedProduct(product)
    onOpen()
  }

  return (
    <Card
      isBlurred
      isPressable
      onPress={handleSelectedProduct}
      className='cursor-pointer rounded-xl shadow-xs border border-white
       bg-gradient-to-br from-secondary/50 to-background min-w-fit overflow-hidden'
    >
      <CardBody className='flex flex-col gap-2 max-w-[9rem] overflow-hidden'>
        {/* Card Image */}
        <div className=' min-w-full aspect-square h-[6rem] border shadow-sm relative rounded-xl overflow-hidden'>
          <Image
            className='object-cover h-full w-full rounded-lg'
            src='https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg'
            alt='Listing'
            removeWrapper
            isBlurred
          />
        </div>

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
