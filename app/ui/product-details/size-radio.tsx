import clsx from "clsx"
import { useEffect, useState } from "react"

interface ProductSize {
    size_text: string
    quantity: number
}

interface Product {
    id: number
    sizes: ProductSize[]
}

export default function SizeRadio({
    onChange,
    selectedSize,
    addToCartClicked,
    product,
}: {
    onChange?: any
    selectedSize: string
    addToCartClicked: boolean
    product: Product
}) {
    const sizes = ['xs', 's', 'm', 'l', 'xl']
    const [availableSizes, setAvailableSizes] = useState<Set<string>>(new Set())
    
    useEffect(() => {
        if (product) {
            const sizesAvailable = new Set<string>(
                product.sizes
                    .filter((productSize) => productSize.quantity > 0)
                    .map((productSize) => productSize.size_text)
            )
            setAvailableSizes(sizesAvailable)
        }
    }, [product])

    return (
        <div className={clsx(
                // Layout & Sizing
                'w-fit',
                // Flex
                'flex flex-wrap justify-center',
                // Spacing
                'mx-auto md:mx-0',
            )}
        >
            {sizes.map((size) => {
                const isSoldOut = !availableSizes.has(size)

                return (
                    <label key={size} htmlFor={size} className="capitalize cursor-pointer m-1">
                        <input 
                            className={clsx(
                                'hidden peer',
                            )} 
                            type="radio" 
                            id={size} 
                            name="sizes" 
                            disabled={isSoldOut}
                            checked={selectedSize === size}
                            onChange={onChange}
                            value={size}
                        />
                        <p
                            className={clsx(
                                // Spacing
                                'px-4 py-1',
                                // Border
                                'border-2 peer-checked:border-black',
                                // Typo
                                'uppercase',
                                // Conditional styling
                                {
                                    'text-gray-400': isSoldOut,
                                    'bg-gray-200': isSoldOut,
                                    'bg-white': !isSoldOut,
                                }
                            )}
                            >
                            {size}
                        </p>
                    </label>
                )}
            )}
        </div>
    )
}