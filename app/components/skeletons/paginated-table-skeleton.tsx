import { Skeleton } from '@nextui-org/react'
import clsx from 'clsx'

export default function PaginatedTableSkeleton () {
  return (
    <section className='w-full max-w-2xl self-center mb-6'>
      <div className={'w-full items-center justify-between mb-4 flex'}>
        <div>
          <Skeleton className=' w-32 h-8 rounded-lg ' />
        </div>
      </div>

      <div className=' w-full border rounded-xl shadow-md border-default-100 p-4 gap-6 flex flex-col'>
        <div className=' w-full min-h-10'>
          <Skeleton className='flex rounded-xl w-full h-10 ' />
        </div>
        {Array(7)
          .fill(null)
          .map((_, index) => (
            <div key={index} className=' w-full flex gap-3'>
              <Skeleton className='flex rounded-xl w-3/5 h-4 ' />
              <Skeleton className='flex rounded-xl w-2/5 h-4 ' />
              <Skeleton className='flex rounded-xl w-1/5 h-4 ' />
            </div>
          ))}

        {/* Pagination */}
        <section className='flex flex-col flex-1 w-full justify-center items-center  z-10'>
          <Skeleton className=' h-8 max-w-[288px] w-4/5 rounded-lg' />
        </section>
      </div>
    </section>
  )
}
