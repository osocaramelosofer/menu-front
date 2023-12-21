'use client'

import { Button } from '@nextui-org/react'
import { FaRegEdit } from 'react-icons/fa'

export default function AddOrderButton () {
  return (
    <Button
      size='sm'
      className='bg-orange-600 text-white text-[8px] h-[21px] mt-2'
    >
      Add to order
      <FaRegEdit />
    </Button>
  )
}
