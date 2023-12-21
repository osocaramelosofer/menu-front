import { Card, CardBody, Chip } from '@nextui-org/react'
import { FaChevronRight, FaDollarSign } from 'react-icons/fa'
export interface IDishCardProps {
  srcImage: string | null
  dishName: string
  description: string
  price: number | null
}

export default function DishCard ({
  srcImage,
  dishName,
  description,
  price
}: IDishCardProps) {
  return (
    <Card>
      <CardBody className='bg-secondary/5 flex px-2 py-1 min-h-[132px] max-h-[132px] gap-1 rounded-lg flex-row'>
        <div className='w-[112px] h-[112px] max-w-[112px] max-h-[112px] self-center flex-shrink-0 rounded-md'>
          <img
            className='w-full h-full rounded-md object-cover'
            src={srcImage ?? 'https://www.unileverfoodsolutions.com.mx/dam/global-ufs/mcos/NOLA/calcmenu/recipes/MX-recipes/general/sushi-empanizado/main-header.jpg'}
            alt='product image'
          />
        </div>
        <div className='flex flex-col text-white justify-between w-full'>
          <div>
            <span className='text-base text-sweet-brown'>{dishName}</span>
            <p className='text-[12px]'>{description}</p>
          </div>
          <div className='flex justify-between items-center'>
            <Chip size='sm' color='warning' variant='dot' className='mb-2' classNames={{ content: 'drop-shadow shadow-black text-white' }}>10 oz</Chip>
            <div className='flex items-center'>
              <FaDollarSign size='14' />
              <span className='text-sm'>60 MXN</span>
              <FaChevronRight />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
