import { isAuth } from "@/app/lib/services/auth"
import { changeCartItemsQuantityAPI } from "@/app/lib/services/cartService"
import { CartItemType } from "@/app/lib/types"
import { changeCartItemQuantity } from "@/lib/features/cart/cartSlice"
import { RootState } from "@/lib/store"
import clsx from "clsx"
import { useDispatch, useSelector } from "react-redux"

export default function ChangeQuantityButton({
    cartItem,
    type,
}: {
    cartItem: CartItemType
    type: 'increment' | 'decrement'
}) {
    const dispatch = useDispatch()

    const handleQuantityChange = (cartItemId: number, newQuantity: number) => {
        if (isAuth()) {
            changeCartItemsQuantityAPI(cartItemId, newQuantity)
        } else {
            const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]')
            const updatedCartItems = cartItems.map((item: any) => {
                if (item.product.id === cartItemId) {
                    return { ...item, quantity: newQuantity }
                }
                return item
            })
          
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
        }
        dispatch(changeCartItemQuantity({
            cartItemId: cartItemId, 
            newQuantity
        }))
    }

    return (
        <button
            onClick={() => {
                const newQuantity = type === 'increment' ? cartItem.quantity + 1 : cartItem.quantity - 1
                handleQuantityChange(cartItem.id, newQuantity)
            }}
            className={clsx(
                // Spacing
                'px-1.5 h-fit md:px-3 md:py-0.5',
                // Transition & Animations
                'transition-all duration-300 ease-in-out',
                'hover:bg-black hover:text-white',
            )}
        >
            {type === 'increment' ? '+' : '-'}
        </button>
    )
}