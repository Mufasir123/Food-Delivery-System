import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { getUser } from "../store/slices/userSlice";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:4000/api/user/login";

      const response = await axios.post(url, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        dispatch(getUser(response.data.user));
        toast.success("Logged in successfully!");
        navigate("/add");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during submission:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Submission failed. Please try again.");
    }
  };

  return (
    <section className="mt-12">
      <div className="flex justify-center mt-20">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

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
              type="submit"
              className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
