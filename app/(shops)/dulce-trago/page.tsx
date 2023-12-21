import Categories from '@/app/components/categories';
import DishesContainer from '@/app/components/dish-card/dishes-container';
import PromoCard from '@/app/components/promo-card';

export default function DulceTragoPage() {
  return (
    <div className="flex flex-col w-full h-full px-4 py-8">
      <PromoCard />

      <Categories />

      <DishesContainer />
    </div>
  );
}
