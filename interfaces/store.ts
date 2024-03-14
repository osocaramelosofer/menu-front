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
  address: string
  logo: string
  categories: ICategory[]
  users: IUser[]
  banner: IBanner
}
export interface IStoreForm {
  id?: number
  name?: string
  description?: string
  address?: string
  logo?: string
  categories?: ICategory[]
  users?: IUser[]
  banner?: IBanner
}
