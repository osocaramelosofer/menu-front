import DishCard, { type IDishCardProps } from './dish-card'

interface IDishesContainerProps {
  dishesData: IDishCardProps[]
}
export default function DishesContainer ({ dishesData }: IDishesContainerProps) {
  return (
    <section className="mx-2 flex flex-col gap-5">
      {dishesData.map((dish, index) => (
        <DishCard
          key={index}
          srcImage={dish.srcImage}
          alt={dish.alt}
          dishName={dish.dishName}
          description={dish.description}
        />
      ))}
    </section>
  )
}
