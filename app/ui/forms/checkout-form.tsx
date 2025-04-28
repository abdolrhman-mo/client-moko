'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { useAppDispatch } from '@/redux/store'
import { placeBuyItNowOrder, placeUserOrder } from '@/redux/features/orders/orderUserThunk'
import { useFormik } from 'formik'
import { fetchDefaultUserData } from '@/redux/features/checkout/checkoutThunk'
import { useAppSelector } from '@/redux/hooks'
import { checkoutSchema } from '@/app/lib/validation/checkoutValidation'
import { fetchShippingRates } from '@/redux/features/dashboard/shippingRate/shippingRateThunk'
import Input from '@/app/ui/forms/components/input'
import Select from '@/app/ui/forms/components/select'
import Heading from '../common/heading'
import Radio from './components/radio'
import Note from '../checkout/note'
import OrderSummary from '../checkout/order-summary'
import { Spinner2 } from '../skeletons/skeletons'

// let governorates_names_en: string[] = []

// governorates.map(governerate => {
//     governorates_names_en.push(governerate.governorate_name_en)
// })

export default function CheckoutForm({
    className,
    buyItNowId,
    buyItNowSize,
    shippingPrice,
    setShippingPrice,
  }: {
    className?: string
    buyItNowId?: number
    buyItNowSize?: string
    shippingPrice: number | null
    setShippingPrice: any
}) {
  const dispatch = useAppDispatch()
  const defaultData = useAppSelector(state => state.checkout.defaultData)
  const status = useAppSelector(state => state.checkout.status)
  
  const shippingRates = useAppSelector(state => state.shippingRate.items)
  const shippingRatesLoading = useAppSelector(state => state.shippingRate.loading)

  useEffect(() => {
    dispatch(fetchDefaultUserData())
    dispatch(fetchShippingRates())
  }, [dispatch])
    
  const formik = useFormik({
    initialValues: defaultData || {
      address: {
        id: 0,
        country: 'Egypt',
        governorate: '',
        city: '',
        address_text: '',
      },
      user: {
        phone_number: '',
        first_name: '',
        last_name: '',
      }
    },
    validationSchema: checkoutSchema,
    onSubmit: async (values) => {
      
      console.log('checkout-form: form data', values)

      try {
        if (buyItNowId && buyItNowSize) {
          dispatch(placeBuyItNowOrder({
            orderData: values,
            productId: buyItNowId,
            size_text: buyItNowSize,
          }))
        } else {
          dispatch(placeUserOrder({ orderData: values }))
        }
      } catch (error) {
        console.error('Error creating order:', error)
      }
    },
    enableReinitialize: true,
  })

  const handleGovernorateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    formik.setFieldValue('address.governorate', value)
  
    // Additional logic
    const price = shippingRates.find(rate => rate.governorate === value)?.shipping_price
    if (price) {
      setShippingPrice(price)
    }
  }

  return (
    <>
      <Spinner2 name='orderLoading'>Preparing order</Spinner2>
      <form noValidate onSubmit={formik.handleSubmit} className='text-sm w-5/6 mx-auto my-12 grid lg:grid-cols-2 gap-16'>
          <div className={`grid grid-cols-2 gap-2 ${className}`}>
              <Heading level={4} className='col-span-2'>Delivery</Heading>
              <Select 
                  name="address.country"
                  options={['Egypt']}
                  value={formik.values.address.country}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.address?.country && formik.errors.address?.country}
                  className='col-span-2' 
              />

              <Input 
                  name="address.address_text"
                  value={formik.values.address.address_text}
                  placeholder='Address' 
                  required={true}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.address?.address_text && formik.errors.address?.address_text}
                  className='col-span-2'
              />

              <Input 
                  name="user.first_name"
                  value={formik.values.user.first_name}
                  placeholder='First Name' 
                  required={true}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.user?.first_name && formik.errors.user?.last_name}
                  className='col-span-2 md:col-span-1' 
              />

              <Input 
                  name="user.last_name"
                  value={formik.values.user.last_name}
                  placeholder='Last Name' 
                  required={true}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.user?.last_name && formik.errors.user?.last_name}
                  className='col-span-2 md:col-span-1' 
              />

              <Input 
                  name="address.city"
                  value={formik.values.address.city}
                  placeholder='City' 
                  required={true}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.address?.city && formik.errors.address?.city}
                  className='col-span-2 md:col-span-1' 
              />

              {shippingRatesLoading ?
                <p className='col-span-2 md:col-span-1 mb-2 mt-4'>Loading...</p> : 
                <Select
                  name="address.governorate"
                  options={(() => {
                    const governorates = shippingRates
                      .map(shippingRate => 
                        shippingRate.governorate
                      )
                    governorates.unshift('Governorate')
                    return governorates
                  })()}
                  value={formik.values.address.governorate}
                  onChange={handleGovernorateChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.address?.governorate && formik.errors.address?.governorate}
                  className='col-span-2 md:col-span-1'
                />
              }
              
              <Input 
                  name="user.phone_number"
                  value={formik.values.user.phone_number}
                  placeholder='Phone' 
                  type='tel' 
                  required={true}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.user?.phone_number && formik.errors.user?.phone_number}
                  className='col-span-2' 
              />

              <Heading level={4} className='col-span-2'>shipping method</Heading>
              <Radio 
                  name='shippingmethod' 
                  options={['Cairo Delivery (3 Working Days)']}
                  className='col-span-2' 
              />

              <Heading level={4} className='col-span-2'>Payment</Heading>
              <p className='col-span-2 text-gray-500 pb-4'>All transactions are secure and encrypted.</p>
              <Radio 
                  name='payment' 
                  options={[
                      // 'Pay via (Debit / Credit cards / Wallets / Installments)', 
                      'Cash on Delivery(COD)'
                  ]} 
                  className='col-span-2'
                  component={
                      <Note
                        className='transition-all duration-500 ease-in-out overflow-hidden h-0 py-0 peer-checked:h-fit peer-checked:p-6' />
                  }
                  componentIndex={0}
              />

              {/* <Heading level={5}>billing address</Heading>
              <Radio
                  name='billing address'
                  options={['same as shipping address', 'use a different billing address']}
                  component={
                      <AddressForm
                          className='transition-all duration-500 ease-in-out overflow-hidden h-0 py-0 peer-checked:h-fit peer-checked:py-6' />
                  }
                  componentIndex={1}
              /> */}
              {/* <button type="button" onClick={handleSubmit}>Submit</button> */}
          </div>
          <div className='grid h-fit'>
              <Heading level={4} className='lg:hidden'>order summary</Heading>
              <OrderSummary shippingPrice={shippingPrice} buyItNowId={buyItNowId} buyItNowSize={buyItNowSize} />
          </div>
          <Input
            onChange={() => console.log('changed')}
            type='submit'
            value={status === 'loading' ? 'processing..' : 'complete order'}
          />
      </form>
    </>
  )
}