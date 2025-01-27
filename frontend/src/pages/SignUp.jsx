import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import axios from "axios"
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa"
import { getUser } from "../store/slices/userSlice"
import { toast } from "react-toastify"

const SignUp = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const url = isLogin ? "http://localhost:4000/api/user/login" : "http://localhost:4000/api/user/register"

      const response = await axios.post(url, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.data.success) {
        localStorage.setItem("token", response.data.token)
        dispatch(getUser(response.data.user))
        toast.success(isLogin ? "Logged in successfully!" : "Registered successfully!")
        navigate("/")
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error("Error during submission:", error.response?.data || error.message)
      toast.error(error.response?.data?.message || "Submission failed. Please try again.")
    }
  }

  return (
    <section className="mt-12">
      <div className="flex justify-center mt-20">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? "Sign In" : "Sign Up"}</h2>

          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={data.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={data.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={data.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <button
            onClick={handleSubmit}
              type="submit"
              className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300"
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </div>

          <p className="text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </form>
      </div>
    </section>
  )
}

export default SignUp

