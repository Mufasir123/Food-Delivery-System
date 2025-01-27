import React, { useEffect, useState } from "react";
import axios from "axios";

const OrdersHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch orders from the backend
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token"); // Replace with your token key
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/orders/getorder`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setOrders(res.data); // Save orders to state
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch orders.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-5">Order History</h1>

      {loading ? (
        <p className="text-lg">Loading orders...</p>
      ) : error ? (
        <p className="text-lg text-red-500">{error}</p>
      ) : orders.length > 0 ? (
        <div className="space-y-5">
          {orders?.map((order) => (
            <div
              key={order?._id}
              className="border border-gray-300 p-4 rounded-lg shadow-lg space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div className="order-details sm:ml-4 sm:mt-0 mt-4">
                  <p className="font-semibold text-gray-800">Order ID:</p>
                  <p>{order?._id}</p>
                </div>

                <div className="order-status sm:ml-4 sm:mt-0 mt-4">
                  <p className="font-semibold text-gray-800">Status:</p>
                  <p>{order?.status}</p>
                </div>
              </div>

              <div className="order-items mt-4">
                <p className="font-semibold text-gray-800">Items:</p>
                <ul className="list-disc pl-5">
                  {order?.items.map((item) => (
                    <li key={item?._id}>
                      {item?.menuItem.name} × {item?.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="order-total flex flex-col sm:flex-row sm:justify-between mt-4">
                <div>
                  <p className="font-semibold text-gray-800">Total Amount:</p>
                  <p className="font-bold text-xl">${order?.totalAmount}</p>
                </div>

                <div className="order-date sm:ml-4 sm:mt-0 mt-4">
                  <p className="font-semibold text-gray-800">Date:</p>
                  <p>
                    {new Date(order?.createdAt).toLocaleDateString()}{" "}
                    {new Date(order?.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg text-gray-500">No orders found.</p>
      )}
    </div>
  );
};

export default OrdersHistory;
