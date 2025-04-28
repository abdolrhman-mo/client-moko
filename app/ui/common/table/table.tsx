'use client'

import { NextPage } from 'next'
import TableHead from './table-head'
import TableBody from './table-body'
import { useAppSelector } from '@/redux/hooks'

interface Props {
  data: any[]
}

const Table: NextPage<Props> = ({ data }) => {
  const { loading } = useAppSelector(state => state.orderAdmin)

  if (loading) return <p>Loading...</p>

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  let headerss = Object.keys(data[0])

  return (
    <div className="overflow-x-auto rounded">
      <table className="min-w-full bg-white text-sm">
        <TableHead
          items={headerss}
          />
        <TableBody labels={headerss} data={data} />
      </table>
    </div>
  )
}

export default Table