import { getServerSession } from 'next-auth'

import { redirect } from 'next/navigation'

export default async function DulceTragoAdminPage () {
  const session = await getServerSession()

  if (session === null) {
    redirect('/api/auth/signin')
  }

  return (
    <main className='flex flex-col w-full h-full px-4 py-8'>
      <h1>This is a protected route</h1>
      <p>{session?.user?.name}</p>
    </main>
  )
}
