import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Login from './Login'
import {useSelector} from 'react-redux'
import { useNavigate} from 'react-router-dom'

const AdminHome = () => {

  const {user} = useSelector(state => state.user)
  console.log(user);
  
  const navigate = useNavigate()
  useEffect(() => {
    if(!user){
      navigate("/")
    }
  }, [])
  return (
    <div>
      <Login/>
      <div>
      <Navbar/>
      <Outlet/>
      </div>
    </div>
  )
}

export default AdminHome
