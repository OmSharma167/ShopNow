import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
  const { orderId } = useParams();

  useEffect(() => {
    const initiatePayment = async () => {
      try {
        const { data } = await axios.post(`/api/v1/payment/initiate`, {
          orderId,
        });
        // Redirect to payment gateway with data from server
        window.location.href = data.paymentUrl;
      } catch (error) {
        console.log(error);
      }
    };

    initiatePayment();
  }, [orderId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Processing Payment</h1>
      <p>Please wait while we redirect you to the payment gateway...</p>
    </div>
  );
};

export default PaymentPage;
