import express from "express";
import { generatePaymentToken, processPayment } from "../utils/paymentUtils.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Initiate payment and get payment URL/token
router.post("/initiate", requireSignIn, async (req, res) => {
  const { orderId, amount } = req.body;
  try {
    const paymentToken = await generatePaymentToken(orderId, amount);
    res.json({ paymentToken }); // Replace with actual payment URL or token
  } catch (error) {
    res.status(500).json({ message: "Failed to initiate payment" });
  }
});

// Confirm payment
router.post("/confirm", requireSignIn, async (req, res) => {
  const { token, paymentDetails } = req.body;
  try {
    await processPayment(token, paymentDetails);
    res.status(200).json({ message: "Payment successful" });
  } catch (error) {
    res.status(500).json({ message: "Payment failed" });
  }
});

export default router;
