import { createSlice } from '@reduxjs/toolkit'
import { addItemToCart, changeCartItemQuantity, fetchBuyItNowItem, fetchCartItems, removeItemFromCart } from './cartThunk'
import { CartItemType } from '@/app/lib/types/cartTypes'
import { auth, logout } from '../auth/authThunk'

interface CartState {
  cartItems: CartItemType[]
  loading: boolean
  error: any
  totalPrice: number

  addToCartLoading: boolean
  cartItemActionLoading: boolean

  buyItNowItem: CartItemType | null
}

const initialState: CartState = {
  cartItems: [],
  loading: false,
  error: null,
  totalPrice: 0,

  addToCartLoading: false,
  cartItemActionLoading: false,
  
  buyItNowItem: null,
}

const updateCartItem = (state: CartState, cartItem: CartItemType, newQuantity: number) => {
  const itemIndex = state.cartItems.findIndex(item => item.id === cartItem.id)
  
  // if item exists
  if (itemIndex >= 0) {
    if (newQuantity < 1) { // remove from items
      state.cartItems.splice(itemIndex, 1)
    } else {
      if (newQuantity > state.cartItems[itemIndex].quantity) {
        state.totalPrice += Number(state.cartItems[itemIndex].product.price)
      } else {
        state.totalPrice -=  Number(state.cartItems[itemIndex].product.price)
      }
      state.cartItems[itemIndex].quantity = newQuantity
    }
  }
  // else if item doesn't exist
  else {
    // create item
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch Cart Items
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.cartItems = action.payload
        // total price
        let total: number = 0
        action.payload.map((cartItem: CartItemType) => {
          total += Number(cartItem.product.price) * Number(cartItem.quantity)
        })
        state.totalPrice = total
        state.loading = false
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch cart items'
      })

      // Create Cart Item
      .addCase(addItemToCart.pending, (state) => {
        state.addToCartLoading = true
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        const { cartItem, isChangeQuantity } = action.payload
        const existingItem = state.cartItems.find(item => 
          // item.product.id === cartItem?.product.id && item.size === cartItem.size
          item.id === cartItem?.id
        )

        console.log('cartSlice cartItem', cartItem)
        console.log('existingItem', existingItem)
        
        console.log('isChangeQuantity', isChangeQuantity)

        // item is new in cart(!changeQuantity) => push it to cart items
        if (!isChangeQuantity) {
          if (!existingItem && cartItem) {
            state.cartItems.push(cartItem)
            state.totalPrice += Number(cartItem.product.price)
          }
        }
        // item is in cart => increase quantity by 1
        else if (cartItem) {
          const cartItemId = cartItem.id
          const newQuantity = cartItem.quantity
          
          console.log('cart slice: newQuantity', newQuantity)
          
          const itemIndex = state.cartItems.findIndex(item => item.id === cartItemId)
          if (itemIndex >= 0) {
            if (newQuantity >= 1)  {
              state.cartItems[itemIndex].quantity = newQuantity
              console.log('cart slice: state.cartItems[itemIndex].quantity', state.cartItems[itemIndex].quantity)
              state.totalPrice += Number(state.cartItems[itemIndex].product.price)
            }
          }
        }
        state.addToCartLoading = false
      })
      .addCase(addItemToCart.rejected, (state) => {
        state.addToCartLoading = false
      })

      // Change Quantity
      .addCase(changeCartItemQuantity.pending, (state) => {
        state.cartItemActionLoading = true
      })
      .addCase(changeCartItemQuantity.fulfilled, (state, action) => {
        const { cartItemId, newQuantity } = action.payload
        const cartItem = state.cartItems.find(item => item.id === cartItemId)
        
        cartItem ? 
        updateCartItem(state, cartItem, newQuantity) : 
        console.log(`cart item doesn't exist`)
        
        state.cartItemActionLoading = false
      })
      .addCase(changeCartItemQuantity.rejected, (state, action) => {
        state.cartItemActionLoading = false
        state.error = action.error.message || ''
      })

      // Delete Cart Item
      .addCase(removeItemFromCart.pending, (state) => {
        state.cartItemActionLoading = true
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        // update total price before removing item
        const cartItem = state.cartItems.find(item =>
          item.id = action.payload
        )
        state.totalPrice -= Number(cartItem?.product.price) * Number(cartItem?.quantity)
        
        // remove item
        state.cartItems = state.cartItems.filter(
          item => item.id !== action.payload
        )
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.cartItemActionLoading = false
        state.error = action.error.message || ''
      })

      // Buy it now item
      .addCase(fetchBuyItNowItem.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchBuyItNowItem.fulfilled, (state, action) => {
        state.buyItNowItem = action.payload
        state.loading = false
      })
      .addCase(fetchBuyItNowItem.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || ''
      })

      // Syncing items with local storage cart items after login & signup
      .addCase(auth.pending, (state) => {
        state.loading = false
        state.error = null
      })
      .addCase(auth.fulfilled, (state, action) => {
        const { cartItems, error } = action.payload
        if (cartItems) {
          state.error = null
          state.cartItems = cartItems
          let total: number = 0
          cartItems.map((cartItem: CartItemType) => {
            total += Number(cartItem.product.price * cartItem.quantity)
          })
          state.totalPrice = total
          state.loading = false
        } else {
          state.loading = false
          state.error = error
        }
      })
      .addCase(auth.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch cart items'
      })

      // Clear cart after logout
      .addCase(logout.fulfilled, (state) => {
        state.cartItems = []
      })
  }
})

export const { } = cartSlice.actions
export default cartSlice.reducer
