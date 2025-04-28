'use client'

import clsx from "clsx"
import { motion, Variants } from "framer-motion"

import { useAppDispatch } from "@/redux/store"
import { useAppSelector } from "@/redux/hooks"
import { hidePopup } from "@/redux/features/popup/popupSlice"

export default function Overlay() {
    const dispatch = useAppDispatch()
    const isOverlayVisible = useAppSelector(state => state.popup.isOverlayVisible)

    const shadow: Variants = {
        show: {
            display: 'block',
            opacity: .5,
        },
        hide: {
            opacity: 0,
            transitionEnd: {
                display: 'none'
            }
        },
    }

    return (
        <motion.div
            initial={false}
            animate={isOverlayVisible ? 'show' : 'hide'}
            variants={shadow}
            className={clsx(
                // Layout & Sizing
                'fixed inset-y-0 z-40 h-screen w-full',
                // Backgrounds & Effects
                'bg-black opacity-50',
                'hidden',
            )}
            onClick={() => {
              dispatch(hidePopup())
            }}
        ></motion.div>
    )
}