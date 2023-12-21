import React, { Suspense } from 'react';
import Categories from '@/app/components/categories';
import DishesContainer from '@/app/components/dish-card/dishes-container';
import PromoCard from '@/app/components/promo-card';
import { dishesData } from '@/lib/dummyDishes';
import CategoryList from '@/app/components/category-list';
import Loading from './loading';

export default function DulceTragoPage() {
  return (
    <div className="flex flex-col w-full h-full px-4 py-8">
      <Suspense fallback={<Loading />}>
        <PromoCard />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Categories />
      </Suspense>

      <DishesContainer dishesData={dishesData} />
    </div>
  );
}
