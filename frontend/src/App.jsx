import "./App.css";
import Products from "./components/AllProducts";
import Features from "./components/Features";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import SignUp from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import Cart from "./components/Cart";
import OrdersHistory from "./components/OrdersHistory";

function App() {
  
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="features" element={<Features />} />
          </Route>
          <Route path="/products" element={<Products />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<OrdersHistory/>} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
