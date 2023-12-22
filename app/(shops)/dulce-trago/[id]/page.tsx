import ProductDetail from '@/app/components/dish-card/product-detail'
import api from '@/services/dulce_trago/api'

export default async function Page ({ params }: { params: { id: string } }) {
  const product = await api.getProduct(params.id)
  return <ProductDetail product={product}/>
}
