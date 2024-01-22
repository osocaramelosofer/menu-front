'use client'
import React, { useState, useEffect } from 'react'
import { Card, Image, CardFooter, CardHeader, Chip } from '@nextui-org/react'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../common/carousel'

import type { CarouselApi } from '../common/carousel'
interface IPromos {
  id: number
  img: string
  title: string
  subtitle: string
}

const CardsCarousel = ({ data: promos }: { data: IPromos[] }) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (api == null) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <Carousel setApi={setApi} className='w-full max-w-2xl'>
      <CarouselContent>
        {promos.map((item, index) => (
          <CarouselItem key={item.id}>
            <Card isPressable radius='lg' className='border-none text-left'>
              <CardHeader
                className='absolute z-10 flex-col w-fit min-h-full items-start bg-gradient-to-r
                     from-black/70 via-black/50 to-transparent'
              >
                <p className='text-tiny text-white/50 uppercase font-bold'>
                  Tu dulce experiencia
                </p>
                <h4 className='text-white font-medium text-xl lg:text-3xl max-w-[16rem] lg:max-w-sm'>
                  {item.title}
                </h4>
              </CardHeader>

              <Image
                alt='Special promo food image'
                className='object-cover min-w-full h-52 lg:h-72 z-0'
                width={700}
                height={500}
                src={item.img}
              />
              <CardFooter className='absolute bg-black/30 bottom-0 z-10 border-t-1 border-default-600 backdrop-blur-sm'>
                <p className='text-tiny text-white/90 line-clamp-2'>
                  {item.subtitle}
                </p>
                <Chip
                  className='text-tiny text-white bg-black/20 ml-3'
                  variant='solid'
                  color='default'
                  radius='lg'
                  size='md'
                >
                  Ver mas
                </Chip>
              </CardFooter>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* Controls and Dots indicators */}
      <div className='flex justify-center items-center pt-3 text-center text-sm text-muted-foreground md:justify-between'>
        <div className='hidden md:block'>
          <CarouselPrevious className='hidden md:block'/>
        </div>
        <div className=' flex gap-2 items-center'>
          {promos.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full  ${
                current === index + 1 ? ' bg-primary' : 'bg-secondary'
              }`}
            ></div>
          ))}
        </div>
        <div className='hidden md:block'>
          <CarouselNext />
        </div>
      </div>
    </Carousel>
  )
}

export default CardsCarousel
