// src/components/MenuForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MenuForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    availability: true,
    image: null,
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // FormData to handle file uploads
    const form = new FormData();
    form.append("name", formData.name);
    form.append("category", formData.category);
    form.append("price", formData.price);
    form.append("availability", formData.availability);
    form.append("image", formData.image);

    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/menu/items`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Menu item created successfully!");
      toast.success(response.data.success)
    } catch (error) {
      setError(
        error.response?.data?.error || "Failed to create menu item. Please try again."
      );
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md mt-20">
      <h2 className="text-xl font-bold mb-4">Create Menu Item</h2>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
            placeholder="Enter the menu item name"
            required
          />
        </div>
        <div>
  <label className="block text-sm font-medium mb-2">Category</label>
  <div className="flex space-x-4">
    {["Drinks", "Desserts", "Main Course", "Snacks"].map((category) => (
      <label
        key={category}
        className="flex items-center space-x-2 cursor-pointer"
      >
        <input
          type="radio"
          name="category"
          value={category}
          checked={formData.category === category}
          onChange={handleInputChange}
          className="form-radio h-4 w-4 text-blue-600"
        />
        <span className="text-sm">{category}</span>
      </label>
    ))}
  </div>
</div>

        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
            placeholder="Enter the price (e.g., 100)"
            required
          />
        </div>
        <div className="flex items-center">
          <label className="text-sm font-medium mr-2" htmlFor="availability">
            Available
          </label>
          <input
            type="checkbox"
            id="availability"
            name="availability"
            checked={formData.availability}
            onChange={handleInputChange}
            className="h-5 w-5 text-blue-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="image">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Create Menu Item
        </button>
      </form>
    </div>
  );
};

export default MenuForm;
