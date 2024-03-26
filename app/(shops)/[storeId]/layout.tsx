import { type Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Menu App',
  description: 'La app para tu negocio y para tu menu',
  keywords: ['restaurant', 'food', 'tlaxcala', 'menu', 'dashboard']
}

export default async function PageLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className='flex flex-col items-center max-w-7xl mx-auto relative'>
      {children}
    </main>
  )
}
