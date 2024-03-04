'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@nextui-org/react'
import { FaPlus } from 'react-icons/fa'

export function SubmitButton () {
  const { pending } = useFormStatus()

  return (
    <Button
      startContent={<FaPlus />}
      isDisabled={pending}
      isLoading={pending}
      color='primary'
      fullWidth
      variant='shadow'
      type='submit'
      className='text-white'
    >
      Crear Nuevo Producto
    </Button>
  )
}
