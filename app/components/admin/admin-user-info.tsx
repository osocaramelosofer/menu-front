'use client'
import { Button } from '@nextui-org/react'
import { type Session } from 'next-auth'
import { signOut } from 'next-auth/react'

export default async function AdminUserInfo ({
  session
}: {
  session: Session | null
}) {
  const handleLogout = async () => {
    await signOut()
  }

  return (
    <section className='flex flex-col w-full h-full px-4 py-8 border'>
      <h3>Username</h3>
      <p>{session?.user?.name}</p>
      <br />
      <h3>Email</h3>
      <p>{session?.user?.email}</p>
      <br />
      <Button
        color='danger'
        variant='flat'
        className=' max-w-xs'
        onPress={handleLogout}
      >
        Sign Out
      </Button>
    </section>
  )
}
