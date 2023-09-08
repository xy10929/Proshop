import { PRODUCTS_URL } from '../constants'
import { apiSlice } from './apiSlice'

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
      //keep data cached for 5s after the last mounted component
    }),
  }),
})

export const { useGetProductsQuery } = productsApiSlice
//add use... and ...Query
