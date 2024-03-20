import React from 'react'
import type { IOrder } from '@/interfaces/order'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import OrderReceiptBody from './order-receipt-body'

export default async function Page ({ order }: { order: IOrder }) {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  return (
    <React.Fragment>
      {order.userOrders.map(userOrder => (
        <Card key={userOrder.id}>
          <CardHeader className='flex justify-between w-full font-semibold text-3xl border-b-1 border-default-200 '>
            <h1>Total</h1>
            <h1>
              <span className='text-success'>$</span>
              {userOrder.cartPrice.toFixed(2)}
            </h1>
          </CardHeader>
          <CardBody className='border-b-1 border-default-300 py-8 flex flex-col gap-3'>
            <OrderReceiptBody userOrders={order.userOrders} />
          </CardBody>
          <CardFooter>
            {order.createdAt != null && (
              <h2 className=' text-base font-semibold opacity-70'>
                {new Date(order.createdAt).toLocaleDateString('es-ES', options)}
              </h2>
            )}
          </CardFooter>
        </Card>
      ))}
    </React.Fragment>
  )
}
