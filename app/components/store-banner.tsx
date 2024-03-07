'use client'
import React from 'react'
import { Card, CardFooter, CardHeader, Image } from '@nextui-org/react'
import type { IStore } from '@/interfaces/store'

const StoreBanner = ({ store }: { store: IStore }) => {
  return (
    <section className='self-center mb-6'>
      <Card radius='lg' className='border-none text-left'>
        <CardHeader
          className='absolute z-10 flex-col w-fit min-h-full items-start bg-gradient-to-r
                from-black/70 via-black/50 to-transparent'
        >
          <p className='text-tiny text-white/50 uppercase font-medium'>
            Bienvenido a
          </p>
          <h1 className='text-white font-medium text-xl md:text-3xl max-w-[14rem] md:max-w-sm capitalize'>
            {store.name}
          </h1>
        </CardHeader>

        <Image
          alt='Special promo image'
          isBlurred
          className='object-cover min-w-full h-52 md:h-72 z-0'
          width={700}
          height={500}
          src={store.amenities}
        />
        <CardFooter className='absolute bg-black/30 bottom-0 z-10 border-t-1 border-default-600 backdrop-blur-sm'>
          <p className='text-tiny md:text-sm text-white/90 line-clamp-2'>
            {store.description}
          </p>
        </CardFooter>
      </Card>
    </section>
  )
}

export default StoreBanner
