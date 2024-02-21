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
  Divider,
  AvatarGroup,
  Avatar,
  AvatarIcon,
  Snippet
} from '@nextui-org/react'
import { DulceTragoLogo } from '../logo'

import { FaShoppingBag, FaUser, FaUserAlt } from 'react-icons/fa'
import { useCartsStore } from '@/store/dulce_trago/carts-store'
import CartProductCard from '../cart/cart-product-card'
import { type Socket } from 'socket.io-client'

export default function SharedCartList ({ socket }: { socket: Socket | null }) {
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

  const totalPrice = sharedCartList.reduce(
    (sum, cart) => sum + Number(cart.cartPrice),
    0
  )

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
  }, [socket])

  useEffect(() => {
    if (socket !== null) {
      handleCartUpdate()
    }
  }, [socket, totalPrice])

  const handleLeaveRoom = () => {
    socket?.emit(
      'leave room',
      { roomId, username },
      // eslint-disable-next-line @typescript-eslint/member-delimiter-style
      (response: { status: string; message: any }) => {
        if (response.status === 'success') {
          console.log(response.message)
          // Aquí puedes redirigir al usuario a otra parte de la aplicación o actualizar el estado
          // Por ejemplo:
          setRoomId('')
          setSharedCartList([])
        } else {
          console.error(response.message)
        }
      }
    )
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
              className='max-h-[90vh] max-w-[95vw] min-w-[95vw] relative'
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
                  <h1 className=' text-xl font-semibold'>Carrito Compartido</h1>
                  <div className=' flex gap-2 items-center my-1'>
                    <Snippet symbol='🟢' size='sm' color='success'>
                      {roomId}
                    </Snippet>
                    <Button
                      size='sm'
                      variant='flat'
                      color='danger'
                      className=' capitalize'
                      onPress={handleLeaveRoom}
                    >
                      Abandonar carrito
                    </Button>
                  </div>

                  <AvatarGroup
                    className=' my-2'
                    isBordered
                    max={5}
                    renderCount={count => (
                      <p className='text-small text-foreground font-medium ms-2'>
                        +{count} {count === 1 ? 'otro' : 'otros'}
                      </p>
                    )}
                  >
                    {sharedCartList.map(item => (
                      <Avatar
                        icon={<FaUserAlt />}
                        size='sm'
                        classNames={{
                          base: 'bg-gradient-to-br from-background to-secondary',
                          icon: 'text-primary text-lg'
                        }}
                        key={item.username}
                      />
                    ))}
                  </AvatarGroup>
                </DropdownItem>
                {/* eslint-disable-next-line multiline-ternary */}

                <DropdownItem
                  className='border-none'
                  showDivider
                  isReadOnly
                  textValue='List of products in cart'
                >
                  {sharedCartList.map((cart, index) => (
                    <div
                      key={`${cart.username}-${index}`}
                      className={`flex flex-col gap-1 border bg-background rounded-lg px-1 py-2 mb-3 ${
                        cart.username === username
                          ? ' opacity-100'
                          : ' opacity-60'
                      }`}
                    >
                      <div className='flex gap-2 justify-between items-center border-b-1 pb-2'>
                        <div className=' flex items-center gap-2 '>
                          <Avatar
                            size='sm'
                            classNames={{
                              base: 'bg-gradient-to-br from-background to-secondary maw-w-[2rem] max-h-[2rem]',
                              icon: ' display-none opacity-0'
                            }}
                          />
                          <div>
                            <p className=' font-semibold'>Orden de:</p>
                            <p className=' opacity-80'>
                              {cart.username === username
                                ? `${cart.username} (Tú)`
                                : `${cart.username}`}
                            </p>
                          </div>
                        </div>

                        <h3 className='text-sm font-bold '>
                          Total: <span className='text-success'>$</span>
                          {cart.cartPrice}
                        </h3>
                      </div>

                      {/* eslint-disable-next-line multiline-ternary */}
                      {cart.cartList.length === 0 ? (
                        <div className=' flex flex-col justify-center items-center my-4 px-2 text-primary'>
                          <h2 className=' text-lg font-medium'>
                            Sin productos
                          </h2>
                          <p className=' mb-2 line-clamp-2 opacity-70 text-sm text-center'>
                            Al parecer, {cart.username} aún no ha agregado{' '}
                            <br />
                            ningún producto.
                          </p>
                          <FaShoppingBag size={30} />
                        </div>
                      ) : (
                        cart.cartList.map((product, productIndex) => (
                          <CartProductCard
                            key={`${cart.username}-${product.id}-${productIndex}`}
                            product={product}
                            isDisabled={cart.username !== username}
                          />
                        ))
                      )}
                    </div>
                  ))}
                </DropdownItem>

                <DropdownItem
                  className='border-none'
                  isReadOnly
                  textValue='Total Price'
                >
                  <div className='flex flex-col justify-center items-center'>
                    <p className='text-sm font-medium'>Total de la Orden</p>
                    <h3 className='text-2xl font-bold '>
                      <span className='text-success'>$</span>
                      {totalPrice.toFixed(2)}
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
