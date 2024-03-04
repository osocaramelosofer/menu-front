'use client'
import { type IProduct } from '@/interfaces/product'
import { Image, Tabs, Tab, Card, CardBody } from '@nextui-org/react'

export default function ProductDetail ({ product }: { product: IProduct }) {
  const image =
    'https://res.cloudinary.com/drzrkaoje/image/upload/450,q_auto,f_webp/v1703270775/zcje1pvi5cbolkkpe41z.jpg'
  return (
    <div className='mt-5 grid justify-center'>
      <div className='max-w-[500px]'>
        <Image
          isZoomed
          width={350}
          height={314}
          alt='product image'
          src={image}
          className='min-w-[400px] object-contain'
          loading='lazy'
        />
      </div>

      <div>
        <h2 className='text-[24px]'>{product.name}</h2>
        <div className='flex w-full flex-col'>
          <div>
            <Tabs aria-label='Options'>
              <Tab key='description' title='Descripción'>
                <Card>
                  <CardBody className='max-w-[300px] '>
                    {product.description}
                  </CardBody>
                </Card>
              </Tab>
              <Tab key='ingredients' title='Ingredientes'>
                <Card>
                  <CardBody className='max-w-[300px] '>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                    irure dolor in reprehenderit in voluptate velit esse cillum
                    dolore eu fugiat nulla pariatur.
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
