import { type IProduct } from '@/interfaces/product'
import { Image } from '@nextui-org/react'

export default function ProductDetail ({ product: { id, name, main_image, description } }: { product: IProduct }) {
  return (
    <div>
        <Image
            width={300}
            height={200}
            alt='product image'
            src={main_image}
        />
        <div>
            <h2>{name}</h2>
            <p>{description}</p>
        </div>
    </div>
  )
}
