'use client'

import Table from '../../common/table/table'
import { NextPage } from 'next'
import { shippingRateResponse } from '@/app/lib/types/dashboard/shippingRateTypes'
import { setActivePopup } from '@/redux/features/popup/popupSlice'
import { useAppSelector } from '@/redux/hooks'
import { useAppDispatch } from '@/redux/store'

interface Props {
  shippingRates: shippingRateResponse[]
}

const ShippingRatesTable: NextPage<Props> = ({ shippingRates = [] }) => {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(state => state.shippingRate.loading)
  const loadingItemId = useAppSelector(state => state.shippingRate.editItemLoading)
  const deleteItemLoading = useAppSelector(state => state.shippingRate.deleteItemLoading)

  const handleEdit = (shippingRateData: shippingRateResponse) => {
    dispatch(setActivePopup({ activePopup: 'shippingRateForm' }))
  }

  if (loading) return <p>Loading...</p>
  
  return (
    <Table 
      data={shippingRates?.map((shippingRate) => {
        return {
          governorate: shippingRate?.governorate,
          shippingPrice: (
            loadingItemId === shippingRate?.id ?
            'Loading...' :
            shippingRate?.shipping_price
          ),
          actions: (
            <div className="inline-block">
              <div className="flex items-center divide-x-2 text-center text-xs">
                <button
                  className="text-blue-500 hover:underline flex-wrap w-16 pl-1"
                  onClick={() => handleEdit(shippingRate)}
                >
                  edit
                </button>
                {
                  deleteItemLoading ?
                  <span className='pl-1'>Loading...</span> :
                  <button
                    className="text-blue-500 hover:underline flex-wrap w-16 pl-1"
                    onClick={() => 
                      dispatch(setActivePopup({ 
                        activePopup: 'deleteShippingRate', 
                        popupPayload: shippingRate.id 
                      }))
                    }
                  >
                    delete
                  </button>
                }
              </div>
            </div>
          )
        }
      })} 
    />
  )
}

export default ShippingRatesTable