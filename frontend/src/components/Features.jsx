import React from "react";
import { FaFingerprint, FaMoon } from "react-icons/fa6";
import { FiFilter } from "react-icons/fi";
import { RxLightningBolt } from "react-icons/rx";

const Features = () => {
  return (
    <section className="py-10 bg-white sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 text-center sm:grid-cols-2 gap-y-8 lg:grid-cols-4 sm:gap-12">
          <div className="flex flex-col items-center">
            <div className="h-20 w-20 bg-blue-100 flex items-center justify-center rounded-full">
              <FaFingerprint className="flex items-center justify-center w-8 h-8 mx-auto text-blue-600" />
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">
              Secure Payments
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Enjoy safe and encrypted transactions every time you order food.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="h-20 w-20 bg-orange-100 flex items-center justify-center rounded-full">
              <RxLightningBolt className="flex items-center justify-center w-8 h-8 mx-auto text-orange-600" />
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">
              Lightning-Fast Delivery
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Get your favorite meals delivered to your doorstep in no time.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="h-20 w-20 bg-green-100 flex items-center justify-center rounded-full">
              <FaMoon className="flex items-center justify-center w-8 h-8 mx-auto text-green-600" />
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">
              Day & Night Availability
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Order food anytime, whether it's midnight or midday.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="h-20 w-20 bg-red-100 flex items-center justify-center rounded-full">
              <FiFilter className="flex items-center justify-center w-8 h-8 mx-auto text-red-600" />
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">
              Easy Meal Filtering
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Quickly find meals based on your preferences and dietary needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
