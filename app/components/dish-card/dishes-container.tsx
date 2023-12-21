import DishCard, { type IDishCardProps } from './dish-card'
import api from '@/services/dulce_trago/api'

export default async function DishesContainer () {
  const products = await api.list()
  return (
    <section className='flex flex-col gap-5'>
      {products.map((product, index) => (
        <DishCard
          key={index}
          srcImage={product.main_image}
          dishName={product.name}
          description={product.description}
          price={null}
        />
      ))}
    </section>
  )
}
