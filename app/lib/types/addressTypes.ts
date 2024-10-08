export interface AddressType {
  country: string
  city: string
  address_text: string
  is_default: boolean
}

export interface AddressRequest {
  country: string
  governorate: string
  city: string
  address_text: string
  is_default: boolean
}

export interface AddressResponse {
  id: number
  user_id: number
  country: string
  governorate: string
  city: string
  address_text: string
  is_default: boolean
}
