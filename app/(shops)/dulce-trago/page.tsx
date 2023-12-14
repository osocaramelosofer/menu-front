import DishesContainer from '@/app/components/dish-card/dishes-container'
import PromoCard from '@/app/components/promo-card'
import { dishesData } from '@/lib/dummyDishes'

export default function DulceTragoPage () {
  return (
    <div className=" flex flex-col gap-5 px-4 py-8">
      <PromoCard />

      <DishesContainer dishesData={dishesData} />
    </div>
  )
}
