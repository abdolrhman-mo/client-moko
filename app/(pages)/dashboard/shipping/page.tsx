'use client'

import Button from '@/app/ui/common/button'
import Heading from '@/app/ui/common/heading'
import Search from '@/app/ui/common/search'
import WarningMessage from '@/app/ui/common/warning-message'
import NewShippingRateButton from '@/app/ui/dashboard/shipping/new-shipping-rate-button'
import ShippingRateForm from '@/app/ui/dashboard/shipping/shipping-rate-form'
import ShippingRatesTable from '@/app/ui/dashboard/shipping/shipping-rates-table'
import { shippingRateResponse } from '@/app/lib/types/dashboard/shippingRateTypes'
import { deleteShippingRate, fetchShippingRates, resetShippingRates } from '@/redux/features/dashboard/shippingRate/shippingRateThunk'
import { useAppSelector } from '@/redux/hooks'
import { useAppDispatch } from '@/redux/store'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { setActivePopup } from '@/redux/features/popup/popupSlice'

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const dispatch = useAppDispatch()
  const shippingRates = useAppSelector(state => state.shippingRate.items)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredShippingRates, setFilteredShippingRates] = useState<shippingRateResponse[]>([])

  const popupPayload = useAppSelector(state => state.popup.popupPayload)

  useEffect(() => {
    dispatch(fetchShippingRates())
  }, [dispatch])
  
  useEffect(() => {
    setFilteredShippingRates(shippingRates)
  }, [shippingRates])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const searchLower = query.toLowerCase()
    const filtered = shippingRates.filter(shippingRate => 
      shippingRate.governorate.toLowerCase().includes(searchLower)
    )
    setFilteredShippingRates(filtered)
  }

  const handleResetToDefault = async () => {
    dispatch(resetShippingRates())
  }

  const handleDelete = () => {
    dispatch(deleteShippingRate(popupPayload))
  }

  return (
    <>
      <Heading level={5}>Shipping rates</Heading>

      <div className="grid grid-cols-2 gap-4">
        <NewShippingRateButton />
        <Search onSearch={handleSearch} placeholder='Search by governorate' />
      </div>
      <br />
      {shippingRates && 
        <ShippingRatesTable shippingRates={filteredShippingRates} />
      }
      <br />
      <Button onClick={() => dispatch(setActivePopup({ activePopup: 'resetShippingRate' }))} theme='warning' className='!w-fit'>
        Reset to default
      </Button>
    
      <ShippingRateForm />
      <WarningMessage 
        name='deleteShippingRate'
        message='Are you sure you want to delete this shipping rate?' 
        onSuccess={handleDelete}
      />
      <WarningMessage 
        name='resetShippingRate'
        message='Are you sure you want to reset shipping rates to Egypt’s default shipping rates values?' 
        onSuccess={handleResetToDefault}
      />
      <WarningMessage 
        name='deleteLastRateError'
        message={`You can't delete all shipping rates. There has to be at least one.`}
      />
    </>
  )
}

export default Page