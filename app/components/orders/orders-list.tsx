import { BASE_URL } from '@/lib/utils'

import { fetchPaginatedOrders } from '@/lib/actions/order.actions'
import type { IApiOrderResponse } from '@/interfaces/order'
import OrdersTable from './orders-table'

export default async function OrdersList ({
  currentPage,
  storeId
}: {
  currentPage?: string
  storeId: string | number
}) {
  const resultsPeerPage = 10
  const url: string = `${BASE_URL}/orders?store=${storeId}&resultsPerPage=${resultsPeerPage}`
  const orders: IApiOrderResponse = await fetchPaginatedOrders(url)

  return (
    <div className='flex flex-col gap-6'>
      <section className=' flex flex-col gap-4 mt-4 relative'>
        <h2 className='font-semibold text-lg'>Ordenes ({resultsPeerPage})</h2>
        <OrdersTable orders={orders.results} />
      </section>
    </div>
  )
}
