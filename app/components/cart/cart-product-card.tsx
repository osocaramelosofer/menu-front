'use client'
import { Button, Card, CardBody, Chip, Image } from '@nextui-org/react'
import { type IProduct } from '@/interfaces/product'
import { FaMinus, FaPlus, FaTimes } from 'react-icons/fa'
import { useCartsStore } from '@/store/dulce_trago/carts-store'

export default function CartProductCard ({
  product,
  isDisabled
}: {
  product: IProduct
  isDisabled?: boolean
}) {
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
            isDisabled={isDisabled}
            onPress={() => {
              handleRemoveCartItem(product.id)
            }}
            color='primary'
            isIconOnly
            size='sm'
            radius='full'
            variant='flat'
            className='min-w-[20px] max-w-[20px] min-h-[20px] max-h-[20px] p-[4px] text-md opacity-90'
          >
            <FaTimes />
          </Button>
        </div>

        {/* Image */}
        <Image
          width={300}
          height={300}
          className=' object-cover max-w-[3.5rem] rounded-md md:min-w-full aspect-square'
          src={image}
          alt='Dulce Trago Product Image'
        />

        <div className='justify-start overflow-hidden flex flex-col flex-1 gap-2'>
          {/*  Info */}
          <h2 className='font-semibold text-sm line-clamp-1 pr-3'>
            <TruncateText text={product.name} maxLength={22} />
          </h2>
          {/* <div className=' text-xs bg-warning/20 text-warning-600 w-fit px-3 rounded-full py-[2px]'>
            {product.category.name}
          </div> */}
          <div className='flex justify-between items-center'>
            <div className='flex gap-4'>
              <button
                onClick={e => {
                  e.preventDefault()
                  handleDecrementCartItemQuantity(product.id)
                }}
                disabled={(isDisabled ?? false) || product.quantity === 1}
                className={`flex w-6 h-6 rounded-md bg-primary text-white justify-center items-center text-tiny ${
                  (isDisabled ?? false) || product.quantity === 1
                    ? ' opacity-50'
                    : ''
                }`}
              >
                <FaMinus />
              </button>

              <div className=' text-center flex w-fit bg-transparent text-primary items-center font-bold'>
                {product.quantity}
              </div>

              <button
                onClick={e => {
                  e.preventDefault()
                  handleIncrementCartItemQuantity(product.id)
                }}
                disabled={isDisabled}
                className=' flex w-6 h-6 rounded-md bg-primary text-white justify-center items-center text-tiny'
              >
                <FaPlus />
              </button>
            </div>
            <Chip variant='flat' size='sm' color='success'>
              ${product.price}
            </Chip>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
