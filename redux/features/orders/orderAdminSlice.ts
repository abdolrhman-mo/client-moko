import { OrderResponse } from "@/app/lib/types/orderTypes"
import { createSlice } from "@reduxjs/toolkit"
import { fetchUserOrders } from "./orderUserThunk"
import { changeOrderStatus, fetchAllOrders, fetchOrderInDetailPage } from "./orderAdminThunk"

interface OrderAdminState {
  orders: OrderResponse[]
  loading: boolean
  error: string | null
  orderInDetailPage: OrderResponse | null
}

const initialState: OrderAdminState = {
  orders: [],
  loading: false,
  error: null,
  orderInDetailPage: null
}

const orderAdminSlice = createSlice({
  name: 'orderAdmin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload
        state.loading = false
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch cart items'
      })
      .addCase(changeOrderStatus.fulfilled, (state, action) => {
        // const order = state.items.find(item =>
        //   Number(item.id) === Number(action.payload.orderId)
        // )
        
        // if (order) {
        //   console.log(`changing order ${action.payload.orderId} status from ${order.status} to ${action.payload.newState}`)
        //   order.status = action.payload.newState
        // }
        // console.log('orderrrrrr', order)
      })
      .addCase(fetchOrderInDetailPage.fulfilled, (state, action) => {
        state.orderInDetailPage = action.payload
      })
  }
})

export const { } = orderAdminSlice.actions
export default orderAdminSlice.reducer
