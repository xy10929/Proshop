import { createSlice } from '@reduxjs/toolkit'
//no endpionts that are dealing with async req, so just use createSlice

import { updateCart } from '../utils/cartUtils'

//try to get from localStorage
const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'Paypal' }

const cartSlice = createSlice({
  name: 'cart',
  initialState,

  //functions about cart
  reducers: {
    //add product to cart / reset Qty of existing paroduct in cart
    //action includes payload(user input)
    addToCart: (state, action) => {
      //get the item (that will be added to cart) info (includes Qty) from payload
      const item = action.payload

      //check if the item is already in the cart by id
      const existItem = state.cartItems.find((x) => x._id === item._id)

      //update the Qty
      if (existItem) {
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

      //save the state into localStorage
      return updateCart(state)
    },

    //save ShippingAddress(payload) into state and localStorage
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload
      return updateCart(state)
    },

    savePaymentMethod: (state, action) => {
      state.shippingAddress.paymentMethod = action.payload
      return updateCart(state)
    },

    //once the order is created, clear the cart
    clearCartItems: (state, action) => {
      state.cartItems = []
      return updateCart(state)
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions

// for storing in reducer of store.js
export default cartSlice.reducer
