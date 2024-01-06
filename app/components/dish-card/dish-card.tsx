'use client'
import { Card, CardBody, Chip, Image } from '@nextui-org/react'
import { FaChevronRight, FaDollarSign, FaHeart } from 'react-icons/fa'
import { type Tag } from '@/interfaces/product'

export interface IDishCardProps {
  srcImage: string | undefined
  dishName: string
  description: string
  price: string
  tags?: Tag[]
}

export default function DishCard ({
  srcImage,
  dishName,
  description,
  price,
  tags
}: IDishCardProps) {
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
            src={srcImage}
            alt='Listing'
            isBlurred
          />

          <div className='absolute top-3 right-3 z-[10] text-danger'>
            <FaHeart />
          </div>
        </div>

        <div className='justify-between flex flex-col flex-1 gap-2'>
          {/* Card Info */}
          <div className='flex flex-col gap-1'>
            <div className='font-semibold text-base capitalize line-clamp-1'>
              {dishName}
            </div>
            <div className='font-medium text-sm opacity-70 line-clamp-2'>
              {description}
            </div>
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
            <Chip
              startContent={<FaDollarSign />}
              endContent={<FaChevronRight />}
              variant='light'
              color='primary'
            >
              {price}
            </Chip>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
