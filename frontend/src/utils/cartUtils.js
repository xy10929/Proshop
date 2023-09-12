//for price
export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2)
}

export const updateCart = (state) => {
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

  return state
}
