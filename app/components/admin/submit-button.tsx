'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@nextui-org/react'

export function SubmitButton () {
  const { pending } = useFormStatus()

  return (
    <Button
      isDisabled={pending}
      isLoading={pending}
      color='primary'
      fullWidth
      type='submit'
      className='text-white'
    >
      Crear Nuevo Producto
    </Button>
  )
}
