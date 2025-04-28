'use client'

import CartItem from "./cart-item/cart-item"
import { useAppDispatch } from "@/redux/store"
import { useEffect } from "react"
import { useAppSelector } from "@/redux/hooks"
import { fetchCartItems } from "@/redux/features/cart/cartThunk"
import { CartItemType } from "@/app/lib/types/cartTypes"

export default function CartItems() {
    const dispatch = useAppDispatch()

    const { cartItems, loading, error } = useAppSelector(state => state.cart)

    useEffect(() => {
        dispatch(fetchCartItems())
    }, [dispatch])

    return (
        <>
            {error && <p>Error: {error}</p>}
            {loading ? 
              <p>Loading cart...</p> :
              Array.isArray(cartItems) && cartItems.length === 0 ? (
                      <p>Your cart is currently empty.</p>
                  ) : (
                      <>
                          {Array.isArray(cartItems) && cartItems.slice().reverse().map((cartItem: CartItemType, i: number) => {
                              return <CartItem key={i} cartItem={cartItem} />
                          })}
                      </>
              )
            }
        </>
    )
}