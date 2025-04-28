import { createAsyncThunk } from '@reduxjs/toolkit'
import productsData from '@/app/lib/data/products.json'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const products = productsData
      
      // console.log('thunk: products', products)

      return products
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch products')
    }
  }
)

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId: number, { rejectWithValue }) => {
    try {
      const product = productsData.find((p: any) => p.id === Number(productId))
      
      // console.log('thunk: product by id', product)
      
      return product
    
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch products')
    }
  }
)