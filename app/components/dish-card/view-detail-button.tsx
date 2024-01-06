'use client'

import { FaChevronRight, FaDollarSign } from 'react-icons/fa'
import Link from 'next/link'

export default function ViewDetailButton ({ id, price }: { id: number, price: string }) {
  return (
    <Link className='text-black' href={`/dulce-trago/${id}`}>
      <div className='flex items-center'>
        <FaDollarSign size='13' />
        <span className='text-sm'>{price} MXN</span>
        <FaChevronRight size='13'/>
      </div>
    </Link>
  )
}
