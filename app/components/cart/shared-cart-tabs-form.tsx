import React from 'react'
import { Tabs, Tab, Input, Button, Card, CardBody } from '@nextui-org/react'
import { useCartsStore } from '@/zustand-store/carts-store'
import { useRoomSocket } from '@/hooks/useRoomSockets'

export default function SharedCartTabsForm ({
  handleCreateRoom,
  handleJoinRoom
}: {
  handleCreateRoom: () => void
  handleJoinRoom: (username: string, roomId: string) => void
}) {
  const [selected, setSelected] = React.useState<any>('join')

  const { roomId, username, setRoomId, setUsername } = useCartsStore()
  // const { handleCreateRoom, handleJoinRoom } = useRoomSocket()

  return (
    <div className='flex flex-col w-full'>
      <Card className='shadow-none border '>
        <CardBody className='overflow-hidden'>
          <Tabs
            fullWidth
            size='sm'
            color='warning'
            variant='underlined'
            className=' shadow-none'
            aria-label='Tabs form'
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key='create' title='Crear'>
              <form
                onSubmit={e => {
                  e.preventDefault()
                  handleCreateRoom()
                }}
                className='flex flex-col gap-4'
              >
                <Input
                  size='sm'
                  minLength={2}
                  maxLength={10}
                  isRequired
                  label='Username'
                  placeholder='Enter your username'
                  value={username}
                  onValueChange={setUsername}
                />

                <div className='flex gap-2 justify-end text-white'>
                  <Button type='submit' size='sm' fullWidth color='primary'>
                    Crear un Carrito Compartido
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key='join' title='Unirse'>
              <form
                onSubmit={e => {
                  e.preventDefault()
                  handleJoinRoom(roomId, username)
                }}
                className='flex flex-col gap-4'
              >
                <Input
                  size='sm'
                  isRequired
                  minLength={2}
                  maxLength={10}
                  label='Username'
                  placeholder='Enter your username'
                  value={username}
                  onValueChange={setUsername}
                />
                <Input
                  size='sm'
                  minLength={5}
                  maxLength={5}
                  isRequired
                  label='Room ID'
                  placeholder='Enter an existing Room ID'
                  value={roomId}
                  onValueChange={setRoomId}
                />

                <div className='flex gap-2 justify-end text-white'>
                  <Button type='submit' size='sm' fullWidth color='primary'>
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
