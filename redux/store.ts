import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import searchBarReducer from '@/redux/features/nav/searchBarSlice'
import cartReducer from '@/redux/features/cart/cartSlice'
import productsReducer from '@/redux/features/products/productsSlice'
import productReducer from '@/redux/features/products/productSlice'
import addressReducer from '@/redux/features/address/addressSlice'
import orderReducer from '@/redux/features/orders/orderUserSlice'
import orderAdminReducer from '@/redux/features/orders/orderAdminSlice'
import checkoutReducer from '@/redux/features/checkout/checkoutSlice'
import authReducer from '@/redux/features/auth/authSlice'
import popupReducer from '@/redux/features/popup/popupSlice'
import shippingRateReducer from '@/redux/features/dashboard/shippingRate/shippingRateSlice'

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const makeStore = () => {
    return configureStore({
        reducer: {
            searchBar: searchBarReducer,
            cart: cartReducer,
            products: productsReducer,
            product: productReducer,
            address: addressReducer,
            order: orderReducer,
            orderAdmin: orderAdminReducer,
            checkout: checkoutReducer,
            auth: authReducer,
            popup: popupReducer,
            shippingRate: shippingRateReducer,
        },
        devTools: process.env.NODE_ENV !== 'production',
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']