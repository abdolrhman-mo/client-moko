//          AUTH
// product response & product request both are the same
//          NOT AUTH
// product response
// cartItem local requests and responses


export interface TagType {
  id: number
  name: string
}

export interface SizeType {
  id?: number
  product?: number
  size_text: string
  quantity?: number
}

export interface ProductType {
  id: number
  name: string
  price: number
  image: string
  description: string
  tags: TagType[]
  sizes: SizeType[]
}