import clsx from 'clsx';
import { Shimmer } from './skeletons';

// const shimmer = 'relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm animate-shimmer'
const shimmer = ''

export function ProductSkeleton() {
  return (
    <div className={clsx(shimmer, 'flex flex-col items-center justify-center')}>
      <Shimmer height='h-[300px] md:w-[300px]' width='w-[250px] md:h-[350px]' />
      <Shimmer elem='h4' width='w-3/5' />
      <Shimmer width='w-1/2' />
    </div>
  )
}

export function ProductsListSkeleton({ count }: { count: number }) {
  return (
    Array.from({ length: count }).map((_, index) => (
      <ProductSkeleton key={index} />
    ))
  )
}
