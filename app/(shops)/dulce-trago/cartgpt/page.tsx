'use client'
import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { Button, Input } from '@nextui-org/react'
import { useProductsStore } from '@/store/dulce_trago/products-store'
import FeaturedProductCard from '@/app/components/featured-products/featured-product-card'
import { type IProduct } from '@/interfaces/product'
import ProductCard from '@/app/components/products/product-card'
import CartProductCard from '@/app/components/cart/cart-product-card'
import { useCartsStore } from '@/store/dulce_trago/carts-store'

export default function CartGptPage () {
  const {
    cartList,
    addToCart,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    calculateCartPrice,
    cartPrice
  } = useCartsStore()

  const { products, getProductsList } = useProductsStore()

  const incrementCartItemQuantityHandler = (id: number) => {
    incrementCartItemQuantity(id)
    // calculateCartPrice()
  }

  const decrementCartItemQuantityHandler = (id: number) => {
    decrementCartItemQuantity(id)
    // calculateCartPrice()
  }

  useEffect(() => {
    getProductsList()
  }, [])
  // useEffect(() => {
  //   calculateCartPrice()
  // }, [])

  //   if (cartList.length === 0) {
  //     return <div>Cart is empty</div>
  //   }

  return (
    <div className='flex flex-col border rounded-lg gap-4 w-full justify-center items-center p-12 overflow-hidden'>
      <div className=' flex overflow-auto border'>
        {products?.map((product, index) => {
          const handleSubmit = (product: IProduct) => {
            addToCart(product)
            console.log('CART LIST: ', cartList)
            calculateCartPrice()
          }

          return (
            <FeaturedProductCard
              handleAddToCart={() => {
                handleSubmit(product)
              }}
              key={`${product.id}${index}`}
              product={product}
            />
          )
        })}
      </div>
      <div className='border '>
        <h1>CART</h1>
        <h1>TOTAL: ${cartPrice}</h1>

        <div className=' flex flex-col gap-8'>
          {cartList.map(product => (
            <CartProductCard
              key={product.id}
              product={product}
              incrementCartItemQuantityHandler={
                incrementCartItemQuantityHandler
              }
              decrementCartItemQuantityHandler={
                decrementCartItemQuantityHandler
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}
