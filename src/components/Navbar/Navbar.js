// components/Navbar/Navbar.js
import React from 'react'
import "./nav.css"
import { useNavigate } from 'react-router-dom'
import { Logout, emptyError } from '../../redux/user'
import { useDispatch } from 'react-redux'

function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const handlenav = (path) => {
    dispatch(emptyError())
    navigate(`/${path}`)
  }
  
  const handleClick = () => {
    dispatch(Logout())
    navigate('/')
  }
  
  const token = localStorage.getItem("token")
  
  return (
    <div className='nav'>
        <div className="logo" onClick={() => handlenav("/")}>
            CMT Tech
        </div>
        <div className="nav-links">
            <button onClick={() => handlenav("/")}>Home</button>
            <button onClick={() => handlenav("/dashboard")}>Dashboard</button>
            {!token ? (
                <>
                    <button onClick={() => handlenav("/register")}>SIGN UP</button>
                    <button onClick={() => handlenav("/login")}>LOGIN</button>
                </>
            ) : (
                <button onClick={handleClick}>LOGOUT</button>
            )}
        </div>
    </div>
  )
}

export default Navbar