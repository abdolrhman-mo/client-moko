'use client'

import clsx from 'clsx'
import Product from '@/app/ui/products/product-card'
import CustomLink from '@/app/ui/common/custom-link'
import { hasTag } from '@/app/lib/utils'
import { ROUTES } from '@/app/lib/constants/routes'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useAppSelector } from '@/redux/hooks'
import { ProductsListSkeleton } from '../skeletons/products-skeleton'

export default function ProductsList({
    // products = [],
    className = '',
    productStyles = '',
    tag = 'all',
    limit = 0,
    search = false,
    navSearch = false,
    query,
    exceptProduct,
}: {
  // products?: any[]
  className?: string
  productStyles?: string
  tag?: string
  limit?: number
  search?: boolean
  navSearch?: boolean
  query?: string
  exceptProduct?: number
}) {
    const { products, loading, error } = useAppSelector(state => state.products)

    // console.log('component products-list: products', products)

    // Search
    let searchedProducts: any = []
    if (search) {
      if (query) {
          products.map((product: any) => {
              if (product.name.toLowerCase().search(query) != -1) {
                  searchedProducts.push(product)
              }
          })
      }
    } else if (exceptProduct) {
      searchedProducts = products.filter(product =>
        product.id !== exceptProduct
      )
    } else {
      searchedProducts = products
    }

    // Limt Number & Tags
    if (limit === 0) {
        limit = products.length
    }

    let filteredProducts: any = []
    let i = 0
    searchedProducts.map((product: any) => {
        if (hasTag(product.tags, tag) || tag === 'all') {
        // if (product.tag === tag || tag === 'all') {
            if (i < limit) {
                filteredProducts.push(product)
                i++
            }
        }
    })
    i = 0

    // ANIMATIONS

    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    const productListVariants = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2, // Delay between product animations
        }
      }
    }

    // if (loading) return <ProductsListSkeleton count={2} />

    return (
        <>
            <motion.div
              ref={ref}
              variants={productListVariants}
              initial={'hidden'}
              animate={isInView ? 'show' : 'hidden'}
              className={clsx(
                  // Sizing
                  'w-1/2',
                  // Spacing
                  'mx-auto',
                  // Grid
                  'grid grid-cols-1 md:grid-cols-2 md:gap-x-12 gap-y-8',
                  // Effects
                  'opacity-100',
              ) + ` ${className}`}
            >
              {loading ?
                <ProductsListSkeleton count={2} /> :
                filteredProducts.map((product: any) =>
                  <Product
                    key={product.id}
                    product={product}
                    className={productStyles}
                    navSearch={navSearch}
                  />
                )
              }
            </motion.div>
            
            {/* If it's a searching product list */}
            {
              navSearch ? (
                <div className="text-center pt-28">
                  {
                    filteredProducts.length > 0 ? (
                      <CustomLink 
                        navSearch={true} 
                        href={`${ROUTES.SEARCH}/?query=${query}`}
                        className='max-w-fit block' 
                      >
                        view more
                      </CustomLink>
                    ) : (
                      <p>Try searching for something.</p>
                    )
                  }
                </div>
              ) : <></>
            }
        </>
    )
}