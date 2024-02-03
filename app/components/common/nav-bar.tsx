'use client'

import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Link,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Badge,
  Input,
  Divider
} from '@nextui-org/react'
import { DulceTragoLogo } from '../logo'
import io from 'socket.io-client'

import { FaShoppingBag } from 'react-icons/fa'
import { useCartsStore } from '@/store/dulce_trago/carts-store'
import CartProductCard from '../cart/cart-product-card'
import useSocket from '@/hooks/useSocket'

export default function NavBar () {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const socket = io('http://localhost:3001')
  const [roomId, setRoomId] = React.useState('')
  const [value, setValue] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [hostName, setHostName] = React.useState('')

  const handleCreateRoom = () => {
    socket.emit(
      'create room',
      // eslint-disable-next-line @typescript-eslint/member-delimiter-style
      (response: { status: string; roomId: any; message: any }) => {
        if (response.status === 'success') {
          const newRoomId = response.roomId
          // setRoomId(newRoomId)
          // Puedes redirigir al usuario aquí o actualizar la UI para mostrar el roomId
          console.log(`Room created with ID: ${newRoomId}`)
          setRoomId(newRoomId)
          handleJoinRoom(newRoomId, hostName)
        } else {
          console.error('Error creating room:', response.message)
        }
      }
    )
  }

  const handleJoinRoom = (roomId: string, userId: string) => {
    // Asegúrate de obtener un identificador único para el usuario
    socket.emit(
      'join room',
      { roomId, userId },
      // eslint-disable-next-line @typescript-eslint/member-delimiter-style
      (response: { status: string; cart: any; message: any; members: any }) => {
        if (response.status === 'success') {
          // Ahora el usuario está en la sala, puedes manejar la lógica para mostrar el carrito compartido
          console.log(
            `Joined room with ID: ${roomId}`,
            response.cart,
            response.members
          )
        } else {
          // Manejar errores aquí
          console.error('Error joining room:', response.message)
        }
      }
    )
  }

  const { cartList, cartPrice, calculateCartPrice } = useCartsStore()

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className='w-screen overflow-x-hidden bg-primary text-white'
    >
      <NavbarContent className='w-full'>
        <div className='flex w-full justify-end items-center relative'>
          <NavbarBrand
            as={Link}
            href='/dulce-trago/'
            className='max-w-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
          >
            <DulceTragoLogo />
          </NavbarBrand>
          <Badge
            content={cartList.length}
            size='sm'
            showOutline={false}
            color='danger'
            shape='circle'
          >
            <Dropdown
              onOpenChange={() => {
                calculateCartPrice()
              }}
              backdrop='opaque'
              className='max-h-[36rem] max-w-[23rem] relative'
            >
              <DropdownTrigger>
                <Button isIconOnly color='primary' radius='full'>
                  <FaShoppingBag size={22} />
                </Button>
              </DropdownTrigger>

              <DropdownMenu
                className='overflow-y-auto'
                variant='faded'
                aria-label='Dropdown menu with icons'
              >
                <DropdownItem
                  className='border-none'
                  showDivider
                  isReadOnly
                  textValue='Mi Carrito'
                >
                  <h1 className=' text-xl font-semibold'>
                    Mi Carrito <span className=' text-success'>{roomId}</span>
                  </h1>
                  Host Form
                  <div className=' flex gap-4 mb-4'>
                    <Input
                      isRequired
                      label='Host username'
                      size='sm'
                      placeholder='Enter your username'
                      value={hostName}
                      onValueChange={setHostName}
                    />

                    <Button onPress={handleCreateRoom}>Create Room</Button>
                  </div>
                  Guest Form
                  <div className=' flex gap-4 mt-4 items-end'>
                    <form className=' flex flex-col gap-2'>
                      <Input
                        required
                        isRequired
                        label='Room ID'
                        size='sm'
                        placeholder='Enter an existing Room ID'
                        value={value}
                        onValueChange={setValue}
                      />
                      <Input
                        required
                        isRequired
                        minLength={3}
                        maxLength={15}
                        label='Username'
                        size='sm'
                        placeholder='Enter a funny username'
                        value={username}
                        onValueChange={setUsername}
                      />
                    </form>
                    <Button
                      type='submit'
                      onPress={() => {
                        handleJoinRoom(value, username)
                      }}
                    >
                      Join Room
                    </Button>
                  </div>
                </DropdownItem>
                {/* eslint-disable-next-line multiline-ternary */}
                {cartList.length === 0 ? (
                  <DropdownItem
                    textValue='Empty cart text'
                    className='border-none'
                    showDivider
                    isReadOnly
                  >
                    <div className=' flex flex-col justify-center items-center my-4 text-primary'>
                      <h2 className=' text-xl font-medium'>Sin productos</h2>
                      <p className=' mb-2 line-clamp-2 opacity-70 text-center'>
                        No has agregado productos a tu carrito aún.
                      </p>
                      <FaShoppingBag size={50} />
                    </div>
                  </DropdownItem>
                ) : (
                  <DropdownItem
                    className='border-none'
                    showDivider
                    isReadOnly
                    textValue='List of products in cart'
                  >
                    {cartList.map((product, index) => {
                      return (
                        <CartProductCard
                          key={`${product.id}${index}`}
                          product={product}
                        />
                      )
                    })}
                  </DropdownItem>
                )}

                <DropdownItem
                  className='border-none'
                  isReadOnly
                  textValue='Total Price'
                >
                  <div className='flex flex-col justify-center items-center'>
                    <p className='text-sm font-medium'>Total</p>
                    <h3 className='text-2xl font-bold '>
                      <span className='text-success'>$</span>
                      {cartPrice}
                    </h3>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Badge>
        </div>
      </NavbarContent>
    </Navbar>
  )
}
