import type { Category } from './product'
import { IUser } from './user'

export interface IStore {
  id: number
  name: string
  // address: string
  description: string
  // phone_number: string
  // email: string
  // logo: string
  // website: string
  // opening_time: any
  // closing_time: any
  // cuisine_type: string
  // max_capacity: number
  // facebook_url: string
  // instagram_url: string
  // twitter_url: string
  // latitude: string
  // longitude: string
  // status: string
  // average_rating: number
  // amenities: string
  categories: Category[]
  users: IUser[]
}
