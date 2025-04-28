'use client'

import ProductsList from "@/app/ui/products/products-list"
import Heading from "../common/heading"

export default function ProductGallery({
  title,
  tag,
}: {
  title: string
  tag: string
}) {
  return (
    <div className="mt-20">
      <div className="w-3/5 mx-auto">
        <Heading level={2} className="text-center !uppercase text-[#5D2A1E]">{title}</Heading>
      </div>
      <ProductsList tag={tag} limit={100} />
    </div>
  )
}