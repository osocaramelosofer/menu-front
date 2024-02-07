import { useEffect, useState } from 'react'
import io, { type Socket } from 'socket.io-client'

const SOCKET_URL = 'http://localhost:3001'
export default function useSocket (): Socket | null {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    // Inicializar conexión Socket.io
    const socketIo = io(SOCKET_URL)
    setSocket(socketIo)

    return () => {
      socketIo.disconnect()
    }
  }, [])

  return socket
}
