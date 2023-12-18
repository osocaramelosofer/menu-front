'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button, Chip, ScrollShadow } from '@nextui-org/react';

export default function Categories() {
  const categories = [
    // {
    //   label: 'Todos',
    //   route: 'all',
    //   description:
    //     '¡Una variedad de golosinas dulces para satisfacer tu antojo!',
    // },
    {
      label: 'Dulces',
      route: '',
      description:
        '¡Una variedad de golosinas dulces para satisfacer tu antojo!',
    },
    {
      label: 'Tortas',
      description:
        '¡Deliciosas tortas perfectas para cualquier ocasión especial!',
    },
    {
      label: 'Sándwich',
      description:
        '¡Sabrosos sándwiches preparados con ingredientes frescos y deliciosos!',
    },
    {
      label: 'Tacos',
      description: '¡Tacos auténticos con sabores únicos y llenos de sabor!',
    },
    {
      label: 'Snacks',
      description:
        '¡Una selección de bocadillos deliciosos y rápidos para satisfacer tu hambre!',
    },
    {
      label: 'Postres',
      description:
        '¡Exquisitos postres que te harán salivar y endulzarán tu día!',
    },
    {
      label: 'Bebidas',
      description:
        '¡Refrescantes y variadas bebidas para saciar tu sed y disfrutar al máximo!',
    },
    {
      label: 'Cafetería',
      description: '¡Un buen café para relajarte!',
    },
    {
      label: 'Otros',
      description: '',
    },
    {
      label: 'Otros2',
      description: '',
    },
    {
      label: 'Otros3',
      description: '',
    },
    {
      label: 'Otros4',
      description: '',
    },
    {
      label: 'Otros5',
      description: '',
    },
  ];
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/dulce-trago';
  const router = useRouter();

  const handleCategoryClick = (categoryName: string) => {
    if (categoryName === 'Todos') {
      // Si se selecciona "Todos", navegar a la página principal sin parámetros
      router.push('/dulce-trago');
    } else {
      // Para otras categorías, navegar con el parámetro de categoría
      router.push(`/dulce-trago?category=${categoryName}`);
    }
  };

  const handleRemoveCategory = () => {
    router.push('/dulce-trago');
  };

  if (!isMainPage) {
    return null;
  }

  return (
    <section className="sticky top-16 z-10 bg-background flex flex-col shadow-none gap-4 w-full pt-5">
      <div className="flex justify-between items-end font-bold text-base">
        <h3>Categorías</h3>
        {category && (
          <Chip
            color="primary"
            onClose={handleRemoveCategory}
            variant="flat"
            size="sm"
          >
            {category}
          </Chip>
        )}
      </div>
      <ScrollShadow
        orientation="horizontal"
        className="flex overflow-x-auto gap-4 pb-5"
      >
        {categories.map((item) => (
          <Button
            color={`${item.label === category ? 'primary' : 'secondary'}`}
            key={item.label}
            className="px-12 text-sm font-medium"
            onClick={() => handleCategoryClick(item.label)}
          >
            <p
              className={`${
                item.label === category ? 'text-white' : 'text-primary'
              }`}
            >
              {item.label}
            </p>
          </Button>
        ))}
      </ScrollShadow>
    </section>
  );
}
