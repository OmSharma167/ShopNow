// // routes/orderRoutes.js
// import express from "express";
// import { placeOrderController, getOrdersController, getAllOrdersController, orderStatusController } from "../controllers/orderController.js";
// import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

// const router = express.Router();

// // Place a new order
// router.post("/place-order", requireSignIn, placeOrderController);

// // Get user orders
// router.get("/orders", requireSignIn, getOrdersController);

// // Get all orders (admin)
// router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// // Update order status (admin)
// router.put("/order-status/:orderId", requireSignIn, isAdmin, orderStatusController);

// export default router;

import express from "express";
import {
  placeOrderController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from "../controllers/orderController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Place a new order
router.post("/place-order", requireSignIn, placeOrderController);

// Get user orders
router.get("/orders", requireSignIn, getOrdersController);

// Get all orders (admin)
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// Update order status (admin)
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
