'use client'
// hooks/useSocket.ts

import { useEffect, useState } from 'react'
import io from 'socket.io-client'

// Asegúrate de usar tu URL correcta
const SOCKET_SERVER_URL = 'http://localhost:3001'

const useSocket = () => {
  const socket = io(SOCKET_SERVER_URL)

  useEffect(() => {
    // Inicializar la conexión de socket al montar
    const socketIo = io(SOCKET_SERVER_URL)

    // setSocket(socketIo)

    // Limpieza al desmontar
    return () => {
      socketIo.disconnect()
    }
  }, [])

  return socket
}

export default useSocket
