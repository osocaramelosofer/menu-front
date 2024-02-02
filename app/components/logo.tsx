'use client'

import React from 'react'
import { Image } from '@nextui-org/react'
export const DulceTragoLogo = () => {
  return (
    <div className='flex items-center gap-2'>
      <Image
        // isLoading
        width={50}
        radius='none'
        src='https://i.imgur.com/DgdBIRD.png'
        alt='Dulce Trago Logo'
      />
      <Image
        width={70}
        radius='none'
        src='https://i.imgur.com/j9nfc8V.png'
        alt='Dulce Trago Logo'
      />
    </div>
  )
}
