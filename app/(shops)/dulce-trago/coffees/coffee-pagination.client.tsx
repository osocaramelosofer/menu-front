'use client'
import { Pagination } from '@nextui-org/react'
import useUrl from '../../hooks/useUrl'

export interface CategoryType {
  id: number
  name: string
  description: string
}

export default function CoffeeCategories () {
  const { onChangePagination, currentPage } = useUrl()
  return (
    <div className='flex flex-col gap-10'>
      <section className='flex flex-col flex-1 w-full justify-center items-center  z-10'>
        <Pagination
          size='sm'
          isCompact
          showControls
          total={4}
          color='primary'
          className=' text-white'
          initialPage={1}
          page={currentPage}
          onChange={(page) => { onChangePagination(page) } }
        />
      </section>
    </div>
  )
}
