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

// Conectar al servidor de Socket.io
const socket = io('http://localhost:3001')

export default function CartPage () {
  const [roomId, setRoomId] = useState('')
  const [userId, setUserId] = useState('')
  const [cart, setCart] = useState([])
  const productId = 26

  const { getProductsList, products } = useProductsStore()
  const { addToCart, cartList } = useCartsStore()
  // console.log('cartList: ', cart)

  useEffect(() => {
    getProductsList()
  }, [])

  const handleJoinRoom = () => {
    socket.emit('join room', { roomId, userId })
  }

  return (
    <div className='flex flex-col border rounded-lg gap-4 w-full justify-center items-center p-12 overflow-hidden'>
      <h1>Carrito Compartido</h1>
      <div className=' flex overflow-auto'>
        {products.map((product, index) => {
          const handleSubmit = (product: IProduct) => {
            socket.emit('product in cart', roomId, { product, userId })
          }

          return (
            <FeaturedProductCard
              key={`${product.id}${index}`}
              product={product}
            />
          )
        })}
      </div>
      <Input
        type='text'
        placeholder='ID de la Sala'
        onChange={e => {
          setRoomId(e.target.value)
        }}
      />
      <Input
        type='text'
        placeholder='username'
        onChange={e => {
          setUserId(e.target.value)
        }}
      />

      <Button onClick={handleJoinRoom}>Unirse a la Sala</Button>

      {/* <div>
        {cart?.map((product, index) => {
          const handleRemoveFromCart = (product: IProduct) => {
            console.log('Eliminando producto', product, 'por usuario', userId)
            socket.emit('remove product from cart', roomId, { product, userId })
          }
          return <CartProductCard key={index} product={product} />
        })}
      </div> */}
      <div className='border'>
        {cartList.map((product, index) => (
          <p key={index}>Cart item: {product.name}</p>
        ))}
      </div>
    </div>
  )
}
