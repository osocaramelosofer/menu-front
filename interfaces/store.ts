import type { ICategory } from './product'
import type { IUser } from './user'

export interface IBanner {
  id?: number
  title: string
  subtitle: string
  description: string
  imageUrl: string
}

export interface IStore {
  id: number
  name: string
  description: string
  logoUrl: string
  address?: string
  igUrl?: string
  phone?: string
  themeColor?: string
  categories: ICategory[]
  users: IUser[]
  banner: IBanner
}
export interface IStoreForm {
  name: string
  description: string
  logoUrl: string
  address?: string | null
  igUrl?: string | null
  phone?: string | null
  banner?: IBanner
}
