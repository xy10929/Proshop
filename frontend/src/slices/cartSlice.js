import { createSlice } from '@reduxjs/toolkit'
//no endpiont or async req, so just use createSlice

import { updateCart } from '../utils/cartUtils'

//try to get from localStorage
const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  //functions about cart
  reducers: {
    addToCart: (state, action) => {
      //get item from payload
      const item = action.payload

      //check if cart already has the item id
      const existItem = state.cartItems.find((x) => x._id === item._id)

      if (existItem) {
        //if the item exists, find it and set as item
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        )
      } else {
        //add new item(payload) into state.cartItems
        state.cartItems = [...state.cartItems, item]
      }

      return updateCart(state)
    },
    removeFromCart: (state, action) => {
      //action.payload - item id
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload)

      return updateCart(state)
    },
  },
})

export const { addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer
//for storing in reducer of store.js
