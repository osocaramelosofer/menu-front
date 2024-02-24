import { useCallback, useEffect, useState } from 'react'
import useSocket from './useSocket' // Asegúrate de importar correctamente tu hook useSocket
import { type ISharedCartList, useCartsStore } from '@/store/dulce_trago/carts-store'

export function useRoomSocket () {
  const socket = useSocket()
  const {
    cartList,
    cartPrice,
    roomId,
    username,
    setRoomId,
    setSharedCartList,
    addToCart, setIsInSharedCart, isInSharedCart
  } = useCartsStore()

  // Handler para crear una sala
  const handleCreateRoom = useCallback((username: string) => {
    socket?.emit('create room', { username }, (response: { status: string, roomId: any, message: any }) => {
      if (response.status === 'success') {
        setIsInSharedCart(true)
        console.log(`Room created with ID: ${response.roomId}`)
        setRoomId(response.roomId) // Asume que tienes una función setRoomId en tu estado global o local
        // handleJoinRoom(response.roomId, username)
      } else {
        console.error('Error creating room:', response.message)
      }
    })
  }, [socket, username])

  // Handler para unirse a una sala
  const handleJoinRoom = useCallback((roomId: string, username: string) => {
    socket?.emit('join room', { roomId, username }, (response: { status: string, sharedCartList: any, message: any, members: any }) => {
      if (response.status === 'success') {
        console.log(`Joined room with ID: ${roomId}`, response.sharedCartList)
        // console.log(`Joined room members: ${roomId}`, response.members)
        setIsInSharedCart(true)

        // UPDATE CART
        socket?.emit('UPDATE_CART', { roomId, username, cartList, cartPrice }, (response: { status: string, message: any, sharedCartList: any }) => {
          console.log('RES: ', response)

          if (response.status === 'success') {
            // console.log('Cart updated successfully')
          } else {
            console.error('Error updating cart:', response.message)
          }
        })
      } else {
        console.error('Error joining room:', response.message)
      }
    })
  }, [socket, username])

  const updateCart = useCallback(() => {
    socket?.emit('UPDATE_CART', { roomId, username, cartList, cartPrice }, (response: { status: string, message: any, sharedCartList: any }) => {
      console.log('RES: ', response)

      if (response.status === 'success') {
        // console.log('Cart updated successfully')
      } else {
        console.error('Error updating cart:', response.message)
      }
    })
  }, [socket, roomId, username, cartList, cartPrice, isInSharedCart])

  const handleLeaveRoom = useCallback((roomId: string) => {
    socket?.emit('leave room', { roomId, username }, (response: { status: string, message: any }) => {
      if (response.status === 'success') {
        // console.log(response.message)
        // Realizar acciones después de dejar la sala, como actualizar el estado
        setRoomId('')
        setSharedCartList([])
        setIsInSharedCart(false)
        // handleCartUpdate(roomId)
      } else {
        console.error(response.message)
      }
    })
  }, [socket, username, setRoomId, setSharedCartList])

  useEffect(() => {
    // Escuchar el evento de carrito compartido actualizado
    const handleSharedCartUpdated = (newSharedCartList: ISharedCartList[]) => {
      setSharedCartList(newSharedCartList)
    }

    socket?.on('SHARED_CART_UPDATED', handleSharedCartUpdated)

    // Limpiar el listener al desmontar
    return () => {
      socket?.off('SHARED_CART_UPDATED', handleSharedCartUpdated)
    }
  }, [socket, cartList, addToCart, isInSharedCart])

  return {
    handleCreateRoom,
    handleJoinRoom,
    // handleCartUpdate,
    handleLeaveRoom,
    updateCart
  }
}
