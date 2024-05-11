// entry point of redux

import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice'
import cartSliceReducer from './slices/cartSlice'
import authSliceReducer from './slices/authSlice'

// store includes reducers
const store = configureStore({
  reducer: {
    //...ApiSlice -> child of apiSlice, for backend api
    [apiSlice.reducerPath]: apiSlice.reducer,

    //...Slice -> state & localStorage, for UI
    cart: cartSliceReducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})

export default store
