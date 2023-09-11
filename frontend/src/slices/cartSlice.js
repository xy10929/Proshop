import { createSlice } from '@reduxjs/toolkit'
//no endpiont or async req, so just use createSlice

//try to get from localStorage
const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] }

//for price
const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2)
}

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

      //calculate items price
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      )

      //calculate shipping price(0 or 5)
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 5)

      //calculate tax price(10%)
      state.taxPrice = addDecimals(Number(0.1 * state.itemsPrice).toFixed(2))

      //calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2)

      localStorage.setItem('cart', JSON.stringify(state))
    },
  },
})

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer
//for storing in reducer of store.js
