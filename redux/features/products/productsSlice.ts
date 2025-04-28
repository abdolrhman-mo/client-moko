import { ProductType } from '@/app/lib/types/productTypes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchProductById, fetchProducts } from './productsThunk'

interface ProductsState {
  products: ProductType[]
  loading: boolean
  error: any
  product: ProductType | null
  productLoading: boolean
  productError: any
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  product: null,
  productLoading: false,
  productError: null,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductType[]>) => {
      state.products = action.payload
    },
    setProductDetails: (state, action: PayloadAction<ProductType>) => {
      state.product = action.payload
    }
  },
  extraReducers: (builder) => {
    builder

      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // Fetch Product By Id
      .addCase(fetchProductById.pending, (state) => {
        state.productLoading = true
        state.productError = null
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.product = action.payload
        state.productLoading = false
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.productLoading = false
        state.productError = action.payload
      })
  },
})

export const { setProducts } = productsSlice.actions
export default productsSlice.reducer