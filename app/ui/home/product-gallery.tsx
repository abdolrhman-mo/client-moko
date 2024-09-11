import ProductsList from "@/app/ui/products/products-list"
import CustomLink from "../common/custom-link"
import { fetchProductsAPI } from "@/app/lib/services/products/productService"
import { ProductsListSkeleton } from "../skeletons/products-skeleton"
import Heading from "../common/heading"
import { ROUTES } from "@/app/lib/constants/routes"

export default async function ProductGallery({
    title,
    tag,
}: {
    title: string
    tag: string
}) {
  const products = await fetchProductsAPI()

    return (
        <div className="mt-20">
          <div className="w-3/5 mx-auto">
            <Heading level={2} className="text-center !uppercase text-[#5D2A1E]">{title}</Heading>
          </div>
          <ProductsList products={products} tag={tag} limit={100} />
        </div>
    )
}