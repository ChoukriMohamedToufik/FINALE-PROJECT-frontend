import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function AdminRoutes({ children }) {
  const token = localStorage.getItem('token')
  const { isAdmin, user } = useSelector((state) => state.user)

  // إذا ماكاش token → روح للسجيل الدخول
  if (!token) {
    return <Navigate to="/login" />
  }

  // إذا هو ليس admin → روح للصفحة الرئيسية
  if (!isAdmin) {
    return <Navigate to="/" />
  }

  // إذا هو admin → ورّيه dashboard
  return children
}

export default AdminRoutes