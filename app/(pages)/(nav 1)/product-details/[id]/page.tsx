'use client'

import Image from "next/image"
import ProductsList from "@/app/ui/products/products-list"
import SizeRadio from "@/app/ui/product-details/size-radio"
import AddToCartLink from "@/app/ui/product-details/add-to-cart-link"
import CustomLink from "@/app/ui/common/custom-link"
import Button from "@/app/ui/common/button"
import Heading from "@/app/ui/common/heading"
import { useState } from "react"
import { abdoRedirect } from "@/app/lib/actions"
import { ROUTES } from "@/app/lib/constants/routes"
import productsData from "@/app/lib/data/products.json"

export default function Page({
  params,
  searchParams,
}: {
  params: {id: number}
  searchParams?: {
    query?: string
    page?: string
  }
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const productId = params.id
  
  const [addToCartClicked, setAddToCartClicked] = useState(false)
  const [selectedSize, setSelectedSize] = useState('')
  const [message, setMessage] = useState('')
  
  // Find the product from the JSON data
  const product = productsData.find((p: any) => p.id === Number(productId))

  const handleSizeChange = (e: any) => {
    setSelectedSize(e.target.value)
  }

  if (!product) return null

  return (
    <>
      <div className="w-5/6 mx-auto pt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex justify-center w-full">
              <Image
                  className="max-w-96"
                  src={product.image}
                  alt={product.name}
                  width={500}
                  height={500}
              />
          </div>
          <div className="space-y-4">
              <Heading level={2}>{product.name}</Heading>
              <div className="flex space-x-3">
                  <span
                    className='text-red-400 line-through'
                  >
                    750.00 EGP
                  </span>
                  <p>{product.price} EGP</p>
              </div>
              <hr />
              <div className="text-center md:text-left">
                  <p className="uppercase">size</p>
                  <SizeRadio 
                      onChange={handleSizeChange} 
                      selectedSize={selectedSize}
                      addToCartClicked={addToCartClicked}
                      product={product}
                  />
              </div>
              <p className="text-red-500">{message}</p>
              <AddToCartLink 
                  product={product} 
                  selectedSize={selectedSize}
                  removeSelectedSize={() => setSelectedSize('')}
                  onClick={() => {
                      setAddToCartClicked(!addToCartClicked)
                      if (!selectedSize) {
                          setMessage('You must choose a size!')
                      } else {
                          setMessage('')
                      }
                  }}
              />
              <Button
                  onClick={() => {
                      if (!selectedSize) {
                        setMessage('You must choose a size!')
                      } else {
                        abdoRedirect(ROUTES.BUY_IT_NOW(params.id, selectedSize))
                      }
                  }}
              >
                  buy it now
              </Button>
          </div>
      </div>
      <div className="col-span-2 pt-24 space-y-16">
          <div className="text-center">
              <Heading level={2}>you may also like</Heading>
          </div>
          <ProductsList limit={2} tag='new' exceptProduct={product.id} />
          <div className="w-fit mx-auto">
              <CustomLink className="text-xs" href={ROUTES.HOME}>continue shopping</CustomLink>
          </div>
      </div>
    </>
  )
}