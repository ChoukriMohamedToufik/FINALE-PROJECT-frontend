import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Register } from '../services/UserServices'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Signup() {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [name, setname] = useState("")
  const dispatch=useDispatch()
  const navigate=useNavigate()
   const err=useSelector(state=>state.user.error)

  const handleSubmit=(e)=>{
    e.preventDefault()
    Register({email,password,name},navigate,dispatch)
  }
  return (
    <div>
         <Navbar/>
         <form className='signup_container' onSubmit={handleSubmit} >
            <label>email</label>
            <input  onChange={(e)=>setemail(e.target.value)}/>
            <label>password</label>
            <input type='password' onChange={(e)=>setpassword(e.target.value)}/>
            <label>name</label>
            <input   onChange={(e)=>setname(e.target.value)}/>
            {err?<p className='err'>{err.msg}</p>:null}
            <button  type='submit' className='btn'>Register</button>
         </form>
        </div>
  )
}

export default Signup