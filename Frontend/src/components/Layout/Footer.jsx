import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-10">
      <div className="container mx-auto text-center">
        <h1 className="text-lg font-semibold">&copy; All Rights Reserved.</h1>
        <p className="mt-3">
          <Link to="/about" className="text-gray-400 hover:text-gray-300 mx-2">
            About
          </Link>
          <span className="text-gray-400"> | </span>
          <Link
            to="/contact"
            className="text-gray-400 hover:text-gray-300 mx-2"
          >
            Contact
          </Link>
          <span className="text-gray-400"> | </span>
          <Link to="/policy" className="text-gray-400 hover:text-gray-300 mx-2">
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
