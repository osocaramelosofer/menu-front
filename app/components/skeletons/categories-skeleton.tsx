import { ScrollShadow, Skeleton } from '@nextui-org/react'

export default function CategoriesSkeleton () {
  return (
    <section className='sticky top-16 z-20 bg-background flex flex-col shadow-none gap-4 w-full pt-5'>
      <div className='flex justify-between items-end font-semibold text-base'>
        <h3>Categorías</h3>
      </div>

      <ScrollShadow
        orientation='horizontal'
        className='flex overflow-x-auto gap-4 pb-5'
      >
        {Array(7)
          .fill(null)
          .map((_, index) => (
            <Skeleton key={index} className=' h-fit min-w-fit rounded-lg'>
              <div className=' h-8 w-16'>
                <p>loading</p>
              </div>
            </Skeleton>
          ))}
      </ScrollShadow>
    </section>
  )
}
