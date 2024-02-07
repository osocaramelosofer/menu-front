import React from 'react'
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader
} from '@nextui-org/react'
import useSocket from '@/hooks/useSocket'
import { useCartsStore } from '@/store/dulce_trago/carts-store'
import { type Socket } from 'socket.io-client'

export default function SharedCartTabsForm ({
  socket
}: {
  socket: Socket | null
}) {
  const [selected, setSelected] = React.useState('create')

  const {
    cartList,
    cartPrice,
    calculateCartPrice,
    roomId,
    username,
    setRoomId,
    setUsername
  } = useCartsStore()
  const handleCreateRoom = () => {
    socket?.emit(
      'create room',
      // eslint-disable-next-line @typescript-eslint/member-delimiter-style
      (response: { status: string; roomId: string; message: string }) => {
        if (response.status === 'success') {
          const newRoomId = response.roomId
          // Puedes redirigir al usuario aquí o actualizar la UI para mostrar el roomId
          console.log(`Room created with ID: ${newRoomId}`)
          setRoomId(newRoomId)
          handleJoinRoom(newRoomId, username)
        } else {
          console.error('Error creating room:', response.message)
        }
      }
    )
  }

  const handleJoinRoom = (roomId: string, username: string) => {
    // Asegúrate de obtener un identificador único para el usuario
    // setRoomId(roomId)
    socket?.emit(
      'join room',
      { roomId, username },
      (response: {
        status: string
        sharedCartList: any
        message: any
        members: any
      }) => {
        if (response.status === 'success') {
          // Ahora el usuario está en la sala, puedes manejar la lógica para mostrar el carrito compartido
          console.log(`Joined room with ID: ${roomId}`, response.sharedCartList)
          console.log(`Joined room members: ${roomId}`, response.members)
        } else {
          // Manejar errores aquí
          console.error('Error joining room:', response.message)
        }
      }
    )
  }
  return (
    <div className='flex flex-col w-full'>
      <Card className='max-w-full w-[340px] h-[300px] shadow-none'>
        <CardBody className='overflow-hidden'>
          <Tabs
            fullWidth
            color='warning'
            size='md'
            aria-label='Tabs form'
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key='create' title='Crear'>
              <form className='flex flex-col gap-4'>
                <Input
                  isRequired
                  label='Username'
                  placeholder='Enter your username'
                  value={username}
                  onValueChange={setUsername}
                />

                <div className='flex gap-2 justify-end text-white'>
                  <Button fullWidth color='primary' onPress={handleCreateRoom}>
                    Crear un Carrito Compartido
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key='join' title='Unirse'>
              <form className='flex flex-col gap-4 h-[300px]'>
                <Input
                  isRequired
                  label='Username'
                  placeholder='Enter your username'
                  value={username}
                  onValueChange={setUsername}
                />
                <Input
                  isRequired
                  label='Room ID'
                  placeholder='Enter an existing Room ID'
                  value={roomId}
                  onValueChange={setRoomId}
                />

                <div className='flex gap-2 justify-end text-white'>
                  <Button
                    fullWidth
                    color='primary'
                    onPress={() => {
                      handleJoinRoom(roomId, username)
                    }}
                  >
                    Unirse a un Carrito Compartido
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  )
}
