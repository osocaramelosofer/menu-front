'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@nextui-org/react'
import { FaChevronRight, FaPlus } from 'react-icons/fa'

export function SubmitButton ({
  label,
  isDisabled
}: {
  label: string
  isDisabled?: boolean
}) {
  const { pending } = useFormStatus()

  return (
    <Button
      endContent={<FaChevronRight />}
      isDisabled={pending || isDisabled}
      isLoading={pending}
      color='primary'
      fullWidth
      variant='shadow'
      type='submit'
      className='text-white capitalize'
    >
      {label}
    </Button>
  )
}
