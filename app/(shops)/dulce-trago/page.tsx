import DishesContainer from '@/app/components/dish-card/dishes-container'
import PromoCard from '@/app/components/promo-card'

export default function DulceTragoPage () {
  const a = 'hi'
  return (
    <div className='flex flex-col gap-5 px-4 py-8'>
      <PromoCard />

      <DishesContainer />
    </div>
  )
}
