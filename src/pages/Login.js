import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import { LoginService } from '../services/UserServices'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Login() {
   const [email, setemail] = useState("")
   const [password, setpassword] = useState("")
   const dispatch=useDispatch()
   const navigate=useNavigate()
   const err=useSelector(state=>state.user.error)
  const handleSubmit=(e)=>{
    e.preventDefault()
    LoginService({email,password},dispatch,navigate)
  }
  return (
    <div>
         <Navbar/>
         <form className='login_container' onSubmit={handleSubmit}>
            <label>email</label>
            <input  onChange={(e)=>setemail(e.target.value)}/>
            <label>password</label>
            <input type='password'  onChange={(e)=>setpassword(e.target.value)}/>
            {err?<p  className='err'>{err.msg}</p>:null}
            <button  type="submit"  className='btn'>Login</button>
         </form>
    </div>
  )
}

export default Login