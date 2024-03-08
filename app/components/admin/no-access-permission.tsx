'use client'
import React from 'react'

import { signOut } from 'next-auth/react'
import { Button } from '@nextui-org/react'

export default function NoAccessPermission () {
  const handleLogout = async () => {
    await signOut()
  }

  return (
    <div className=' flex flex-col w-full h-screen items-center justify-center p-8 gap-4'>
      <h1 className=' font-semibold text-2xl'>Sin permiso de acceso</h1>
      <div className=' flex flex-col text-opacity-70 text-sm text-center'>
        <p className=''>
          Tu cuenta no tiene el permiso para acceder a esta pagina.
          <p>
            Intenta cerrar session y volver a iniciar con otra cuenta que tenga
            los permisos necesarios. O regresa al Inicio.
          </p>
        </p>
      </div>
      <div className='flex gap-3 '>
        <Button as='a' href='/'>
          Volver al Inicio
        </Button>
        <Button color='danger' variant='flat' onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      </div>
    </div>
  )
}
