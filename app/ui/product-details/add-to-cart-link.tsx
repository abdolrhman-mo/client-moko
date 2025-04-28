'use client'

import Button from "../common/button"
import { useAppDispatch } from "@/redux/store"
import { addItemToCart } from "@/redux/features/cart/cartThunk"
import { ProductType } from "@/app/lib/types/productTypes"
import { setActivePopup } from "@/redux/features/popup/popupSlice"
import { useAppSelector } from "@/redux/hooks"
import { Spinner } from "../skeletons/skeletons"

export default function AddToCartLink({
  product,
  selectedSize,
  onClick,
  removeSelectedSize,
}: {
  product: ProductType
  selectedSize: string
  onClick: any
  removeSelectedSize: any
}) {
  const dispatch = useAppDispatch()
  const { addToCartLoading } = useAppSelector(state => state.cart)

  const handleAddToCart = async () => {
    onClick()
    if (selectedSize) {
      
      dispatch(addItemToCart({ product, size_text: selectedSize }))
      removeSelectedSize()
      // dispatch(setActivePopup({ activePopup: 'navCart' }))
    }
  }
  
  return (
    <Button
      disabled={addToCartLoading} 
      theme="light"
      onClick={handleAddToCart}
      className="text-center"
    >
      {addToCartLoading ?
        <div className="w-fit mx-auto">
          <Spinner />
        </div> :
        'add to cart'
      }
    </Button>
  )
}