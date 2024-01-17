export interface Category {
  id: number
  name: string
  description: string
}

export interface Tag {
  id: number
  name: string
  description: string
}

export interface AdditionalImage {
  id: number
  image: string
  caption: string
  uploaded_at: string
}

export interface Promotion {
  id: number
  title: string
  description: string
  discount_percentage: number
  start_date: string
  end_date: string
  active: boolean
}

export interface Variant {
  id: number
  variant_name: string
  variant_price: string
  variant_image: string
  variant_description: string
  variant_extra_features: string
  is_available: boolean
  price_same_as_parent: boolean
  product: number
}

export interface IProduct {
  id: number
  category: Category
  tags: Tag[]
  additional_images: AdditionalImage[]
  promotions: Promotion[]
  variants: Variant[]
  name: string
  main_image: string
  created_at: string
  updated_at: string
  description: string
  price: string
  variant_title: string
  is_available: boolean
  calories: number
  average_rating: number
  preparation_time: string
  portion_size: string
  ingredients: string
  origin: string
  sales_count: number
  visit_count: number
  store: number
}

export interface IApiResponse {
  count: number
  next: string
  previous: string | null
  results: IProduct[]
}
