'use server'

import api from '@/services/dulce_trago/api'
import ProductsContainerClient from './products-container.client'

export default async function ProductsContainer () {
  const products = await api.list()

  return <ProductsContainerClient products={products} />
}
