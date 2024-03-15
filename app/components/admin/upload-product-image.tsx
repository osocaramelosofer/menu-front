'use client'

import { Button, Image } from '@nextui-org/react'
import { CldUploadWidget } from 'next-cloudinary'
import React, { useState } from 'react'

import { FaImage } from 'react-icons/fa'
import PopoverInfo from '../common/popover-info'

const uploadPreset = 'jg7mvaof'

export default function UploadProductImage () {
  const [mainImageValue, setMainImageValue] = useState('')

  return (
    <React.Fragment>
      <div className=' flex gap-2'>
        <h2 className=' font-medium opacity-80'>
          Agrega una foto de tu producto
        </h2>
        <PopoverInfo
          title='¡Muestra a todos cómo es tu producto!'
          subtitle='Recuerda que solamente podrás elegir una imagen, elige con sabiduría y haz que tu producto luzca lo mejor posible. ¡La elección es tuya, asegúrate de que sea la mejor!'
        />
      </div>

      <CldUploadWidget
        onSuccess={(results: any) => {
          console.log(results)

          setMainImageValue(
            `${results?.info?.resource_type}/${results?.info?.type}/${results?.info?.path}`
          )
        }}
        uploadPreset={uploadPreset}
        options={{
          sources: ['local', 'url', 'camera'],
          multiple: false,
          maxFiles: 1
        }}
      >
        {({ open }) => {
          return (
            <div
              onClick={() => {
                open()
              }}
              className='relative cursor-pointer transition border-dashed border-2 overflow-hidden w-full min-h-full aspect-square
          border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 rounded-xl'
            >
              <FaImage size={50} />
              <div className='font-medium text-md text-center opacity-60'>
                Haz clic para cargar una imagen
              </div>
              {mainImageValue.length > 0 && (
                <div className='absolute inset-0 w-full flex-1'>
                  <Image
                    alt='Woman listing to music'
                    // removeWrapper
                    className='object-cover min-h-full min-w-full aspect-square'
                    src={`https://res.cloudinary.com/drzrkaoje/${mainImageValue}`}
                  />
                  <input
                    // required
                    type='hidden'
                    value={mainImageValue}
                    name='main_image'
                  />
                </div>
              )}
            </div>
          )
        }}
      </CldUploadWidget>
    </React.Fragment>
  )
}
