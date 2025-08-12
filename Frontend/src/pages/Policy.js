import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8 p-6">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/3">
          <p className="mb-4 text-gray-700">add privacy policy</p>
          <p className="mb-4 text-gray-700">add privacy policy</p>
          <p className="mb-4 text-gray-700">add privacy policy</p>
          <p className="mb-4 text-gray-700">add privacy policy</p>
          <p className="mb-4 text-gray-700">add privacy policy</p>
          <p className="mb-4 text-gray-700">add privacy policy</p>
          <p className="mb-4 text-gray-700">add privacy policy</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
