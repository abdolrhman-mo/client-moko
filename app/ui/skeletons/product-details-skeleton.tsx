import { Shimmer, ShimmerList } from "./skeletons"

export default function ProductDetailsSkeleton() {
  return (
    <>
      <div className="w-5/6 mx-auto pt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex justify-center w-full">
              <Shimmer height="h-[480px]" width="w-96" />
          </div>
          <div className="space-y-4">
              {/* <div className="h-8 bg-gray-300 rounded w-3/4 my-12"></div> */}
              <Shimmer elem="h2" />
              <div className="flex space-x-3">
                <Shimmer width="w-20" />
                <Shimmer width="w-20" />
              </div>
              <hr />
              <div className="text-center md:text-left">
                <Shimmer width="w-12" className="mb-2" />
                <div className="flex space-x-2">
                  <ShimmerList count={5} height="h-10" width="w-10" />
                </div>
              </div>
              <ShimmerList count={2} elem="button" />
          </div>
      </div>
    </>
  )
}