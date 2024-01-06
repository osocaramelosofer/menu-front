'use client'

import { FaChevronRight, FaDollarSign } from 'react-icons/fa'
import Link from 'next/link'
import { Chip } from '@nextui-org/react'

export default function ViewDetailButton ({ id, price }: { id: number, price: string }) {
  return (
    <Link className='text-black' href={`/dulce-trago/${id}`}>
      <div className='justify-between flex flex-row items-center'>
        <Chip size='sm' variant='dot' color='warning'>
          16 oz
        </Chip>
        <Chip
          startContent={<FaDollarSign />}
          endContent={<FaChevronRight />}
          variant='light'
          color='primary'
        >
          {price}
        </Chip>
      </div>
    </Link>
  )
}
