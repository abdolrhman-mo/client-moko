import { OrderResponse, OrderType } from "@/app/lib/types/orderTypes"
import { createSlice } from "@reduxjs/toolkit"
import { fetchUserOrders, placeUserOrder } from "./orderUserThunk"
import { setActivePopup } from "../popup/popupSlice"

interface OrderState {
  items: OrderResponse[]
  status: 'idle' | 'loading' | 'failed'
  error: string | null
}

const initialState: OrderState = {
  items: [],
  status: 'idle',
  error: null,
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch User Orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = 'idle'
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch cart items'
      })

      // Prepare Order
      .addCase(placeUserOrder.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(placeUserOrder.fulfilled, (state) => {
        state.status = 'idle'
      })
      .addCase(placeUserOrder.rejected, (state) => {
        state.status = 'failed'
      })
  }
})

export const { } = orderSlice.actions
export default orderSlice.reducer
