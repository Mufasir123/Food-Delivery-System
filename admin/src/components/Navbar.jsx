import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { HiOutlineBars3 } from "react-icons/hi2"
import { RxCross2 } from "react-icons/rx"
import { getUser } from "../store/slices/userSlice"
import axios from "axios"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
const Navbar = () => {
  const [expanded, setExpanded] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/logout`, {
        withCredentials: true,
      })
      dispatch(getUser(null))
      localStorage.removeItem("token");
      toast.success(res.data.message)
      navigate("/")
    } catch (error) {
      console.error("Error during logout:", error)
      toast.error("Logout failed. Please try again.")
    }
  }

  return (
    <div>
      <header className="inset-x-0 top-0 z-10 fixed shadow-2xl">
        <nav className="bg-white flex w-full h-full items-center justify-between gap-1 px-4 py-2">
          

          <div className="flex items-center">
            <Link to="/add" title="AuraUI" className="flex text-lg font-semibold">
              Food Delivery
            </Link>
          </div>

          
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-900"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
            >
              {!expanded ? (
                <div className="flex items-center gap-5">
                  {/* <FaCartPlus /> */}
                  <HiOutlineBars3 className="w-7 h-7" />
                </div>
              ) : (
                <RxCross2 className="w-7 h-7" />
              )}
            </button>
          </div>

          
          <div className="hidden md:flex md:items-center md:space-x-10">
            <Link
              to="/add"
              className="text-base font-medium text-gray-900 transition-all duration-200 hover:text-indigo-600"
            >
              Add Items
            </Link>
            <Link
              to="/list"
              className="text-base font-medium text-gray-900 transition-all duration-200 hover:text-indigo-600"
            >
              List Items
            </Link>
            <button
                onClick={logoutHandler}
                  className="cursor-pointer text-base font-medium text-gray-900 transition-all duration-200 hover:text-indigo-600"
                >
                 Logout
                </button>
          </div>
        </nav>

        
        {expanded && (
          <div>
            <nav className="px-1 pt-8 pb-4 z-50 bg-amber-50 rounded-lg ml-62">
              <div className="grid gap-y-6 pl-5">
                <Link
                  to="/add"
                  className="text-base font-medium text-gray-900 transition-all duration-200 hover:text-indigo-600"
                >
                  Add Items
                </Link>
                <Link
                  to="/list"
                  className="text-base font-medium text-gray-900 transition-all duration-200 hover:text-indigo-600"
                >
                  List Items
                </Link>
                <button
                onClick={logoutHandler}
                  className="text-base font-medium text-gray-900 transition-all duration-200 hover:text-indigo-600"
                >
                 Logout
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </div>
  )
}

export default Navbar

