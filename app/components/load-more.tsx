'use client'

import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

function LoadMore () {
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {
      alert('load more')
    }
  }, [inView])
  return (
    <>
      <section className='flex justify-center items-center w-full'>
        <div ref={ref}>LOADING MORE DATA...</div>
      </section>
    </>
  )
}

export default LoadMore
