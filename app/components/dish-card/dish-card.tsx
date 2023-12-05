import { Button, Card, CardBody } from '@nextui-org/react'
import { FaArrowRight, FaDollarSign } from 'react-icons/fa'
import AddOrderButton from './add-order'

export interface IDishCardProps {
  srcImage: string
  alt: string
  dishName: string
  description: string

}

export default function DishCard ({ srcImage, alt, dishName, description }: IDishCardProps) {
  return (

      <Card>
        <CardBody className='bg-stone-700 flex px-2 py-2 max-h-[100px] gap-1 rounded-lg flex-row'>
          <div className="max-w-[77px] w-[77px] h-[77px] self-center max-h-[77px] rounded-md">
            <img
                className="w-full h-full rounded-md"
                src={srcImage}
                alt={alt}
            />
          </div>
          <div className="flex text-white justify-between w-full">
            <div>
                <span className='text-base'>{dishName}</span>
                <p className='text-[8px]'>{description}</p>
                <AddOrderButton />
            </div>
            <div className=' flex flex-col justify-between'>
                <FaDollarSign size="14" />
                <FaArrowRight />
            </div>
          </div>
        </CardBody>
      </Card>

  )
}
