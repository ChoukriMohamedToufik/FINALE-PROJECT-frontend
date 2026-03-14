import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { AddProduct } from '../services/productServices'
import { GetCurrentUser } from '../services/UserServices'

function Dashboard() {
  const user = useSelector((state) => state.user.user)
  const [data, setdata] = useState({})
  const dispatch=useDispatch()
 const [addProduct, setaddProduct] = useState(false)
  useEffect(() => {
    GetCurrentUser(dispatch)
  }, [dispatch])

  const handleSubmit = (e) => {

    e.preventDefault()
    const formdata= new FormData()
    formdata.append("name",data.name)
    formdata.append("price",data.price)
    formdata.append("description",data.description)
    formdata.append("stock",data.stock)
    formdata.append("file",data.img)
    AddProduct(formdata,dispatch)
     }
  return (
    <div>
      <Navbar />
      <h1>Email : {user && user?.email}  </h1>
      <p>Name : {user && user?.name}</p>
      <button onClick={()=>setaddProduct(!addProduct)}>Add product</button>
     {addProduct ? <form onSubmit={handleSubmit}>
        <h1>Add product</h1>
        <input placeholder='name' onChange={(e)=>setdata({...data,name:e.target.value})}/>
        <label>price :</label>
        <input type='number' onChange={(e)=>setdata({...data,price:e.target.value})}/>
        <input type='file' onChange={(e)=>setdata({...data,img:e.target.files[0]})}/>
        <input placeholder='description' onChange={(e)=>setdata({...data,description:e.target.value})}/>
        <label>stock :</label>
        <input type='number' onChange={(e)=>setdata({...data,stock:e.target.value})}/>
         <button type='submit'>save</button>
      </form>:null}

     
    </div>
  )
}

export default Dashboard