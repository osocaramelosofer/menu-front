'use client'
import React, { useState, useEffect } from 'react'
import {
  Card,
  Image,
  CardFooter,
  CardHeader,
  Chip,
  Button
} from '@nextui-org/react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../common/carousel'

import type { CarouselApi } from '../common/carousel'
import type { IBanner } from '@/interfaces/store'
import { getOptimizedImageUrl } from '@/lib/utils'
import clsx from 'clsx'
import { FaTrash } from 'react-icons/fa'
import DropdownBannerActions from '../admin/dropdown-banner-actions'

const BannersCarousel = ({
  data: banners,
  showOptions = false
}: {
  data: IBanner[]
  showOptions?: boolean
}) => {
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
    <Carousel setApi={setApi} className='w-full max-w-2xl self-center mb-6'>
      <CarouselContent>
        {banners.map((banner, index) => (
          <CarouselItem key={banner.id}>
            <Card radius='lg' className='border-none text-left'>
              <CardHeader
                className='absolute z-10 flex-col min-h-full items-start bg-gradient-to-r
                     from-black/50 via-black/20 to-transparent w-full'
              >
                <p className='text-tiny text-white/70 uppercase font-bold'>
                  Tu dulce experiencia
                </p>
                <h1 className='text-white font-medium text-xl md:text-3xl max-w-[14rem] md:max-w-sm'>
                  {banner.title}
                </h1>

                <div
                  className={clsx(
                    ' absolute top-2 right-3',
                    showOptions ? 'block' : 'hidden'
                  )}
                >
                  <DropdownBannerActions banner={banner} />
                </div>
              </CardHeader>

              <Image
                alt='Special promo image'
                isBlurred
                className='object-cover min-w-full h-52 md:h-72 z-0'
                width={700}
                height={500}
                src={getOptimizedImageUrl(banner.image, 700)}
              />
              <CardFooter className='absolute bg-black/30 bottom-0 z-10 border-t-1 border-default-600 backdrop-blur-sm'>
                <p className='text-tiny text-white/90 line-clamp-2'>
                  {banner.description}
                </p>
              </CardFooter>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* Controls and Dots indicators */}
      <div
        className={clsx(
          'justify-center items-center pt-3 text-center gap-3 text-sm text-muted-foreground',
          banners.length > 1 ? 'flex' : 'hidden'
        )}
      >
        <CarouselPrevious />
        <div className=' flex gap-2 items-center'>
          {banners.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full  ${
                current === index + 1 ? ' bg-primary' : ' bg-default-400'
              }`}
            ></div>
          ))}
        </div>

        <CarouselNext />
      </div>
    </Carousel>
  )
}

export default BannersCarousel
