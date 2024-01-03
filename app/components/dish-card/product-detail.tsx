import { type IProduct } from '@/interfaces/product'
import { Image } from '@nextui-org/react'

export default function ProductDetail ({ product }: { product: IProduct }) {
  const image = 'https://res.cloudinary.com/drzrkaoje/' + product.main_image
  console.log('product ==== ', product)
  return (
    <div>
        <Image
            width={300}
            height={200}
            alt='product image'
            src={image}
        />
        <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
        </div>
    </div>
  )
}
