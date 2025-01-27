import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="relative">
      <section className="relative bg-gray-900">
        <div className="absolute inset-0">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-white"></div>
        </div>

        <div className="relative mx-auto max-w-7xl lg:grid lg:grid-cols-2">
          <div className="flex justify-center items-center px-4 pb-16 bg-white pt-28 sm:px-6 lg:px-8 lg:pb-24 xl:pr-12">
            <div className="max-w-lg mx-auto lg:mx-0">
              <p className="text-5xl sm:text-6xl lg:text-7xl">🍕</p>
              <h1 className="mt-10 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                Delicious Food Delivered to Your Doorstep.
              </h1>
              <p className="mt-6 text-base font-normal leading-7 text-gray-500">
                Explore Link wide variety of cuisines from the best restaurants in
                your city. Order now and enjoy fast, reliable food delivery
                anytime.
              </p>
              <div className="relative inline-flex mt-10 group">
                <div className="absolute transition-all duration-1000 opacity-70 inset-0 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>
                <Link
                  to="/products"
                  className="inline-flex relative items-center justify-center w-full sm:w-auto px-8 py-3 sm:text-sm text-base sm:py-3.5 font-semibold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  Order Now
                </Link>
              </div>
            </div>
          </div>

          <div className="relative flex items-end px-4 py-16 bg-gray-900 sm:px-6 lg:pb-24 lg:px-8 xl:pl-12">
            <div className="absolute inset-0">
             
            </div>

            <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
              <p className="text-lg font-bold text-white">Our Top Picks</p>

              <div className="mt-6 space-y-5">
                <div className="overflow-hidden transition-all duration-200 transform bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:-translate-y-1">
                  <div className="px-4 py-5 sm:p-5">
                    <div className="flex items-start lg:items-center">

                      <div className="flex-1 ml-4 lg:ml-6">
                        <p className="text-xs font-medium text-gray-900 lg:text-sm">
                          <Link to="#" title="Pizza">
                            Italian
                          </Link>
                        </p>
                        <p className="mt-2 text-sm font-bold text-gray-900 lg:text-lg group-hover:text-gray-600">
                          <Link to="#" title="Pizza">
                            Cheesy Pepperoni Pizza
                          </Link>
                        </p>
                        <p className="mt-2 text-xs font-medium text-gray-500 lg:text-sm">
                          Starting at $12.99
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden transition-all duration-200 transform bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:-translate-y-1">
                  <div className="px-4 py-5 sm:p-5">
                    <div className="flex items-start lg:items-center">
                      
                      <div className="flex-1 ml-4 lg:ml-6">
                        <p className="text-xs font-medium text-gray-900 lg:text-sm">
                          <Link to="#" title="Burger">
                            American
                          </Link>
                        </p>
                        <p className="mt-2 text-sm font-bold text-gray-900 lg:text-lg group-hover:text-gray-600">
                          <Link to="#" title="Burger">
                            Classic Beef Burger
                          </Link>
                        </p>
                        <p className="mt-2 text-xs font-medium text-gray-500 lg:text-sm">
                          Starting at $9.99
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden transition-all duration-200 transform bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:-translate-y-1">
                  <div className="px-4 py-5 sm:p-5">
                    <div className="flex items-start lg:items-center">
                      <Link to="#" title="Sushi" className="shrink-0">
                        {/* <img
                          className="lg:h-24 w-14 h-14 lg:w-24 rounded-xl object-cover"
                          src="https://www.example.com/sushi.jpg"
                          alt="Sushi"
                        /> */}
                      </Link>

                      <div className="flex-1 ml-4 lg:ml-6">
                        <p className="text-xs font-medium text-gray-900 lg:text-sm">
                          <Link to="#" title="Sushi">
                            Japanese
                          </Link>
                        </p>
                        <p className="mt-2 text-sm font-bold text-gray-900 lg:text-lg group-hover:text-gray-600">
                          <Link to="#" title="Sushi">
                            Fresh Salmon Sushi
                          </Link>
                        </p>
                        <p className="mt-2 text-xs font-medium text-gray-500 lg:text-sm">
                          Starting at $15.99
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
