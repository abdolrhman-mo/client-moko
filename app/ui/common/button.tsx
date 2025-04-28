'use client'

import clsx from "clsx"

export default function Button({
  theme = 'dark',
  onClick,
  disabled = false,
  children,
  className,
}: {
  theme?: 'light' | 'dark' | 'muted' | 'success' | 'warning'
  onClick?: any
  disabled?: boolean
  children: React.ReactNode
  className?: string
}) {
    return (
        <button 
          type="button"
          onClick={onClick}
          disabled={disabled} 
          className={clsx(
            'rounded w-full block py-2 px-8 capitalize text-center disabled:opacity-75',
            {
                'text-black bg-white border' : theme === 'light',
                'text-white bg-black' : theme === 'dark',
                'text-white bg-[#A2A2A2]' : theme === 'muted',
                'text-white bg-[#50ABFF]' : theme === 'success',
                'text-white bg-[#FF6F61]' : theme === 'warning',
            }
        ) + ` ${className}`}>
            {children}
        </button>
    )
}