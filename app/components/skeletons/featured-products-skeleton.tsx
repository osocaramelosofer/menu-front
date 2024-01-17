import { ScrollShadow, Skeleton } from '@nextui-org/react'

export default function FeaturedProductsSkeleton () {
  return (
    <section className='relative bg-background flex flex-col shadow-none gap-4 w-full pt-5'>
      <ScrollShadow
        size={20}
        orientation='horizontal'
        className='flex overflow-x-auto gap-4 pb-5'
      >
        {Array(7)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className='p-3 max-w-[8.5rem] md:min-w-[12rem] min-h-[16.1rem] rounded-xl  shadow-sm border border-[#f0f0f0]'
            >
              <div className='w-full flex flex-col gap-3 flex-1 h-full'>
                <div className='aspect-square w-28 h-28 md:w-full md:h-full'>
                  <Skeleton className='flex rounded-lg w-full h-full ' />
                </div>
                <div className='w-full h-full flex flex-col justify-between flex-1 gap-8'>
                  <div className='flex flex-col  gap-2'>
                    <Skeleton className='h-3 w-3/5 rounded-lg' />
                    <Skeleton className='h-3 w-4/5 rounded-lg' />
                  </div>

                  <div className='flex justify-between items-center flex-none'>
                    <Skeleton className='h-3 w-12 rounded-lg' />
                    <Skeleton className='h-8 w-8 rounded-lg' />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </ScrollShadow>
    </section>
  )
}
