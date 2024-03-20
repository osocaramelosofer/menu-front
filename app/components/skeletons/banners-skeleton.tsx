import { Skeleton } from '@nextui-org/react'
import clsx from 'clsx'

export default function BannersSkeleton ({
  isDashboardSection = false
}: {
  isDashboardSection?: boolean
}) {
  return (
    <section className='w-full max-w-2xl self-center mb-6'>
      <div
        className={clsx(
          'w-full items-center justify-between mb-4',
          isDashboardSection ? 'flex' : 'hidden'
        )}
      >
        <h2 className='font-semibold text-lg'>Mis Banners</h2>
        <div>
          <Skeleton className=' w-32 h-8 rounded-lg ' />
        </div>
      </div>

      <div className=' w-full h-52 md:h-72'>
        <div className=' w-full h-full'>
          <Skeleton className='flex rounded-xl w-full h-full ' />
        </div>
      </div>
      {/* Dots */}
      <div className='flex gap-2 w-full justify-center items-center pt-[12px]'>
        <Skeleton className='rounded-full w-2 h-2' />
        <Skeleton className='rounded-full w-2 h-2' />
        <Skeleton className='rounded-full w-2 h-2' />
      </div>
    </section>
  )
}
