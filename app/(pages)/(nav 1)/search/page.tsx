'use client'

import Heading from "@/app/ui/common/heading"
import ProductsList from "@/app/ui/products/products-list"
import Search from "@/app/ui/search/search"
import { useEffect, useState } from "react"
import productsData from '@/app/lib/data/products.json'

export default function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string
        page?: string
    }
}) {
    const query = searchParams?.query || ''
    const currentPage = Number(searchParams?.page) || 1
    const [products, setProducts] = useState<any>(null)

    useEffect(() => {
      const getData = async () => {
        const data = productsData
        if (data) {
          setProducts(data)
        }
      }
      getData()
    })

    return (
        <>
            <div className="w-5/6 mx-auto">
                <Heading level={2} className="mx-auto w-fit">Search Our Store</Heading>

                <Search placeholder="Search our store" />

                <ProductsList
                    className="py-12"
                    limit={8}
                    search={true}
                    query={query}
                />
            </div>
        </>
    )
}