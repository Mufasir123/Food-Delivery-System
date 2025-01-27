import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../store/slices/cartSlice.js";
import axios from "axios";
import { updateOrder } from "../store/slices/foodSlice.js";

const Cart = () => {
  const cartProduct = useSelector((state) => state.cart); // List of products in the cart
  const [quantities, setQuantities] = useState({}); // Object to manage quantities for each product
  const dispatch = useDispatch();

  // Calculate total amount
  const totalAmount = cartProduct.reduce((total, product) => {
    const quantity = quantities[product._id] || 1; // Default quantity to 1
    return total + product.price * quantity;
  }, 0);

  // Function to remove a product from the cart
  const removeFromCart = (id) => {
    dispatch(remove(id));
  };

  // Function to handle quantity changes for a specific product
  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta), // Prevent quantities less than 1
    }));
  };

  // Function to place an order
  const orderHandle = async () => {
    try {
      const token = localStorage.getItem("token");

      // Prepare the `items` array based on cartProduct and quantities
      const items = cartProduct.map((product) => ({
        menuItem: product._id, // Backend expects "menuItem" for product ID
        quantity: quantities[product._id] || 1, // Use current quantity or default to 1
      }));

      // Send POST request to create an order
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/orders/createorder`,
        { items },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log("Order Response: ", res.data);

      // Dispatch updateOrder action to update Redux state
      dispatch(updateOrder(res.data));
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Order Error: ", error.response?.data || error.message);
      alert("Failed to place the order. Please try again.");
    }
  };

  return (
    <div className="cart-container mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h1 className="text-2xl font-bold mb-5">Your Cart</h1>
      {cartProduct && cartProduct.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {cartProduct.map((product) => (
              <div
                key={product._id}
                className="cart-item rounded-lg p-4 flex flex-col items-center gap-4 shadow-2xl"
              >
                {/* Product Image */}
                <img
                  alt={product.name}
                  src={`${import.meta.env.VITE_SERVER_URL}/images/${
                    product.image
                  }`}
                  className="aspect-square w-62 h-62 rounded-lg bg-gray-200 object-cover"
                />
                {/* Product Name and Price */}
                <h3 className="text-md font-bold text-black">{product.name}</h3>
                <p className="text-lg font-medium">Price: ${product.price}</p>
                {/* Quantity Management */}
                <div className="flex items-center gap-3">
                  <button
                    className="bg-amber-100 p-2 rounded-2xl"
                    onClick={() => handleQuantityChange(product._id, 1)}
                  >
                    +
                  </button>
                  <span>{quantities[product._id] || 1}</span>
                  <button
                    className="bg-amber-100 p-2 rounded-2xl"
                    onClick={() => handleQuantityChange(product._id, -1)}
                    disabled={(quantities[product._id] || 1) <= 1}
                  >
                    -
                  </button>
                </div>
                {/* Buttons: Remove */}
                <button
                  className="bg-[#0764e5] text-white font-medium rounded-md w-full h-10"
                  onClick={() => removeFromCart(product._id)}
                >
                  Remove Item
                </button>
              </div>
            ))}
          </div>

          {/* Total Amount */}
          <div className="mt-10 text-lg font-bold">
            Total Amount: <span className="text-green-600">${totalAmount}</span>
          </div>

          {/* Order Now Button */}
          <button
            className="mt-5 bg-red-500 text-white font-medium rounded-md px-6 py-3"
            onClick={orderHandle}
          >
            Order Now
          </button>
        </>
      ) : (
        <p className="text-lg text-gray-500">Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
