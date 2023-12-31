export interface Category {
  id: number | null
  name: string
  description: string
}

export interface Tag {
  id: number
  name: string
  description: string
}
export interface IProduct {
  id: number
  name: string
  main_image: string | null
  created_at: string
  updated_at: string
  description: string
  category: Category
  tags: Tag[] // Asumiendo que los tags son strings. Ajusta según sea necesario.
  additional_images: string[] // Asumiendo que son URLs en string. Ajusta según sea necesario.
  promotions: any[] // Reemplaza 'any' con un tipo más específico si conoces la estructura de las promociones.
  price: string
}
