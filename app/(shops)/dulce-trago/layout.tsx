import NavBar from '@/app/components/nav-bar'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dulce Trago - Restaurant',
  description: 'Restaurant de arte',
  keywords: ['restaurant', 'food', 'tlaxcala', 'coffe']
}

export default function PageLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className=' flex flex-col items-center max-w-7xl mx-auto  relative'>
      <NavBar />
      {children}
    </main>
  )
}
