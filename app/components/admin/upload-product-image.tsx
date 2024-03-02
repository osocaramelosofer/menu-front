'use client'

import { Button, Image, Input } from '@nextui-org/react'
import { CldUploadWidget } from 'next-cloudinary'
import { useState } from 'react'
import { FaImage, FaPhotoVideo, FaPlusCircle } from 'react-icons/fa'

const uploadPreset = 'jg7mvaof'

export default function UploadProductImage () {
  const [mainImageValue, setMainImageValue] = useState('')
  //   const [mainImageUrlValue, setMainImageUrlValue] = useState('')
  return (
    <CldUploadWidget
      onSuccess={(results: any) => {
        console.log('Public ID', results)
        setMainImageValue(
          `${results?.info?.resource_type}/${results?.info?.type}/${results?.info?.path}`
        )
        // setMainImageUrlValue(results?.info?.url)
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
            <div className='font-semibold text-md text-center'>
              Haz clic para cargar una imagen
            </div>
            {mainImageValue.length > 0 && (
              <div className='absolute inset-0 w-full flex-1'>
                <Image
                  alt='Woman listing to music'
                  // removeWrapper
                  className='object-cover h-full w-full aspect-square'
                  src={`https://res.cloudinary.com/drzrkaoje/${mainImageValue}`}
                />
                <input type='hidden' value={mainImageValue} name='main_image' />
              </div>
            )}
          </div>
          //   <Button
          //     color='success'
          //     onClick={() => {
          //       open()
          //     }}
          //   >
          //     Upload image
          //     <input type='hidden' name='main_image' value={mainImageValue} />
          //   </Button>
        )
      }}
    </CldUploadWidget>
  )
}
