import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { CgProfile } from "react-icons/cg"
import { FaBoxOpen, FaCartPlus } from "react-icons/fa"
import { RiLogoutCircleFill } from "react-icons/ri"
import { getMyProfile, getUser } from "../store/slices/userSlice"
import { toast } from "react-toastify"
import axios from "axios"

const Profile = ({ isMobile }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const count = useSelector(state => state.cart)

  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/profile/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
        },
          withCredentials: true,
        })
        console.log(res);
        
        dispatch(getMyProfile(res.data.user))
      } catch (error) {
        console.error("Error fetching profile:", error)
      }
    }

    if (user) {
      fetchProfile()
    }
  }, [user, dispatch])

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/logout`, {
        withCredentials: true,
      })
      dispatch(getUser(null))
      dispatch(getMyProfile(null))
      localStorage.removeItem("token");
      toast.success(res.data.message)
      navigate("/signup")
    } catch (error) {
      console.error("Error during logout:", error)
      toast.error("Logout failed. Please try again.")
    }
  }

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen)
  }

  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest(".profile-dropdown")) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener("click", closeDropdown)
    return () => document.removeEventListener("click", closeDropdown)
  }, [])

  if (user) {
    if (isMobile) {
      return (
        <>
          <div className="border-t border-gray-200 pt-4">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
          <Link
            to="/profile"
            className="text-base font-medium text-gray-900 transition-all duration-200 hover:text-indigo-600"
          >
            Profile
          </Link>
          <Link
            to="/cart"
            className="text-base font-medium text-gray-900 transition-all duration-200 hover:text-indigo-600"
          >
            <FaCartPlus className="inline mr-2" />
            Cart
          </Link>
          <button
            onClick={logoutHandler}
            className="text-base font-medium text-gray-900 transition-all duration-200 hover:text-red-600"
          >
            <RiLogoutCircleFill className="inline mr-2" />
            Logout
          </button>
        </>
      )
    } else {
      return (
        <div className="relative profile-dropdown">
          <button
            onClick={handleProfileClick}
            className="flex items-center text-base font-medium text-gray-900 transition-all duration-200 hover:text-indigo-600"
          >
            <CgProfile className="w-5 h-5 mr-1" />
            {user.name || "Profile"}
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-md">
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <FaBoxOpen  className="inline mr-2"/>
                Orders
              </Link>
             <Link to="/cart" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <FaCartPlus className="inline mr-2" />
                <p className="inline mr-2 bg-emerald-200 rounded-2xl shadow-2xl"> {count.length} </p>
                Cart
              </Link>
              <button
                onClick={logoutHandler}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <RiLogoutCircleFill className="inline mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      )
    }
  } else {
    return (
      <Link
        to="/signup"
        className="text-base font-medium text-gray-900 transition-all duration-200 hover:text-indigo-600"
      >
        SignIn/SignUp
      </Link>
    )
  }
}

export default Profile

