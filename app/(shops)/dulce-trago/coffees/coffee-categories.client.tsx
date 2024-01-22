'use client'
import ProductsList from '@/app/components/products/products-list'
import ProductsSkeleton from '@/app/components/skeletons/products-skeleton'
import { type IApiResponse, type IProduct } from '@/interfaces/product'
import { fetchAllCategories, fetchFilteredProducts } from '@/lib/actions'
import api from '@/services/dulce_trago/api'
import { Chip, Pagination } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { Suspense } from 'react'
import useUrl from '../../hooks/useUrl'
import ProductCard from '@/app/components/products/product-card'
import CustomPagination from '@/app/components/common/custom-pagination'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'

export interface CategoryType {
  id: number
  name: string
  description: string
}

export default function CoffeeCategories () {
  const { onChangePagination, currentPage } = useUrl()

  // const { data: coffeeProducts } = useQuery({
  //   queryKey: ['products'],
  //   queryFn: async (): Promise<IApiResponse> => await api.fetchFilteredProducts('3', currentOffset, '2') // category, offset, limit
  // })

  // const router = useRouter()
  // const searchParams = useSearchParams()
  // const pathname = usePathname()

  // const currentPage = Number(searchParams.get('page')) ?? 1
  // const currentOffset = searchParams.get('offset') ?? '1'

  // function changePagination (newPage: number) {
  //   const newOffset = (newPage - 1) * 2 // limit
  //   const currentSearchParams = Object.fromEntries(searchParams.entries())
  //   const newSearchParams = {
  //     ...currentSearchParams,
  //     offset: newOffset.toString(),
  //     page: newPage.toString()

  //   }
  //   const url = qs.stringifyUrl(
  //     {
  //       url: pathname,
  //       query: newSearchParams
  //     },
  //     { skipNull: true, skipEmptyString: true }
  //   )
  //   router.push(url)
  // }

  return (
    <div className='flex flex-col gap-10'>
      <section className='flex flex-col flex-1 w-full justify-center items-center  z-10'>
        <Pagination
          showControls
          total={4}
          initialPage={1}
          onChange={(page) => { onChangePagination(page) } }
          page={currentPage}
        />
      </section>
    </div>
  )
}
