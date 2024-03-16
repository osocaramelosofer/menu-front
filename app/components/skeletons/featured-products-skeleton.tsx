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
              className='cursor-pointer rounded-xl shadow-xs p-3 border border-[#f0f0f0] max-w-[12rem] min-w-[12rem] w-full overflow-hidden'
            >
              <div className='w-full flex flex-col gap-3 flex-1 h-full'>
                <div className='aspect-square w-full h-full'>
                  <Skeleton className='flex rounded-lg w-full h-full ' />
                </div>
                <div className='w-full h-full flex flex-col justify-between flex-1'>
                  <div className='flex  gap-2 py-3'>
                    <Skeleton className='h-3 w-4/5 rounded-lg' />
                    <Skeleton className='h-3 w-2/5 rounded-lg' />
                  </div>
                  <Skeleton className='h-8 w-full rounded-lg' />
                </div>
              </div>
            </div>
          ))}
      </ScrollShadow>
    </section>
  )
}
