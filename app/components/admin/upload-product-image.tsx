'use client'

import { Button, Image } from '@nextui-org/react'
import { CldUploadWidget } from 'next-cloudinary'
import React, { useEffect, useState } from 'react'

import { FaImage } from 'react-icons/fa'
import PopoverInfo from '../common/popover-info'
import { getOptimizedImageUrl } from '@/lib/utils'

const uploadPreset = 'jg7mvaof'

export default function UploadProductImage ({
  inputName,
  storeLogo,
  popoverLabel
}: {
  inputName: string
  storeLogo?: string
  popoverLabel: React.ReactNode
}) {
  const [mainImageValue, setMainImageValue] = useState('')
  const [imageSrc, setImageSrc] = useState('')

  // Actualiza imageSrc cada vez que storeLogo o mainImageValue cambien
  useEffect(() => {
    if (mainImageValue.length > 0) {
      // Si mainImageValue tiene un valor, usar ese valor
      setImageSrc(mainImageValue)
    } else if (storeLogo !== undefined) {
      // Si mainImageValue no tiene valor pero storeLogo sí, usar storeLogo
      setImageSrc(storeLogo)
    }
  }, [storeLogo, mainImageValue])

  return (
    <React.Fragment>
      {popoverLabel}

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
              {imageSrc.length > 0 && (
                <div className='absolute inset-0 w-full flex-1'>
                  <Image
                    alt='Woman listing to music'
                    // removeWrapper
                    className='object-cover min-h-full min-w-full aspect-square'
                    src={getOptimizedImageUrl(imageSrc, 330)}
                  />
                  <input
                    required
                    type='hidden'
                    value={imageSrc}
                    name={inputName}
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
