'use client'
// pages/sharedCart/[roomId].tsx
import useSocket from '@/hooks/useSocket'
import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import { type IProduct } from '@/interfaces/product'

const SharedCart = (roomId: string) => {
  const [cart, setCart] = useState<IProduct[]>([])
  const socket = io('http://localhost:3001')

  useEffect(() => {
    socket.on('cart updated', updatedCart => {
      setCart(updatedCart)
    })
  }, [socket])

  // Aquí iría el JSX para renderizar tu carrito, algo así:
  return (
    <div>
      {cart.map(item => (
        <div key={item.id}>
          {/* Renderiza la información del producto aquí */}
          <p>{roomId}</p>
        </div>
      ))}
    </div>
  )
}

export default SharedCart
