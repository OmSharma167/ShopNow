// import React from 'react'
// import Layout from '../components/Layout/Layout'

import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const Pagenotfound = () => {
  return (
    <Layout title={"Go Back - Page Not Found"}>
      <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Oops! Page Not Found
        </h2>
        <Link
          to="/"
          className="mt-6 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
