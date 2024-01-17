'use client'

import { type IUser } from '@/interfaces/user'
import { signOut } from 'next-auth/react'

interface UserInfoProps {
  user: IUser
}

export default function UserInfo ({ user }: UserInfoProps) {
  const handleLogout = async () => {
    await signOut()
  }

  return (
    <div className='rounded-lg border shadow-lg p-10'>
      <div>Name : {user.name}</div>
      <div>Email : {user.email}</div>
      <button
        className='font-medium mt-2 text-blue-600 hover:underline'
        onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  )
}
