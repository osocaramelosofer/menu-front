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

export default function CartOrderForm ({ storeId }: { storeId: number }) {
  const { cartList, cartPrice, username, setUsername } = useCartsStore()
  const { paymentType, setPaymentType, loading, handleOrderCreation } =
    useOrderStore() // Utiliza la store de Zustand
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
    await handleOrderCreation(cartList, cartPrice, username, storeId)
      .then(createdOrder => {
        // Redirección a la página de agradecimiento y ticket de la orden
        router.push(`${storeId}/thank-you/${createdOrder.id}`)
      })
      .catch(error => {
        console.log(error)
      })
  }
  const itemClasses = {
    title: 'font-medium text-sm',
    subtitle: ' text-xs'
  }
  return (
    <Accordion isDisabled={cartList.length === 0} itemClasses={itemClasses}>
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
              {cartPrice.toFixed(2)}
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

          <Input
            color='success'
            size='sm'
            variant='flat'
            minLength={2}
            maxLength={10}
            isRequired
            label='Nombre'
            value={username}
            onValueChange={setUsername}
            description={
              <p className=' overflow-hidden flex flex-wrap whitespace-normal'>
                Ingresa un nombre para identificar tu pedido y hacerte saber
                cuando este listo.
              </p>
            }
          />
          <div className=' w-full'>
            <Button
              isLoading={loading}
              endContent={<FaChevronRight />}
              size='sm'
              fullWidth
              isDisabled={
                cartList.length === 0 ||
                username.length < 3 ||
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
