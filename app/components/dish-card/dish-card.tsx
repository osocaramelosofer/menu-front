'use client'
import { Card, CardBody, Chip, Image } from '@nextui-org/react'
import { FaChevronRight, FaDollarSign, FaHeart } from 'react-icons/fa'
import { type Tag } from '@/interfaces/product'
import ViewDetailButton from './view-detail-button'

export interface IDishCardProps {
  id: number
  srcImage: string | null
  dishName: string
  description: string
  price: string
  tags?: Tag[]
}

export default function DishCard ({
  id,
  srcImage,
  dishName,
  description,
  price,
  tags
}: IDishCardProps) {
  let image
  if (srcImage !== null) {
    image = 'https://res.cloudinary.com/drzrkaoje/' + srcImage
  } else {
    image = 'https://www.unileverfoodsolutions.com.mx/dam/global-ufs/mcos/NOLA/calcmenu/recipes/MX-recipes/general/sushi-empanizado/main-header.jpg'
  }
  return (
    <Card
      isBlurred
      isPressable
      className='cursor-pointer rounded-xl shadow-xs border border-white  bg-gradient-to-br from-secondary/50 to-background'
    >
      <CardBody className='flex flex-row md:flex-col gap-2'>
        {/* Card Image */}
        <div className='aspect-square w-2/5 md:w-full shadow-sm relative overflow-hidden rounded-xl'>
          <Image
            className='object-cover h-full w-full'
            src={srcImage as string}
            alt='Listing'
            isBlurred
          />

          <div className='absolute top-3 right-3 z-[10] text-danger'>
            <FaHeart />
          </div>
        </div>
        <div className='flex flex-col text-white justify-between w-full'>
          <div>
            <span className='text-base text-black'>{dishName}</span>
            <p className='text-[12px] text-black'>{description}</p>
          </div>

          {/* Card tags */}
          <div className='justify-between flex flex-row items-center gap-2'>
            {tags?.map(tag => (
              <Chip key={tag?.id} size='sm' variant='flat' color='warning'>
                <p className='text-tiny uppercase'># {tag.name}</p>
              </Chip>
            ))}
          </div>
          {/* Footer */}
          <div className='justify-between flex flex-row items-center'>
            <Chip size='sm' variant='dot' color='warning'>
              16 oz
            </Chip>
            <ViewDetailButton id={id} price={price}/>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
