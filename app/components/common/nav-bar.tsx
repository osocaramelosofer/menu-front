'use client'

import React, { useEffect } from 'react'
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
import SharedCartTabsForm from '../cart/shared-cart-tabs-form'
import SharedCartList from '../cart/shared-cart-list'

export default function NavBar () {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const {
    cartList,
    cartPrice,
    calculateCartPrice,
    roomId,
    username,
    setRoomId,
    setSharedCartList,
    sharedCartList
  } = useCartsStore()
  const socket = useSocket() // Usa el hook aquí
  // const socket = io('http://localhost:3001')
  // const [roomId, setRoomId] = React.useState('')
  // const [value, setValue] = React.useState('')
  // const [username, setUsername] = React.useState('')
  // const [hostName, setHostName] = React.useState('')

  // const handleCreateRoom = () => {
  //   socket.emit(
  //     'create room',
  //     // eslint-disable-next-line @typescript-eslint/member-delimiter-style
  //     (response: { status: string; roomId: any; message: any }) => {
  //       if (response.status === 'success') {
  //         const newRoomId = response.roomId
  //         // setRoomId(newRoomId)
  //         // Puedes redirigir al usuario aquí o actualizar la UI para mostrar el roomId
  //         console.log(`Room created with ID: ${newRoomId}`)
  //         setRoomId(newRoomId)
  //         handleJoinRoom(newRoomId, 'host')
  //       } else {
  //         console.error('Error creating room:', response.message)
  //       }
  //     }
  //   )
  // }

  // const handleJoinRoom = (roomId: string, username: string) => {
  //   // Asegúrate de obtener un identificador único para el usuario
  //   // setRoomId(roomId)
  //   socket.emit(
  //     'join room',
  //     { roomId, username },
  //     // eslint-disable-next-line @typescript-eslint/member-delimiter-style
  //     (response: {
  //       status: string
  //       sharedCartList: any
  //       message: any
  //       members: any
  //     }) => {
  //       if (response.status === 'success') {
  //         // Ahora el usuario está en la sala, puedes manejar la lógica para mostrar el carrito compartido
  //         console.log(`Joined room with ID: ${roomId}`, response.sharedCartList)
  //         console.log(`Joined room members: ${roomId}`, response.members)
  //       } else {
  //         // Manejar errores aquí
  //         console.error('Error joining room:', response.message)
  //       }
  //     }
  //   )
  // }

  // const handleCartUpdate = () => {
  //   socket.emit(
  //     'update cart',
  //     { roomId, username, cartList },
  //     // eslint-disable-next-line @typescript-eslint/member-delimiter-style
  //     (response: { status: string; message: any; cartList: any }) => {
  //       if (response.status === 'success') {
  //         // Ahora el usuario está en la sala, puedes manejar la lógica para mostrar el carrito compartido
  //         console.log('shared cartttt: ', response.cartList)
  //       } else {
  //         // Manejar errores aquí
  //         console.error('Error updating cart:', response.message)
  //       }
  //     }
  //   )
  // }

  const handleCartUpdate = () => {
    socket?.emit(
      'update cart',
      { roomId, username, cartList, cartPrice },
      // eslint-disable-next-line @typescript-eslint/member-delimiter-style
      (response: { status: string; message: any; sharedCartList: any }) => {
        if (response.status !== 'success') {
          console.error('Error updating shared cart:', response.message)
        }
      }
    )
  }

  React.useEffect(() => {
    if (socket !== null) {
      socket.on('shared cart updated', updatedSharedCartList => {
        // Aquí puedes actualizar el estado local con la lista compartida de carritos
        // Por ejemplo, guardarlo en un estado o en un store de Zustand
        console.log('Shared cart list:', updatedSharedCartList)
        setSharedCartList(updatedSharedCartList)
      })

      // No olvides limpiar el listener cuando el componente se desmonte
      return () => {
        socket.off('shared cart updated')
      }
    }
  }, [socket, cartPrice])

  useEffect(() => {
    if (socket !== null) {
      handleCartUpdate()
    }
  }, [cartPrice])

  if (sharedCartList.length > 0) {
    return <SharedCartList socket={socket} />
  }
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
                  <SharedCartTabsForm socket={socket} />
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
