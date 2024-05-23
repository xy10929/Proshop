import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //save userInfo (get from res) into state and localStorage
    setCredentials: (state, action) => {
      state.userInfo = action.payload
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
    },
    //clear userInfo and localStorage
    logout: (state) => {
      state.userInfo = null
      localStorage.clear()
    },
  },
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer
