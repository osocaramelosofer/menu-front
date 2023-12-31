import { Skeleton } from '@nextui-org/react'

export default function ProductsSkeleton () {
  return (
    <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
      {Array(7)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className='min-h-[156px] md:min-h-[370px] rounded-lg p-4 shadow-sm border border-[#f0f0f0]'
          >
            <div className='w-full flex flex-row md:flex-col gap-3 flex-1 h-full'>
              <div className=' w-2/5 aspect-square md:w-full'>
                <Skeleton className='flex rounded-lg w-full h-full ' />
              </div>
              <div className='w-full h-full flex flex-col justify-between flex-1 gap-2'>
                <div className='flex flex-col  gap-2'>
                  <Skeleton className='h-3 w-3/5 rounded-lg' />
                  <Skeleton className='h-3 w-4/5 rounded-lg' />
                </div>

                <div className='flex justify-between flex-1 md:flex-none items-end'>
                  <Skeleton className='h-3 w-12 rounded-lg' />
                  <Skeleton className='h-3 w-16 rounded-lg' />
                </div>
              </div>
            </div>
          </div>
        ))}
    </section>
  )
}
