import { createSlice } from '@reduxjs/toolkit'

const productslice = createSlice({
     name: 'product',
     initialState: {
          products:[],
          product: {},
         
     },
     reducers: {
          getproducts:(state,action)=>{
            state.products=action.payload
          },
          getoneproduct:(state,action)=>{
            state.product=action.payload
          }
     }
})
export const {getoneproduct,getproducts} = productslice.actions
export default productslice.reducer