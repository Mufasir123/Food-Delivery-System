import React, { useState, useEffect } from "react";
import axios from "axios";

const ListItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [editItem, setEditItem] = useState(null); // For edit functionality
  const [loading, setLoading] = useState(false);

  // Fetch menu items
  const fetchMenuItems = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/menu/items");
      setMenuItems(response.data.menuItems);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  // Delete menu item
  const deleteMenuItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const token = localStorage.getItem("token")
      await axios.delete(`http://localhost:4000/api/menu/items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setMenuItems((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  // Update menu item
  const updateMenuItem = async (id, updatedData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token")
      await axios.put(`http://localhost:4000/api/menu/update/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,

      });
      fetchMenuItems(); // Refresh list after update
      setEditItem(null);
    } catch (error) {
      console.error("Error updating menu item:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes for editing
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditItem((prev) => ({ ...prev, [name]: value }));
  };

  // Handle edit form submit
  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateMenuItem(editItem._id, {
      name: editItem.name,
      category: editItem.category,
      price: editItem.price,
      availability: editItem.availability,
    });
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <div className="p-6 mt-10">
      <h1 className="text-2xl font-bold mb-4">Menu Items</h1>

      {menuItems.length === 0 ? (
        <p>No items available.</p>
      ) : (
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li
              key={item._id}
              className="border p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              {editItem && editItem._id === item._id ? (
                <form className="flex flex-col space-y-2" onSubmit={handleEditSubmit}>
                  <input
                    type="text"
                    name="name"
                    value={editItem.name}
                    onChange={handleEditChange}
                    className="border border-gray-300 p-2 rounded"
                  />
                  <input
                    type="text"
                    name="category"
                    value={editItem.category}
                    onChange={handleEditChange}
                    className="border border-gray-300 p-2 rounded"
                  />
                  <input
                    type="number"
                    name="price"
                    value={editItem.price}
                    onChange={handleEditChange}
                    className="border border-gray-300 p-2 rounded"
                  />
                  <select
                    name="availability"
                    value={editItem.availability}
                    onChange={handleEditChange}
                    className="border border-gray-300 p-2 rounded"
                  >
                    <option value={true}>Available</option>
                    <option value={false}>Unavailable</option>
                  </select>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    {loading ? "Updating..." : "Save"}
                  </button>
                </form>
              ) : (
                <div className="flex-grow">
                  <p>
                    <span className="font-semibold">Name:</span> {item.name}
                  </p>
                  <p>
                    <span className="font-semibold">Category:</span> {item.category}
                  </p>
                  <p>
                    <span className="font-semibold">Price:</span> ₹{item.price}
                  </p>
                  <p>
                    <span className="font-semibold">Availability:</span>{" "}
                    {item.availability ? "Yes" : "No"}
                  </p>
                </div>
              )}

              <div className="flex space-x-2">
                {editItem && editItem._id === item._id ? null : (
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    onClick={() => setEditItem(item)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => deleteMenuItem(item._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListItems;
