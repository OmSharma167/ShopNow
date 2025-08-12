import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact Us"}>
      <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8 p-6">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/3 bg-gray-800 p-4 rounded-lg text-white">
          <h1 className="text-center text-xl font-semibold mb-4">CONTACT US</h1>
          <p className="text-justify mb-4">
            Any query or information about products, feel free to call anytime.
            We are available 24x7.
          </p>
          <p className="flex items-center mb-3">
            <BiMailSend className="mr-2" /> : www.help@ecommerceapp.com
          </p>
          <p className="flex items-center mb-3">
            <BiPhoneCall className="mr-2" /> : 012-3456789
          </p>
          <p className="flex items-center">
            <BiSupport className="mr-2" /> : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
