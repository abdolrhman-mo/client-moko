'use client'

import clsx from "clsx"
import Label from "./label"

export default function Select({
    defaultId = null,
    value = '',
    name = '',
    onChange,
    onBlur,
    required = false,
    options,
    className = '',
    isProductsSelect  = false,
    label = false,
    loading = false,
    error,
  }: {
    defaultId?: number | null
    value?: string | number
    name?: string
    onChange?: any
    onBlur?: any
    required?: boolean
    options: any[]
    className?: string
    isProductsSelect?: boolean
    label?: string | false
    loading?: boolean
    error?: string | false
}) {
    return (
        <div className={`my-2 ${className}`}>
            {label && (
                <Label>{label}</Label>
            )}
            {loading ?
              <p className="text-sm">Loading...</p> :
              <select
                className={
                  `text-gray-900 border-1 border-gray-200 text-sm rounded capitalize w-full`
                }
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                required={required}
              >
                {options.map((option, i) => 
                    <option
                        selected={(defaultId && i === defaultId - 1) || (defaultId === null && i === 0) ? true : false}
                        key={i}
                        className={clsx(
                            "text-gray-900 text-sm capitalize",
                        )}
                        value={isProductsSelect ? option.id : option}
                    >
                        {isProductsSelect ? `${option.name} (${option.id})` : option}
                    </option>
                )}
              </select>
            }
            {error && (
              <p className={"text-red-500 text-xs italic mt-2"}>{error}</p>
            )}
        </div>
    )
}