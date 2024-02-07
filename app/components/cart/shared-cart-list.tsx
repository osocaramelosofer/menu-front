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
  AvatarIcon
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
                    Mi Carrito Compartido{' '}
                    <span className=' text-success'>{roomId}</span>
                  </h1>
                  <Button color='danger' onPress={handleLeaveRoom}>
                    Abandonar carrito compartido
                  </Button>
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
                {sharedCartList.length === 0 ? (
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
                    {sharedCartList.map((cart, index) => (
                      <div
                        key={`${cart.username}-${index}`}
                        className={`flex flex-col gap-1 border ${
                          cart.username === username
                            ? ' opacity-100'
                            : ' opacity-60'
                        }`}
                      >
                        <p>added by: {cart.username}</p>
                        <h3 className='text-lg font-bold '>
                          <span className='text-success'>$</span>
                          {cart.cartPrice}
                        </h3>
                        {cart.cartList.map((product, productIndex) => (
                          <CartProductCard
                            key={`${cart.username}-${product.id}-${productIndex}`}
                            product={product}
                            isDisabled={cart.username !== username}
                          />
                        ))}
                      </div>
                    ))}
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
