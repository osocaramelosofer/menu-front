// {
//     "isShared": true,
//     "storeId": 2,
//     "userOrders": [
//       {
//         "username": "User123",
//         "cartPrice": 120.00,
//         "cartList": [
//           {
//             "productId": 7,
//             "quantity": 9
//           },
//           {
//             "productId": 8,
//             "quantity": 4
//           }
//         ]
//       },
//       {
//         "username": "User456",
//         "cartPrice": 76.00,
//         "cartList": [
//           {
//             "productId": 8,
//             "quantity": 2
//           }
//         ]
//       }
//     ]
//   }

import type { IProduct } from './product'

export interface ICartList {
  productId: number
  quantity: number
  product?: IProduct
}

export interface IUserOrders {
  id?: number
  username: string
  cartPrice: number
  cartList: ICartList[]
}

export interface IOrder {
  id?: number
  createdAt?: string
  paymentType: string
  isShared: boolean
  storeId: number
  userOrders: IUserOrders[]
}
