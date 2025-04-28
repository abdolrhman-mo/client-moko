import { createAsyncThunk } from "@reduxjs/toolkit"
import { addToCartAPI, changeCartItemsQuantityAPI, fetchCartItemsAPI, removeItemFromCartAPI } from "@/app/lib/services/cartService"
import { isAuth } from "@/app/lib/services/auth/authService"
import { ProductType } from "@/app/lib/types/productTypes"
import { CartItemType } from "@/app/lib/types/cartTypes"
import { fetchProductsAPI } from "@/app/lib/services/products/productService"
import { setActivePopup } from "../popup/popupSlice"
import { RootState } from "@/redux/store"

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async () => {
    let data
    if (isAuth()) {
      data = await fetchCartItemsAPI()
    } else {
      data = JSON.parse(localStorage.getItem('cartItems') || '[]')
    }
    return data
})

export const fetchBuyItNowItem = createAsyncThunk('cart/fetchBuyItNowItem', async ({
  buyItNowId,
  buyItNowSize,
}: {
  buyItNowId: number
  buyItNowSize: string
}) => {
  const products = await fetchProductsAPI()
  const product = products.find((item: ProductType) =>
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
    { product, size_text }: { product: ProductType; size_text: string },
    { dispatch, getState }
) => {
    const productSizeQuantity = product.sizes.find(size => size.size_text === size_text)?.quantity || 0

    // console.log('CART THUNK')
    // console.log('productSizeQuantity', productSizeQuantity)
    
    let isAuthVar: boolean = isAuth()

    const state = getState() as RootState

    const { cartItems } = state.cart
    if (cartItems.length === 0) dispatch(fetchCartItems())

    // console.log('state cartItems', cartItems)

    // console.log('cartItems[0].size.size_text', cartItems[0].size.size_text)

    // check to see if product w selected size is in the cart
    const existingItem = cartItems.find((item: CartItemType) => 
      item.product.id === product.id && item.size.size_text === size_text
    )

    let isChangeQuantity = false
    let cartItem : null | CartItemType = null

    if (productSizeQuantity > 0) {
      if (existingItem) { // if item in cart
          
        // console.log('item found in cartItems')
          
        // quantity of cartItem < product quantity
        if (existingItem.quantity < productSizeQuantity) {
          // console.log('existing')
          if (isAuthVar) {
            cartItem = await addToCartAPI(product.id, size_text)
            // console.log('thunk: added to cart', cartItem)
          } else {
            existingItem.quantity += 1
            // existingItem.totalOrderItemsPrice += Number(existingItem.product.price)
            localStorage.setItem('cartItems', JSON.stringify(cartItems))
            cartItem = existingItem
          }
          isChangeQuantity = true
        } else {
          // console.log('no enough items in the cart')
        }
      }
      // if item new to cart 
      else {
          
        // console.log('item new in cartItems')

        if (isAuthVar) {
          cartItem = await addToCartAPI(product.id, size_text)
        } else {
          let id = 0
          if (cartItems.length > 0) id = cartItems[cartItems.length - 1].id + 1

          cartItem = {
              id: id,
              quantity: 1,
              product: product,
              size: {
                size_text: size_text,
              },
              // totalOrderItemsPrice: Number(product.price)
              totalOrderItemsPrice: 0
          }
          cartItems.push(cartItem)
          localStorage.setItem('cartItems', JSON.stringify(cartItems))
        }
      }
    }
    
    dispatch(setActivePopup({ activePopup: 'navCart' }))

    return { cartItem, isChangeQuantity }
})

export const changeCartItemQuantity = createAsyncThunk('cart/changeCartItemQuantity', async (
    { cartItemId, newQuantity }: { cartItemId: number; newQuantity: number },
    { dispatch }
) => {
    let cartItem
    if (isAuth()) {
        if (newQuantity > 0) {
          await changeCartItemsQuantityAPI(cartItemId, newQuantity)
        } else {
            await removeItemFromCartAPI(cartItemId)
        }
    } else {
        let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]')
        const updatedCartItem: CartItemType = cartItems.find((cartItem: CartItemType) => 
            cartItem.id === cartItemId
        )
        
        if (newQuantity > 0) {
            updatedCartItem.quantity = newQuantity
            localStorage.setItem('cartItems', JSON.stringify(cartItems))    
        } else {
            // Delete this cart item
            updatedCartItem.quantity = 0
            cartItems = cartItems.filter((cartItem: CartItemType) =>
                cartItem.id !== cartItemId
            )
            localStorage.setItem('cartItems', JSON.stringify(cartItems))
        }
    }

    // dispatch(fetchCartItems())
    return { cartItemId, newQuantity }
})

export const removeItemFromCart = createAsyncThunk('cart/removeItemFromCart', async (
  { cartItemId }: { cartItemId: number },
  { dispatch }
) => {
  if (isAuth()) {
    await removeItemFromCartAPI(cartItemId)
  } else {
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]')
      const updatedCartItems = cartItems.filter((item: any) => 
          item.id !== cartItemId
      )
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
  }

  // dispatch(fetchCartItems())
  return cartItemId
})

