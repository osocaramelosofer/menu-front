import React, { useEffect, useState } from 'react';
import { Button, Skeleton } from '@nextui-org/react';
import { Category } from './categories';
import { fetchCategories } from '../actions/serverActions';
import { useCategoriesStore } from '@/store/categories-store';

export default function CategoryList({
  onCategoryClick,
}: // currentCategory,
{
  // currentCategory: string | null;
  onCategoryClick: (categoryName: number) => void;
}) {
  const categories = useCategoriesStore((state) => state.categories);

  // const [categories, setCategories] = useState<Category[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setLoading(true);
  //   fetchCategories()
  //     .then((data) => {
  //       console.log(loading);
  //       setCategories(data);
  //       setLoading(false);
  //     })
  //     .catch((error) => console.error('Error al cargar las categorías', error));
  // }, []);

  // if (loading) {
  //   return (
  //     <>
  //       {Array(5)
  //         .fill(null)
  //         .map((_, index) => (
  //           <Skeleton key={index} className=" w-32 h-10" /> // Ajusta el tamaño del Skeleton según sea necesario
  //         ))}
  //     </>
  //   );
  // }

  return (
    <>
      {categories.map((category) => (
        <Button
          color={`${category.name === 'Todos' ? 'primary' : 'secondary'}`}
          key={category.id}
          className="min-w-fit flex text-sm"
          onClick={() => onCategoryClick(category.id)}
        >
          <p
            className={`${
              category.name === 'Todos' ? 'text-white' : 'text-primary'
            } capitalize`}
          >
            {category.name}
          </p>
        </Button>
      ))}
    </>
  );
}
