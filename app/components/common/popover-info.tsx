import React from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button
} from '@nextui-org/react'
import { FaInfo } from 'react-icons/fa'

export default function PopoverInfo ({
  title,
  subtitle
}: {
  title: string
  subtitle: string
}) {
  return (
    <Popover shouldBlockScroll placement='bottom' showArrow className='dark'>
      <PopoverTrigger>
        <Button
          isIconOnly
          size='sm'
          radius='full'
          variant='flat'
          className=' max-w-[1.5rem] min-w-[1.5rem] max-h-[1.5rem] min-h-[1.5rem]'
        >
          <FaInfo />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className='px-1 py-2 text-white max-w-xs'>
          <div className='text-small font-semibold'>{title}</div>
          <div className='text-tiny'>{subtitle}</div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
