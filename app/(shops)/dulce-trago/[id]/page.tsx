import ProductDetail from '@/app/components/dish-card/product-detail.client'
import api from '@/services/dulce_trago/api'
import { Image } from '@nextui-org/react'

export async function generateMetadata ({ params: { id } }: { params: { id: number } }) {
  const product = await api.getProduct(id)
  return {
    title: `${product.name} - Dulce Trago`,
    description: `${product.description}`
  }
}

// This works to generate the static pages
export async function generateStaticParams () {
  const products = await api.list()
  return products.map((product) => ({ id: product.id.toString() }))
}

export default async function Page ({ params }: { params: { id: number } }) {
  const product = await api.getProduct(params.id)
  return <ProductDetail product={product}/>
}
