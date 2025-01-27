import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineBars3 } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { FaCartPlus } from "react-icons/fa";
import Profile from "./Profile";

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <header className="inset-x-0 top-0 z-10 fixed">
        <nav className="bg-white flex w-full h-full items-center justify-between gap-1 px-4 py-2">
          <div className="flex items-center">
            <Link to="/" title="AuraUI" className="flex text-lg font-semibold">
              Food Delivery
            </Link>
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-900"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
            >
              {!expanded ? (
                <div className="flex items-center gap-5">
                  <FaCartPlus />
                  <HiOutlineBars3 className="w-7 h-7" />
                </div>
              ) : (
                <RxCross2 className="w-7 h-7" />
              )}
            </button>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-10">
            <Link
              to="/"
              className="text-base font-medium text-gray-900 transition-all duration-200 hover:text-indigo-600"
            >
              Features
            </Link>
            <Link
              to="/"
              className="text-base font-medium text-gray-900 transition-all duration-200 hover:text-indigo-600"
            >
              About
            </Link>
            <Link
              to="/"
              className="text-base font-medium text-gray-900 transition-all duration-200 hover:text-indigo-600"
            >
              Support
            </Link>
          </div>
          <div className="hidden md:flex md:items-center">
            <Profile />
          </div>
        </nav>

        {expanded && (
          <div>
            <nav className="px-1 pt-8 pb-4 z-50 bg-amber-50 rounded-lg ml-62">
              <div className="grid gap-y-6 pl-5">
                <Link
                  to="/"
                  className="text-base font-medium text-gray-900 transition-all duration-200 hover:text-indigo-600"
                >
                  Features
                </Link>
                <Link
                  to="/"
                  className="text-base font-medium text-gray-900 transition-all duration-200 hover:text-indigo-600"
                >
                  About
                </Link>
                
                <Profile isMobile={true} />
              </div>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
