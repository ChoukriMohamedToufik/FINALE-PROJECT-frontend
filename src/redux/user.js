import { createSlice } from '@reduxjs/toolkit'



const userslice = createSlice({
     name: 'user',
     initialState: {
         users:[],
          user: {},
          error:null   
     },
     reducers: {
          CurrentUser: (state, action) => {
            state.user = action.payload
          },
          GetAllUsers: (state, action) => {
               state.users = action.payload
          },
          catchError:(state,action)=>{
               state.error=action.payload
          },
          emptyError:(state,action)=>{
               state.error=null
          },
          Logout:(state,action)=>{
           state.user=null
           localStorage.removeItem("token")
          }
     }
})
export const { CurrentUser,GetAllUsers,catchError,emptyError,Logout} = userslice.actions
export default userslice.reducer