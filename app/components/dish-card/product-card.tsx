'use client'
import { Card, CardBody, Chip, Image } from '@nextui-org/react'
import { type IProduct } from '@/interfaces/product'
import ViewDetailButton from './view-detail-button'

export default function ProductCard ({ product }: { product: IProduct }) {
  let image = ''
  if (product.main_image !== null) {
    image = 'https://res.cloudinary.com/drzrkaoje/' + product.main_image
  } else {
    image =
      'https://www.unileverfoodsolutions.com.mx/dam/global-ufs/mcos/NOLA/calcmenu/recipes/MX-recipes/general/sushi-empanizado/main-header.jpg'
  }

  return (
    <Card
      isPressable
      className='cursor-pointer rounded-xl shadow-xs border border-white  bg-gradient-to-br from-secondary/50 to-background'
    >
      <CardBody className='flex flex-row md:flex-col gap-2'>
        {/* Card Image */}
        <Image
          width={200}
          height={200}
          removeWrapper
          className=' object-cover max-w-[8rem] md:min-w-full aspect-square'
          src={image}
          alt='NextUI Image with fallback'
        />

        <div className='justify-between flex flex-col flex-1 gap-2'>
          {/* Card Info */}
          <div className='flex flex-col gap-1'>
            <div className='font-semibold text-base capitalize line-clamp-1'>
              {product.name}
            </div>
            <div className='font-medium text-sm opacity-70 line-clamp-2'>
              {product.description}
            </div>
          </div>

          {/* Card tags */}
          <div className='justify-between flex flex-row items-center gap-2'>
            {product.tags?.map(tag => (
              <Chip key={tag?.id} size='sm' variant='flat' color='warning'>
                <p className='text-tiny uppercase'># {tag.name}</p>
              </Chip>
            ))}
          </div>
          {/* Footer */}
          <ViewDetailButton id={product.id} price={product.price} />
        </div>
      </CardBody>
    </Card>
  )
}
