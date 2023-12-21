'use client'

import React from 'react'
import {
  Card,
  CardFooter,
  Image,
  Button,
  CardHeader,
  Chip
} from '@nextui-org/react'

export default function PromoCard () {
  return (
    <section className=" self-center ">
      <Card
        isFooterBlurred
        isPressable={true}
        radius="lg"
        className="border-none text-left"
      >
        <CardHeader
          className="absolute z-10 flex-col w-fit min-h-full items-start
        bg-gradient-to-r from-black/70 via-black/50 to-transparent"
        >
          <p className="text-tiny text-white/50 uppercase font-bold">
            Your day your way
          </p>
          <h4 className="text-white font-medium text-xl lg:text-3xl max-w-[16rem] lg:max-w-sm">
            Your checklist for better sleep for better sleep
          </h4>
        </CardHeader>

        <Image
          alt="Special promo food image"
          className="object-cover min-w-full h-52 lg:h-64 z-0"
          width={700}
          height={500}
          isBlurred
          src="https://i.imgur.com/tS9l610.jpg"
          // onLoad={() => setPressable(true)}
        />
        <CardFooter className="absolute bg-black/30 bottom-0 z-10 border-t-1 border-default-600 ">
          <p className="text-tiny text-white/90 line-clamp-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua...
          </p>
          <Chip
            className="text-tiny text-white bg-black/20 ml-3"
            variant="solid"
            color="default"
            radius="lg"
            size="md"
          >
            Ver mas
          </Chip>
        </CardFooter>
      </Card>
    </section>
  )
}
