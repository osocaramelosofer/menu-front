import { useCartsStore } from '@/store/dulce_trago/carts-store'
import { useEffect, useState } from 'react'
import io, { type Socket } from 'socket.io-client'

// const SOCKET_URL = 'http://localhost:3001'
const SOCKET_URL = 'https://menu-app-server-io.vercel.app/'

export default function useSocket () {
  const [socket, setSocket] = useState<Socket | null>(null)

  const { setSocketId, username, roomId, cartList, cartPrice } = useCartsStore() // Suponiendo que tienes estas variables en tu store

  useEffect(() => {
    // Inicializar conexión Socket.io
    const socketIo = io(SOCKET_URL, {
      extraHeaders: {
        'my-custom-header': 'abcd'
      }
    })

    // Manejador de eventos de reconexión en el cliente
    socketIo.on('connect', () => {
      setSocketId(socketIo.id) // Actualiza el socketId en Zustand al conectarse

      // Verifica si tienes un roomId y username para emitir un evento de reconexión

      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (roomId && username) {
        socketIo.emit(
          'reconnect',
          { username, roomId },
          (response: { status: string }) => {
            // Verificar la respuesta y actualizar el estado si es necesario
            if (response.status === 'success') {
              console.log('Reconnected successfully')
              socketIo.emit(
                'UPDATE_CART',
                { roomId, username, cartList, cartPrice },
                (response: {
                  status: string
                  message: any
                  sharedCartList: any
                }) => {
                  // console.log('RES: ', response)

                  if (response.status === 'success') {
                    // console.log('Cart updated successfully')
                  } else {
                    console.error('Error updating cart:', response.message)
                  }
                }
              )
            }
          }
        )
      }
    })

    setSocket(socketIo)

    return () => {
      socketIo.disconnect()
    }
  }, [setSocketId])

  return socket
}
