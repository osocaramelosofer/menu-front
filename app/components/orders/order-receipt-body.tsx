'use client'

import React from 'react'
import { Accordion, AccordionItem, Avatar, Badge } from '@nextui-org/react'

import { FaUserAlt } from 'react-icons/fa'

import type { IUserOrders } from '@/interfaces/order'

export default function OrderReceiptBody ({
  userOrders
}: {
  userOrders: IUserOrders[]
}) {
  return (
    <Accordion isCompact defaultExpandedKeys={['all']} selectionMode='multiple'>
      {userOrders.map((cart, index) => (
        <AccordionItem
          textValue={`${cart.username}-${index}`}
          key={cart.id}
          title={
            <div className='flex gap-2 justify-between items-center'>
              <div className=' flex items-center gap-2 '>
                <Badge
                  isDot
                  variant='solid'
                  content={cart.cartList.length}
                  size='md'
                  showOutline={false}
                  color='success'
                  shape='rectangle'
                  placement='top-left'
                  className=' text-white font-semibold'
                >
                  <Avatar
                    icon={<FaUserAlt />}
                    isBordered
                    size='sm'
                    classNames={{
                      base: 'bg-gradient-to-br from-background to-primary/10 maw-w-[2rem] max-h-[2rem]',
                      icon: 'text-primary text-lg'
                    }}
                  />
                </Badge>
                <div>
                  <p className=' font-semibold'>Orden de:</p>
                  <p className=' opacity-80'>{cart.username}</p>
                </div>
              </div>

              <h3 className='text-sm font-bold '>
                Total: <span className='text-success'>$</span>
                {Number(cart.cartPrice).toFixed(2)}
              </h3>
            </div>
          }
          className={
            'flex flex-col gap-1  bg-background rounded-lg px-1 py-2 mb-3'
          }
        >
          {cart.cartList.map(product => (
            <div
              key={product.productId}
              className=' text-sm opacity-70 font-medium gap-4 flex justify-between mb-3'
            >
              <div className=' flex flex-col'>
                <h3 className=' font-semibold text-lg'>
                  {product.product?.name}
                </h3>
                <p className='text-tiny'>{product.quantity}</p>
              </div>
              <p>${product.product?.price.toFixed(2)}</p>
            </div>
          ))}
        </AccordionItem>
      ))}
    </Accordion>
  )
}
