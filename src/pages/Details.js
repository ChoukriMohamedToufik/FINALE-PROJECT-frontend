import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { GetoneProduct } from '../services/productServices'

function Details() {
   const  {id}=useParams()
   const product=useSelector((state)=>state.product.product)
    const dispatch=useDispatch()
    
    useEffect(() => {
        GetoneProduct(id,dispatch)
    }, [id,dispatch])
    
    // ✅ إذا كان product موجود، استعمل بياناته
    if (!product) return <div>جاري التحميل...</div>
    
  return (
    <div>
       <h1>{product.name}</h1> 
       <p>{product.description}</p>
       
       {/* ✅ product مؤكد موجود هنا */}
       <img 
         src={product.img} 
         alt={product.name}
         style={{ maxWidth: '100%', height: 'auto' }} // نصيحة إضافية
       />
       
    </div>
  )
}

export default Details
