import NavBar from '@/app/components/common/nav-bar'

import { type Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Dulce Trago - Restaurant',
  description: 'Restaurant de arte',
  keywords: ['restaurant', 'food', 'tlaxcala', 'coffe']
}

export default async function PageLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <NavBar />
      {children}
    </main>
  )
}
