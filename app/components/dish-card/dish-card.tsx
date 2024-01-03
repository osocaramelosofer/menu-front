import { Card, CardBody, Chip } from '@nextui-org/react'
import DetailButton from './detail-button'
import Link from 'next/link'
import { FaChevronRight, FaDollarSign, FaHeart } from 'react-icons/fa'
import { type Tag } from '@/interfaces/product'

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
    <Card>
      <CardBody className='bg-secondary/5 flex px-2 py-1 min-h-[132px] max-h-[132px] gap-1 rounded-lg flex-row'>
        <div className='w-[112px] h-[112px] max-w-[112px] max-h-[112px] self-center flex-shrink-0 rounded-md'>
          <img
            className='w-full h-full rounded-md object-cover'
            src={image}
            alt='product image'
          />

          <div className='absolute top-3 right-3 z-[10]'>
            <FaHeart />
          </div>
        </div>
        <div className='flex flex-col text-white justify-between w-full'>
          <div>
            <span className='text-base text-sweet-brown'>{dishName}</span>
            <p className='text-[12px]'>{description}</p>
          </div>
          <div className='flex justify-between items-center'>
            <Chip size='sm' color='warning' variant='dot' className='mb-2' classNames={{ content: 'drop-shadow shadow-black text-white' }}>10 oz</Chip>
            <Link prefetch={false} href={`/dulce-trago/${id}`}>
              <div className='flex items-center'>
                <FaDollarSign size='14' />
                <span className='text-sm'>60 MXN</span>
                <FaChevronRight />
              </div>
            </Link>
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
