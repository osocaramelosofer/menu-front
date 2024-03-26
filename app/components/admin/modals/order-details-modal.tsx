import React from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip
} from '@nextui-org/react'
import type { IOrder } from '@/interfaces/order'
import OrderReceiptBody from '../../orders/order-receipt-body'
import { getPaymentTypeDisplay } from '@/lib/utils'

export default function OrderDetailsModal ({ order }: { order: IOrder }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  // Calculate the grand total by summing the cartPrice of all userOrders
  const grandTotal = order.userOrders.reduce(
    (total, userOrder) => total + userOrder.cartPrice,
    0
  )

  return (
    <>
      <Button size='sm' onPress={onOpen}>
        Detalles
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                <h1>Detalles de la Orden</h1>
                <Chip size='sm' color='success'>
                  <p className=' font-normal text-white'>
                    Pago realizado con{' '}
                    {getPaymentTypeDisplay(order.paymentType)}
                  </p>
                </Chip>
              </ModalHeader>
              <ModalBody>
                <Card>
                  <CardHeader className=' flex flex-col border-b-1 border-default-200 gap-1 w-full items-end justify-center '>
                    <div className=' flex justify-between w-full font-semibold text-3xl'>
                      <h1>Total</h1>
                      <h1>
                        <span className='text-success'>$</span>
                        {grandTotal.toFixed(2)}
                      </h1>
                    </div>
                  </CardHeader>
                  <CardBody className='border-b-1 border-default-300 py-8 flex flex-col gap-3'>
                    <OrderReceiptBody userOrders={order.userOrders} />
                  </CardBody>
                  <CardFooter>
                    {order.createdAt != null && (
                      <h2 className=' text-base font-semibold opacity-70'>
                        {new Date(order.createdAt).toLocaleDateString(
                          'es-ES',
                          options
                        )}
                      </h2>
                    )}
                  </CardFooter>
                </Card>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
