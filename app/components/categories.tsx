'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button, Chip, ScrollShadow, Skeleton } from '@nextui-org/react';
import { fetchCategories } from '../actions/serverActions';
import CategoryList from './category-list';
import { getCategories } from '@/lib/actions';
import { useCategoriesStore } from '@/store/categories-store';

export interface Category {
  id: number;
  name: string;
  description: string;
}

export default function Categories() {
  const { loading, getCategoriesList, getMenuItems } = useCategoriesStore();
  // const getCategoriesList = useCategoriesStore(
  //   (state) => state.getCategoriesList
  // );
  // const [categories, setCategories] = useState<Category[]>([]);
  // const params = useSearchParams();
  // const category = params?.get('category');
  // const pathname = usePathname();
  // const isMainPage = pathname === '/dulce-trago';
  const router = useRouter();

  // useEffect(() => {
  //   getCategories()
  //     .then(setCategories)
  //     .catch((error) => console.error('Error al cargar las categorías', error));
  // }, []);

  const handleCategoryClick = (categoryId: number) => {
    getMenuItems(`?category=${categoryId}`);
    // if (categoryName === 'Todos') {
    //   // Si se selecciona "Todos", navegar a la página principal sin parámetros
    //   router.push('/dulce-trago');
    // } else {
    //   // Para otras categorías, navegar con el parámetro de categoría
    //   router.push(`/dulce-trago?category=${categoryName}`);
    // }
  };

  const handleRemoveCategory = () => {
    router.push('/dulce-trago');
  };
  useEffect(() => {
    getCategoriesList();
  }, []);
  // if (!isMainPage) {
  //   return null;
  // }

  return (
    <section className="sticky top-16 z-10 bg-background flex flex-col shadow-none gap-4 w-full pt-5">
      <div className="flex justify-between items-end font-bold text-base">
        <h3>Categorías</h3>
        {/* {category && (
          <Chip
            color="primary"
            onClose={handleRemoveCategory}
            variant="flat"
            size="sm"
          >
            {category}
          </Chip>
        )} */}
      </div>

      <ScrollShadow
        orientation="horizontal"
        className="flex overflow-x-auto gap-4 pb-5"
      >
        {loading ? (
          <>
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} className=" w-32 h-10" /> // Ajusta el tamaño del Skeleton según sea necesario
              ))}
          </>
        ) : (
          <CategoryList
            onCategoryClick={handleCategoryClick}
            // currentCategory={category}
          />
        )}
      </ScrollShadow>
      {/* <ScrollShadow
        orientation="horizontal"
        className="flex overflow-x-auto gap-4 pb-5"
      >
        {categories.map((item) => (
          <Skeleton
            key={item.name}
            className=" min-w-fit rounded-lg"
            isLoaded={categories.length > 0}
          >
            <Button
              color={`${item.name === category ? 'primary' : 'secondary'}`}
              key={item.name}
              className="min-w-fit flex text-sm"
              onClick={() => handleCategoryClick(item.name)}
            >
              <p
                className={`${
                  item.name === category ? 'text-white' : 'text-primary'
                }`}
              >
                {item.name}
              </p>
            </Button>
          </Skeleton>
        ))}
      </ScrollShadow> */}
    </section>
  );
}
