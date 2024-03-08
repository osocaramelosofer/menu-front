import type { IStore } from '@/interfaces/store'
import { fetchAllStores } from '@/lib/actions'

export default async function HomePage () {
  const stores: IStore[] = await fetchAllStores()
  return (
    <main
      className='flex flex-col items-center justify-center h-screen max-w-7xl gap-4 px-4
       py-8 mx-auto relative '
    >
      <div className='text-center leading-8 md:leading-10 md:text-left'>
        <div className='inline-block'>
          <h1 className='tracking-tight inline font-semibold text-[2.1rem] lg:text-5xl'>
            Let's make your&nbsp;
          </h1>
          <h1 className='tracking-tight inline font-semibold from-[#FF1CF7] to-[#b249f8] text-[2.1rem] lg:text-5xl bg-clip-text text-transparent bg-gradient-to-b'>
            menu&nbsp;
          </h1>
        </div>
        <h1 className='tracking-tight inline font-semibold text-[2.1rem] lg:text-5xl'>
          looks&nbsp;
        </h1>
        <h1 className='tracking-tight inline font-semibold text-[2.1rem] lg:text-5xl'>
          wonder.&nbsp;
        </h1>

        <p
          className='w-full my-2 font-normal text-default-500 block max-w-full
         md:w-full text-base lg:text-lg'
        >
          Digital menus for your culinary success.
        </p>
        <ul className='flex gap-4 justify-center lg:justify-start mt-8'>
          {stores.map(store => (
            <li key={store.id}>
              <a
                className=' flex-1 flex text-sm text-success bg-success/10 px-6 py-2 capitalize rounded-lg'
                href={`/${store.id}`}
              >
                {store.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
