import { ProductType, SizeType } from "./productTypes"

export interface CartItemType {
  id: number
  product: ProductType
  quantity: number
  size: SizeType
  totalOrderItemsPrice: number
}