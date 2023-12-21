'use server';

export async function fetchCategories() {
  // Agregar un retraso de 2 segundos
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch(
    'https://menu-app-back-2b09f4029d5d.herokuapp.com/api/v1/products/categories'
  );
  if (!response.ok) {
    throw new Error('Error al cargar las categorías');
  }
  return response.json();
}
