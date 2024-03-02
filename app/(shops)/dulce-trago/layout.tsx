import NavBar from '@/app/components/common/nav-bar'
import ProductDetailModal from '@/app/components/common/product-detail-modal'

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
    <main className=' flex flex-col items-center max-w-7xl mx-auto  relative'>
      <NavBar />
      {children}
      <ProductDetailModal />
    </main>
  )
}
