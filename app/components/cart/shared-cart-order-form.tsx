'use client'

import React from 'react'
import {
  Accordion,
  AccordionItem,
  Button,
  Input,
  Select,
  SelectItem
} from '@nextui-org/react'

import { FaChevronRight } from 'react-icons/fa'
import { useCartsStore } from '@/zustand-store/carts-store'
import { useOrderStore } from '@/zustand-store/orders-store'

import { useRouter } from 'next/navigation'

export default function SharedCartOrderForm ({ storeId }: { storeId: number }) {
  const { roomId, sharedCartList, setSharedCartList } = useCartsStore()

  const totalPrice = sharedCartList.reduce(
    (sum, cart) => sum + Number(cart.cartPrice),
    0
  )
  const {
    paymentType,
    setPaymentType,
    loading,
    handleOrderCreation,
    handleSharedOrderCreation
  } = useOrderStore() // Utiliza la store de Zustand
  const payments = [
    {
      label: 'Pago en efectivo',
      value: 'cash'
    },
    {
      label: 'Solicitar terminal',
      value: 'terminal'
    },
    {
      label: 'Transferencia bancaria',
      value: 'transfer'
    }
  ]
  const router = useRouter()

  const handleOrderNow = async () => {
    // Muestra un cuadro de diálogo de confirmación
    const message =
      '¿Estás seguro de que quieres realizar esta orden?\n' +
      'Al confirmar, tu carrito se vaciará y la orden entrará en preparación para el pago.'

    const isConfirmed = window.confirm(message)
    if (isConfirmed) {
      await handleSharedOrderCreation(sharedCartList, storeId)
        .then(createdOrder => {
          // Redirección a la página de agradecimiento y ticket de la orden
          router.refresh()
          router.push(`${storeId}/thank-you/${createdOrder.id}`)
          //   setSharedCartList([])
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  const itemClasses = {
    title: 'font-medium text-sm',
    subtitle: ' text-xs'
  }
  return (
    <Accordion itemClasses={itemClasses}>
      <AccordionItem
        key='1'
        title='Ordena desde aquí'
        subtitle='Ordena desde aquí'
        // subtitle='Completa los datos y ordena tu pedido'
        aria-label='Total order and order form'
        startContent={
          <div className='flex flex-col flex-1 justify-center items-center'>
            <p className='text-sm font-medium'>Total</p>
            <h3 className='text-2xl font-bold'>
              <span className='text-success'>$</span>
              {totalPrice.toFixed(2)}
            </h3>
          </div>
        }
      >
        <div className=' flex flex-col justify-between w-full items-start gap-3'>
          <Select
            isRequired
            size='sm'
            fullWidth
            label='Método de pago'
            variant='flat'
            color='success'
            value={paymentType}
            description={
              <p className=' overflow-hidden flex flex-wrap whitespace-normal'>
                Selecciona tu método de pago para anticipar tu cobro.
              </p>
            }
            onChange={value => {
              setPaymentType(value)
            }}
          >
            {payments.map(payment => (
              <SelectItem key={payment.value} value={payment.value}>
                {payment.label}
              </SelectItem>
            ))}
          </Select>

          <div className=' w-full'>
            <Button
              isLoading={loading}
              endContent={<FaChevronRight />}
              size='sm'
              fullWidth
              isDisabled={
                // username.length < 3 ||
                paymentType.length === 0
              }
              className='flex flex-1 text-white'
              color='success'
              onPress={handleOrderNow}
            >
              Ordenar Ahora
            </Button>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  )
}
