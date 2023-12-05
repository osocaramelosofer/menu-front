import { Button } from '@nextui-org/button'
import DishesContainer from './components/dish-card/dishes-container'
import { dishesData } from '@/lib/dummyDishes'

export default function Home () {
  return (
    <>
      <main className="flex  flex-col items-center justify-between p-24">
        <Button color="primary">Click me</Button>
      </main>

      <DishesContainer dishesData={dishesData} />
    </>

  )
}
