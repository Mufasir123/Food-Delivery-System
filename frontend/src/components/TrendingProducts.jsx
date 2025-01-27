import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFoodList } from "../store/slices/foodSlice";
import { IoBagCheckSharp } from "react-icons/io5";
import { add } from "../store/slices/cartSlice";

const TrendingProducts = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.food);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/menu/items`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        dispatch(getFoodList(res.data.menuItems));
      } catch (error) {
        console.log(error);
      }
    };

    fetchFoodItems();
  }, [dispatch]);

  const addToCart = (product) => {
    dispatch(add(product));
  };

  const limitedProducts = data.slice(0,6)

  return (
    <div>
      {/* Title Section */}
      <div className="lg:ml-[20%] md:ml-[10%] p-10">
        <h1 className="font-bold text-4xl mb-4">Trending Products</h1>
      </div>
      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
        {limitedProducts?.map((product) => (
          <div
            key={product?._id}
            className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
          >
            <Link to="#">
              <img
                src={`${import.meta.env.VITE_SERVER_URL}/images/${product.image}`}
                alt="Product"
                className="h-80 w-72 object-cover rounded-t-xl"
              />
              <div className="px-4 py-3 w-72">
                <p className="text-lg font-bold text-black truncate block capitalize">
                  {product?.name}
                </p>
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold text-black cursor-auto ">
                      Price: ${product?.price}
                    </p>
                  </div>
                  <Link
                    to=""
                    className="ml-auto text-3xl"
                    onClick={() => addToCart(product)}
                  >
                    <IoBagCheckSharp />
                  </Link>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </section>

      <Link
        to="/products"
        className="text-xl font-medium text-blue-900 md:ml-[80%] lg:ml-[75%] cursor-pointer"
      >
        View All..
      </Link>
    </div>
  );
};

export default TrendingProducts;
