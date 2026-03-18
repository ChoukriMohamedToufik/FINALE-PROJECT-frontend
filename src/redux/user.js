import { createSlice } from '@reduxjs/toolkit'

const userslice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    user: null,
    isAdmin: false,  // ✅ أضف هذا
    error: null   
  },
  reducers: {
    CurrentUser: (state, action) => {
      state.user = action.payload
      // ✅ افترض أن الـ role يجي من الباك-end
      state.isAdmin = action.payload?.role === 'admin' || action.payload?.isAdmin === true
    },
    GetAllUsers: (state, action) => {
      state.users = action.payload
    },
    catchError: (state, action) => {
      state.error = action.payload
    },
    emptyError: (state) => {
      state.error = null
    },
    Logout: (state) => {
      state.user = null
      state.isAdmin = false  // ✅ reset isAdmin
      localStorage.removeItem("token")
    }
  }
})

export const { CurrentUser, GetAllUsers, catchError, emptyError, Logout } = userslice.actions
export default userslice.reducer