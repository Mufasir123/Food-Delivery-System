import React from "react";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white md:flex md:items-center md:justify-between shadow rounded-lg p-4 md:p-6 xl:p-8 my-6 mx-4">
      <ul className="flex items-center flex-wrap mb-6 md:mb-0">
        <li>
          <Link
            to="#"
            className="text-sm font-normal text-gray-500 hover:underline mr-4 md:mr-6"
          >
            Terms and conditions
          </Link>
        </li>
        <li>
          <Link
            to="#"
            className="text-sm font-normal text-gray-500 hover:underline mr-4 md:mr-6"
          >
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link
            to="#"
            className="text-sm font-normal text-gray-500 hover:underline mr-4 md:mr-6"
          >
            Licensing
          </Link>
        </li>
        <li>
          <Link
            to="#"
            className="text-sm font-normal text-gray-500 hover:underline mr-4 md:mr-6"
          >
            Cookie Policy
          </Link>
        </li>
        <li>
          <Link
            to="#"
            className="text-sm font-normal text-gray-500 hover:underline"
          >
            Contact
          </Link>
        </li>
        <li>
        </li>
      </ul>
      <div className="flex sm:justify-center space-x-6">
        <Link to="#" className="text-gray-500 hover:text-gray-900">
        <FaInstagramSquare />
        </Link>
        <Link to="#" className="text-gray-500 hover:text-gray-900"> 
            <FaFacebook />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
