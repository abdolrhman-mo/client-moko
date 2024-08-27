import { poppins } from '@/app/ui/fonts'
import Hero from '@/app/ui/home/hero'
import ProductGallery from '@/app/ui/home/product-gallery'
import ShopByCategory from '@/app/ui/home/shop-by-category'
import { Suspense } from 'react'

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: string
  },
}) {
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1

  // const products = await fetchProductsAPI()

  return (
    <main className={`${poppins.className} antialiased z-10`}>
      {/* Nav Search Results */}
      {/* <NavSearchResults products={products} query={query} currentPage={currentPage} /> */}

      <div className="z-10">
        <Hero />

        <ProductGallery title='latest drop' tag='latest' />
        <ProductGallery title='tees' tag='tee' />
        <ProductGallery title='pants' tag='pants' />
        <ProductGallery title='shorts' tag='shorts' />
        {/* <ProductGallery title='shorts' tag='all' /> */}

        <ShopByCategory />
      </div>
    </main>
  );
}