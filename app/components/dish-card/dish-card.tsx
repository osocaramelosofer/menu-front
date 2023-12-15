import { Button, Card, CardBody, Chip } from '@nextui-org/react'
import { FaArrowRight, FaDollarSign } from 'react-icons/fa'
import AddOrderButton from './add-order'

export interface IDishCardProps {
  srcImage: string
  alt: string
  dishName: string
  description: string
  price: number
}

export default function DishCard ({
  srcImage,
  alt,
  dishName,
  description,
  price
}: IDishCardProps) {
  return (
    <Card>
      <CardBody className='bg-stone-700 flex px-2 py-1 min-h-[132px] max-h-[132px] gap-1 rounded-lg flex-row'>
        <div className="w-[112px] h-[112px] max-w-[112px] max-h-[112px] self-center flex-shrink-0 rounded-md">
          <img
              className="w-full h-full rounded-md object-cover"
              src={srcImage}
              alt={alt}
          />
        </div>
        <div className="flex flex-col text-white justify-between w-full">
          <div>
              <span className='text-base'>{dishName}</span>
              <p className='text-[12px]'>{description}</p>
          </div>
          <div className='flex justify-between'>
           <Chip color="warning" variant="dot" classNames={{ content: 'drop-shadow shadow-black text-white' }}>10 oz</Chip>

            <div className='flex items-center'>
              <FaDollarSign size="14" />
              <span>{price}</span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
