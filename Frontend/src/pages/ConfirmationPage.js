// import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import Layout from "./../components/Layout/Layout";

// const ConfirmationPage = () => {
//   const { orderId } = useParams();
//   const navigate = useNavigate();

//   const handleBackToHome = () => {
//     navigate('/');
//   };

//   return (
//     <Layout>
//       <div className="container mx-auto p-4">
//         <div className="bg-white p-4 shadow-md rounded-md text-center">
//           <h1 className="text-2xl font-semibold mb-4">Order Confirmation</h1>
//           <p className="text-lg mb-4">Thank you for your purchase!</p>
//           <p className="text-gray-700 mb-4">
//             Your order has been successfully placed. Your order ID is:
//           </p>
//           <h2 className="text-xl font-bold mb-4">{orderId}</h2>
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//             onClick={handleBackToHome}
//           >
//             Back to Home
//           </button>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default ConfirmationPage;

import React from "react";
import Layout from "./../components/Layout/Layout";
import { useParams } from "react-router-dom";

const ConfirmationPage = () => {
  const { orderId } = useParams();

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Order Confirmation</h1>
        <div className="bg-white p-4 shadow-md rounded-md">
          <h4 className="text-lg font-semibold mb-2">
            Thank you for your order!
          </h4>
          <p>
            Your order ID is: <strong>{orderId}</strong>
          </p>
          <p>You will receive a confirmation email shortly.</p>
        </div>
      </div>
    </Layout>
  );
};

export default ConfirmationPage;
