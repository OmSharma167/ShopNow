// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useCart } from '../context/cart';
// import { useAuth } from '../context/auth';
// import toast from 'react-hot-toast';
// import { Layout } from 'antd';
// import Layout from "./../components/Layout/Layout";

// const CheckoutPage = () => {
//   const [auth] = useAuth();
//   const [cart] = useCart();
//   const [address, setAddress] = useState('');
//   const [paymentMethod, setPaymentMethod] = useState('online');
//   const navigate = useNavigate();

//   const handlePlaceOrder = async () => {
//     try {
//       const { data } = await axios.post('/api/v1/order', {
//         cart,
//         address,
//         paymentMethod,
//       });

//       if (paymentMethod === 'online') {
//         // Redirect to payment gateway if online payment
//         // Assuming there's a route to handle payment integration
//         window.location.href = `/payment/${data.orderId}`;
//       } else {
//         // For offline payment, navigate directly to confirmation
//         toast.success('Order placed successfully!');
//         navigate(`/confirmation/${data.orderId}`);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error('Failed to place order.');
//     }
//   };

//   return (
//     <Layout>
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
//       <div className="bg-white p-4 shadow-md rounded-md">
//         <h4 className="text-lg font-semibold mb-2">Shipping Address</h4>
//         <input
//           type="text"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           placeholder="Enter your address"
//           className="w-full p-2 border rounded-md mb-4"
//         />
//         <h4 className="text-lg font-semibold mb-2">Payment Method</h4>
//         <select
//           value={paymentMethod}
//           onChange={(e) => setPaymentMethod(e.target.value)}
//           className="w-full p-2 border rounded-md mb-4"
//         >
//           <option value="online">Online Payment</option>
//           <option value="offline">Cash on Delivery</option>
//         </select>
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//           onClick={handlePlaceOrder}
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//     </Layout>
//   );
// };

// export default CheckoutPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import Layout from "../components/Layout/Layout";

const CheckoutPage = () => {
  const [auth] = useAuth();
  const [cart] = useCart();
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("online");
  const navigate = useNavigate();

  //   const handlePlaceOrder = async () => {
  //   try {
  //     const { data } = await axios.post('/api/v1/auth/place-order', {
  //       cart,
  //       address,
  //       paymentMethod,
  //     });

  //     if (data?.orderId) {
  //       if (paymentMethod === 'online') {
  //         // Redirect to payment gateway if online payment
  //         window.location.href = `/payment/${data.orderId}`;
  //       } else {
  //         // For offline payment, navigate directly to confirmation
  //         toast.success('Order placed successfully!');
  //         navigate(`/confirmation/${data.orderId}`);
  //       }
  //     } else {
  //       toast.error('Failed to get order ID.');
  //     }
  //   } catch (error) {
  //     console.error('Error placing order:', error);
  //     toast.error('Failed to place order.');
  //   }
  // };

  const handlePlaceOrder = async () => {
    try {
      const orderPayload = {
        products: cart.map((item) => item._id), // Extract product IDs from cart
        address: address, // address: userAddress, // Assuming userAddress contains the address string
      };
      console.log("Order Payload:", orderPayload);

      const { data } = await axios.post(
        "/api/v1/auth/place-order",
        orderPayload
      );

      if (data.success) {
        toast.success("Order placed successfully!");
        navigate(`/confirmation/${data.order._id}`);
      } else {
        toast.error("Failed to place order.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order.");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
        <div className="bg-white p-4 shadow-md rounded-md">
          <h4 className="text-lg font-semibold mb-2">Shipping Address</h4>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            className="w-full p-2 border rounded-md mb-4"
          />
          <h4 className="text-lg font-semibold mb-2">Payment Method</h4>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 border rounded-md mb-4"
          >
            <option value="online">Online Payment</option>
            <option value="offline">Cash on Delivery</option>
          </select>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
