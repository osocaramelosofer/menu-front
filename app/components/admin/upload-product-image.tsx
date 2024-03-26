'use client'

import { Image, Input } from '@nextui-org/react'
import { CldUploadWidget } from 'next-cloudinary'
import React, { useEffect, useState } from 'react'

import { FaImage } from 'react-icons/fa'
import { getOptimizedImageUrl } from '@/lib/utils'

const uploadPreset = 'jg7mvaof'

export default function UploadProductImage ({
  inputName,
  currentImage,
  popoverLabel
}: {
  inputName: string
  currentImage?: string
  popoverLabel: React.ReactNode
}) {
  const [mainImageValue, setMainImageValue] = useState('')
  const [imageSrc, setImageSrc] = useState('')

  // Actualiza imageSrc cada vez que currentImage o mainImageValue cambien
  useEffect(() => {
    if (mainImageValue.length > 0) {
      // Si mainImageValue tiene un valor, usar ese valor
      setImageSrc(mainImageValue)
    } else if (currentImage !== undefined) {
      // Si mainImageValue no tiene valor pero currentImage sí, usar currentImage
      setImageSrc(currentImage)
    }
  }, [currentImage, mainImageValue])

  return (
    <React.Fragment>
      {popoverLabel}

      <CldUploadWidget
        onSuccess={(results: any) => {
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
              className='relative cursor-pointer transition border-dashed border-2 overflow-hidden h-auto w-auto
        border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 rounded-xl'
            >
              {imageSrc.length === 0 && (
                <div className=' flex flex-col py-28 justify-center items-center gap-4'>
                  <FaImage size={50} />
                  <div className='font-medium text-md text-center opacity-60'>
                    Haz clic para cargar una imagen
                  </div>
                </div>
              )}
              {imageSrc.length > 0 && (
                <div className='bg-gray-300 rounded-xl'>
                  <Image
                    alt='Uploaded image preview'
                    // removeWrapper
                    className='object-cover min-h-full min-w-full'
                    src={getOptimizedImageUrl(imageSrc, 'auto')}
                  />
                </div>
              )}
            </div>
          )
        }}
      </CldUploadWidget>
      <Input
        isRequired
        required
        type='hidden'
        className=' hidden'
        value={imageSrc}
        name={inputName}
      />
    </React.Fragment>
  )
}
