import { fetchProductByIdAPI, fetchProductsAPI } from '@/app/lib/services/products/productService'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const products = await fetchProductsAPI()
      
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
      const product = await fetchProductByIdAPI(productId)
      
      // console.log('thunk: product by id', product)
      
      return product
    
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch products')
    }
  }
)