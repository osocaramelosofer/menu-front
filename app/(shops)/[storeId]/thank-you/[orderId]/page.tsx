import React from 'react'
import { fetchOrderById } from '@/lib/actions/order.actions'
import type { IOrder } from '@/interfaces/order'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import type { IStore } from '@/interfaces/store'
import { fetchStoreById } from '@/lib/actions'
import NavBar from '@/app/components/common/nav-bar'
import OrderReceipt from '@/app/components/orders/order-receipt'

interface RootPageProps {
  // eslint-disable-next-line @typescript-eslint/member-delimiter-style
  params: { storeId: string; orderId: string }
}

export default async function Page ({ params }: RootPageProps) {
  const order: IOrder = await fetchOrderById(params.orderId)
  const store: IStore = await fetchStoreById(params.storeId)
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  return (
    <React.Fragment>
      <NavBar store={store} />
      <main className='flex flex-col gap-9 w-full px-4 py-20 relative justify-center max-w-xl'>
        <div>
          <h1 className=' font-semibold text-3xl text-center'>
            ¡Gracias por tu orden!
          </h1>
          <div className=' text-tiny opacity-70 font-medium flex flex-col gap-3 text-center mt-3'>
            <p>Tu orden ha sido realizada con éxito y está siendo procesada.</p>
            <p>
              Un miembro de nuestro equipo se comunicará contigo para confirmar
              la entrega y el pago. Por favor, asegúrate de tener listo el
              método de pago que seleccionaste.
            </p>
          </div>
        </div>
        <OrderReceipt order={order} />
      </main>
    </React.Fragment>
  )
}
