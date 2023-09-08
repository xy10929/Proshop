import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants'

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL })

export const apiSlice = createApi({
  baseQuery,
  //define types of data fetched from api
  tagTypes: ['Product', 'Order', 'User'],
  //instead of try...catch..., do it all through builder
  endpoints: (builder) => ({}),
})
