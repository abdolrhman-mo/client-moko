import { createAsyncThunk } from "@reduxjs/toolkit"
import { addToCartAPI, changeCartItemsQuantityAPI, fetchCartItemsAPI, removeItemFromCartAPI } from "@/app/lib/services/mockCartService"
import { isAuth } from "@/app/lib/services/auth/authService"
import { ProductType } from "@/app/lib/types/productTypes"
import { CartItemType } from "@/app/lib/types/cartTypes"
import { setActivePopup } from "../popup/popupSlice"
import { RootState } from "@/redux/store"
import productsData from "@/app/lib/data/products.json"

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async () => {
  const data = await fetchCartItemsAPI()
  return data
})

export const fetchBuyItNowItem = createAsyncThunk('cart/fetchBuyItNowItem', async ({
  buyItNowId,
  buyItNowSize,
}: {
  buyItNowId: number
  buyItNowSize: string
}) => {
  const product = productsData.find((item: any) =>
      Number(item.id) === Number(buyItNowId)
  )
  const buyItNowItem = {
      id: 0,
      product: product,
      quantity: 1,
      size: {
        size_text: buyItNowSize
      },
      totalOrderItemsPrice: 0,
  }
  
  return buyItNowItem
})

export const addItemToCart = createAsyncThunk('cart/addToCart', async (
    { product, size_text }: { product: any; size_text: string },
    { dispatch, getState }
) => {
    const productSizeQuantity = product.sizes.find((size: any) => size.size_text === size_text)?.quantity || 0
    
    const state = getState() as RootState
    const { cartItems } = state.cart
    if (cartItems.length === 0) dispatch(fetchCartItems())

    const existingItem = cartItems.find((item: any) => 
      item.product.id === product.id && item.size.size_text === size_text
    )

    let isChangeQuantity = false
    let cartItem : null | any = null

    if (productSizeQuantity > 0) {
      if (existingItem) {
        if (existingItem.quantity < productSizeQuantity) {
          cartItem = await addToCartAPI(product.id, size_text)
          isChangeQuantity = true
        }
      } else {
        cartItem = await addToCartAPI(product.id, size_text)
      }
    }
    
    dispatch(setActivePopup({ activePopup: 'navCart' }))

    return { cartItem, isChangeQuantity }
})

export const changeCartItemQuantity = createAsyncThunk('cart/changeCartItemQuantity', async (
    { cartItemId, newQuantity }: { cartItemId: number; newQuantity: number },
    { dispatch }
) => {
    if (newQuantity > 0) {
      await changeCartItemsQuantityAPI(cartItemId, newQuantity)
    } else {
      await removeItemFromCartAPI(cartItemId)
    }
    return { cartItemId, newQuantity }
})

export const removeItemFromCart = createAsyncThunk('cart/removeItemFromCart', async (
  { cartItemId }: { cartItemId: number },
  { dispatch }
) => {
  await removeItemFromCartAPI(cartItemId)
  return cartItemId
})

