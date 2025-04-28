'use client'

import { createInventoryItemAPI, fetchInventoryItemsAPI } from "@/app/lib/services/inventoryService"
import { fetchProductsAPI } from "@/app/lib/services/products/productService"
import Heading from "@/app/ui/common/heading"
import InventoryItems from "@/app/ui/dashboard/inventory/inventory-items"
import Input from "@/app/ui/forms/components/input"
import Select from "@/app/ui/forms/components/select"
import { fetchProducts } from "@/redux/features/products/productsThunk"
import { useAppSelector } from "@/redux/hooks"
import { useAppDispatch } from "@/redux/store"
import { useEffect, useState } from "react"

interface InventoryFormProps {
    onSubmit: (data: InventoryData) => void
}
  
interface InventoryData {
    // user: number | null
    product: number
    size_text: string
    type: 'add' | 'minus'
    quantity: number
    // size: number | null
    description: string
}

export default function Page() {
  const dispatch = useAppDispatch()
  const { products, loading: loadingProducts } = useAppSelector(state => state.products)

  const [loading, setLoading] = useState(false)

  const [inventoryItems, setInventoryItems] = useState<any[]>([])
  useEffect(() => {
    dispatch(fetchProducts())
    const getData = async () => {
      setLoading(true)
      try {
          const data = await fetchInventoryItemsAPI()
          setInventoryItems(data)
      } catch (error) {
          console.error('Failed to fetch inventory items:', error)
      }
      setLoading(false)
    }
    getData()
  }, [])

  const [formData, setFormData] = useState<InventoryData>({
      // user: null,
      product: 1,
      size_text: 'xs',
      type: 'add',
      quantity: 1,
    // size: null,
      description: 'restok',
  })
    
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormData({
          ...formData,
          [name]: name === 'quantity' ? Number(value) : value,
      })
  }
    
  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      console.log(formData)
      await createInventoryItemAPI(formData)

  }

  return (
      <>
          <Heading level={4} className="capitalize">Make changes</Heading>
          <div className="w-fit bg-white shadow rounded-lg p-4">
              <form className="space-y-2" onSubmit={handleSubmit}>
                  <Select 
                    label="product" 
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    required={true}
                    options={products}
                    loading={loadingProducts}
                    isProductsSelect={true}
                    className="grid grid-cols-2"
                  />
                  <Select
                    label="size label"
                    name="size_text"
                    value={formData.size_text}
                    onChange={handleChange}
                    required={true}
                    options={['xs', 's', 'm', 'l', 'xl', 'xxl']}
                    className="grid grid-cols-2"
                  />
                  <Select 
                    label="type" 
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required={true}
                    options={['add', 'minus']}
                    className="grid grid-cols-2"
                  />
                  <Input 
                    label="quantity" 
                    type="number" 
                    name="quantity" 
                    value={formData.quantity} 
                    onChange={handleChange} 
                    required={true}
                    className="grid grid-cols-2"
                  />
                  {/* <div>
                      <label>Size (optional)</label>
                      <input
                          type="number"
                          name="size"
                          value={formData.size || ''}
                          onChange={handleChange}
                          placeholder="Size"
                      />
                  </div> */}
                  <Select
                    label="change reason" 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required={true}
                    options={['restock', 'return', 'sale', 'adjustment', 'damage/loss']}
                    className="grid grid-cols-2"
                  />
                  <Input type="submit" value={'submit'} />
              </form>
          </div>
          <br />
          <br />
          <Heading level={4} className="capitalize">Inventory History</Heading>
          <br />
          <InventoryItems inventoryItems={inventoryItems} products={products} loading={loading} />
          <br />
          <br />
          <br />
      </>
  )
}