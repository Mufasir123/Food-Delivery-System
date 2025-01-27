import React from "react";
import { IoBagCheckSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { add } from "../store/slices/cartSlice";

const Products = () => {
  const dispatch = useDispatch()
  const { data } = useSelector((state) => state.food);

  const addToCart = (product) => {
    dispatch(add(product));
  };

  return (
    <div>
      <div className="lg:ml-[20%] md:ml-[10%] mt-20 p-5">
        <h1 className="font-bold text-4xl mb-4">All Items</h1>
      </div>
      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
        {data?.map((product) => (
          <div
            key={product?._id}
            className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
          >
            <Link to="#">
              <img
                src={`${import.meta.env.VITE_SERVER_URL}/${product.image}`}
                alt="Product"
                className="h-80 w-72 object-cover rounded-t-xl"
              />
              <div className="px-4 py-3 w-72">
                <p className="text-lg font-bold text-black truncate block capitalize">
                  {product?.name}
                </p>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-black cursor-auto my-3">
                    ${product?.price}
                  </p>
                  <del></del>
                  <div className="ml-auto">
                    <div className="flex flex-col"></div>
                    <Link
                      to=""
                      className="ml-auto text-3xl"
                      onClick={() => addToCart(product)}
                    >
                      <IoBagCheckSharp />
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Products;
