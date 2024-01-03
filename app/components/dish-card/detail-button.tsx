'use client'

import { FaChevronRight, FaDollarSign } from 'react-icons/fa'
import Link from 'next/link'

export default function DetailButton ({ id }: { id: number }) {
  return (
    <Link href={`/dulce-trago/${id}`}>
      <div className='flex items-center'>
        <FaDollarSign size='14' />
        <span className='text-sm'>60 MXN</span>
        <FaChevronRight />
      </div>
    </Link>
  )
}
