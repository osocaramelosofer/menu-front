import { Spinner } from '@nextui-org/react'

export default function Loading () {
  return (
    <div className=' flex flex-col justify-center items-center h-screen w-screen'>
      <Spinner
        label='Entrando al Dashboard...'
        color='primary'
        labelColor='primary'
      />
    </div>
  )
}
