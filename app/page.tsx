import DishesContainer from "./components/dish-card/dishes-container";
import { dishesData } from "@/lib/dummyDishes";
import PromoCard from "./components/promo-card";

export default function Home() {
  return (
    <main className=" dark flex flex-col items-center max-w-7xl gap-4 px-4 py-8 mx-auto relative">
      <PromoCard />

      <DishesContainer dishesData={dishesData} />
    </main>
  );
}
