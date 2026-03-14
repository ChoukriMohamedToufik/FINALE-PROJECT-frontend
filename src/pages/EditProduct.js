import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Editproduct, GetoneProduct } from '../services/productServices'
import Navbar from '../components/Navbar/Navbar'

function EditProduct() {
   const  {id}=useParams()
   const product=useSelector((state)=>state.product.product)
    const dispatch=useDispatch()
    const [data, setdata] = useState(product)
    useEffect(() => {
        GetoneProduct(id,dispatch)
    }, [id,dispatch])
    
  return (
    <div>
        <Navbar/>
        <label>stock</label>
     <input  placeholder={data.stock}  onChange={(e)=>setdata({...data,stock:e.target.value})}/>
     <input  placeholder={data.price}  onChange={(e)=>setdata({...data,price:e.target.value})}/>
     <button  onClick={()=>Editproduct(data,id)}>save</button>
    </div>
  )
}

export default EditProduct