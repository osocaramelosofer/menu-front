'use client'
import { Button, Card, CardBody, Chip, Image } from '@nextui-org/react'
import { type IProduct } from '@/interfaces/product'
import { FaMinus, FaPlus, FaTimes } from 'react-icons/fa'
import { useCartsStore } from '@/store/dulce_trago/carts-store'

export default function CartProductCard ({ product }: { product: IProduct }) {
  let image = ''
  if (product?.main_image != null && product !== null) {
    const pathArray = product.main_image.split('/')
    const uploadIndex = pathArray.indexOf('upload')
    pathArray.splice(uploadIndex + 1, 0, 'w_500,q_auto,f_webp')
    const optimizedImagePath = pathArray.join('/')
    image = 'https://res.cloudinary.com/drzrkaoje/' + optimizedImagePath
  } else {
    image = 'https://i.imgur.com/VjWugqlm.png'
  }

  function TruncateText ({
    text,
    maxLength
  }: {
    text: string
    maxLength: number
  }) {
    // Función para truncar el texto y añadir puntos suspensivos si es más largo que maxLength
    const truncate = (str: string, num: number) => {
      if (str.length <= num) {
        return str
      }
      return str.slice(0, num) + '...'
    }

    return <span>{truncate(text, maxLength)}</span>
  }

  const {
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    calculateCartPrice,
    removeCartItem
  } = useCartsStore()

  const handleIncrementCartItemQuantity = (id: number) => {
    incrementCartItemQuantity(id)
    calculateCartPrice()
  }

  const handleDecrementCartItemQuantity = (id: number) => {
    decrementCartItemQuantity(id)
    calculateCartPrice()
  }
  const handleRemoveCartItem = (id: number) => {
    removeCartItem(id)
    calculateCartPrice()
  }

  return (
    <Card className=' rounded-xl shadow-xs border overflow-hidden mb-4 border-white  bg-gradient-to-br from-secondary/50 to-background'>
      <CardBody className='flex flex-row gap-2'>
        <div className=' absolute right-1 top-1 '>
          <Button
            onPress={() => {
              handleRemoveCartItem(product.id)
            }}
            isIconOnly
            size='sm'
            color='danger'
            radius='full'
            variant='flat'
            className='min-w-[20px] max-w-[20px] min-h-[20px] max-h-[20px] p-[4px]'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              x='0px'
              y='0px'
              width='100'
              height='100'
              viewBox='0,0,256,256'
            >
              <g
                className='fill-danger  stroke-danger'
                fill-rule='nonzero'
                stroke='none'
                stroke-width='1'
                stroke-linecap='butt'
                stroke-linejoin='miter'
                stroke-miterlimit='10'
                stroke-dasharray=''
                stroke-dashoffset='0'
                font-family='none'
                font-weight='none'
                font-size='none'
                text-anchor='none'
              >
                <g transform='scale(5.12,5.12)'>
                  <path d='M7.71875,6.28125l-1.4375,1.4375l17.28125,17.28125l-17.28125,17.28125l1.4375,1.4375l17.28125,-17.28125l17.28125,17.28125l1.4375,-1.4375l-17.28125,-17.28125l17.28125,-17.28125l-1.4375,-1.4375l-17.28125,17.28125z'></path>
                </g>
              </g>
            </svg>
          </Button>
        </div>
        {/* Image */}
        <Image
          width={300}
          height={300}
          className=' object-cover max-w-[6rem] md:min-w-full aspect-square'
          src={image}
          alt='Dulce Trago Product Image'
        />

        <div className='justify-between overflow-hidden flex flex-col flex-1 gap-2'>
          {/*  Info */}
          <h2 className='font-semibold text-sm line-clamp-1 pr-3'>
            <TruncateText text={product.name} maxLength={23} />
          </h2>

          <div className='flex gap-1 justify-between'>
            <Chip variant='flat' size='sm' color='warning'>
              {product.category.name}
            </Chip>

            <Chip variant='flat' size='sm' color='success'>
              ${product.price}
            </Chip>
          </div>

          <div className='flex gap-2 justify-between items-center'>
            <Button
              isIconOnly
              className='text-white'
              color='primary'
              isDisabled={product.quantity === 1}
              size='sm'
              onClick={() => {
                handleDecrementCartItemQuantity(product.id)
              }}
            >
              <FaMinus />
            </Button>
            <Button
              variant='bordered'
              size='sm'
              className=' text-center px-4 text-base font-semibold'
              color='primary'
            >
              {product.quantity}
            </Button>
            <Button
              className='text-white'
              color='primary'
              size='sm'
              isIconOnly
              onClick={() => {
                handleIncrementCartItemQuantity(product.id)
              }}
            >
              <FaPlus />
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
