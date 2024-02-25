'use client'
import { Button, Card, CardBody, Chip, Code, Image } from '@nextui-org/react'
import { type IProduct } from '@/interfaces/product'
import { FaMinus, FaPlus, FaTimes } from 'react-icons/fa'
import { useCartsStore } from '@/store/dulce_trago/carts-store'
import { useProductsStore } from '@/store/dulce_trago/products-store'

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
    pathArray.splice(uploadIndex + 1, 0, 'w_60,q_auto,f_webp')
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

  const { setSelectedProduct, openModal } = useProductsStore()
  const handleSelectedProduct = () => {
    setSelectedProduct(product)
    openModal()
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
    <Card
      isPressable
      // onClick={handleSelectedProduct}
      className='rounded-xl shadow-xs border overflow-hidden mb-4 border-white w-full  bg-gradient-to-br from-secondary/50 to-background'
    >
      <CardBody className='flex flex-row gap-2'>
        <div className=' absolute right-1 top-1 '>
          <Button
            as={Chip}
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
            <div className='flex'>
              <Button
                as={Code}
                size='sm'
                color='primary'
                isIconOnly
                onClick={e => {
                  e.preventDefault()
                  handleDecrementCartItemQuantity(product.id)
                }}
                isDisabled={(isDisabled ?? false) || product.quantity === 1}
                className={`min-w-[1.5rem] max-w-[1.5rem] min-h-[1.5rem] max-h-[1.5rem] rounded-md text-white ${
                  (isDisabled ?? false) || product.quantity === 1
                    ? ' opacity-50'
                    : ''
                }`}
              >
                <FaMinus />
              </Button>

              <div className='text-center min-w-[3rem] max-w-[3rem] flex bg-transparent text-primary items-center font-bold justify-center'>
                {product.quantity}
              </div>

              <Button
                as={Code}
                size='sm'
                color='primary'
                isIconOnly
                onClick={e => {
                  e.preventDefault()
                  handleIncrementCartItemQuantity(product.id)
                }}
                isDisabled={(isDisabled ?? false) || product.quantity === 99}
                className=' min-w-[1.5rem] max-w-[1.5rem] min-h-[1.5rem] max-h-[1.5rem] rounded-md text-white'
              >
                <FaPlus />
              </Button>
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
