'use client'

import { poppins } from '@/app/ui/fonts'
import Hero from '@/app/ui/home/hero'
import ProductGallery from '@/app/ui/home/product-gallery'
import ShopByCategory from '@/app/ui/home/shop-by-category'
import { fetchProducts } from '@/redux/features/products/productsThunk'
import { useAppSelector } from '@/redux/hooks'
import { useAppDispatch } from '@/redux/store'
import { useEffect } from 'react'

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: string
  },
}) {
  const dispatch = useAppDispatch()

  // const query = searchParams?.query || ''
  // const currentPage = Number(searchParams?.page) || 1

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <main className={`${poppins.className} antialiased z-10`}>
      {/* Nav Search Results */}
      {/* <NavSearchResults products={products} query={query} currentPage={currentPage} /> */}

      <div className="z-10">
        <Hero />

        <div id="new-collection"></div>
        <ProductGallery title='new collection' tag='new' />
        <ProductGallery title='jerseys collection' tag='jersey' />
      </div>
    </main>
  );
}