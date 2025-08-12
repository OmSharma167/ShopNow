import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Ensure 'Product' is the correct model name
      },
    ],
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
    },
    paymentMethod: {
      type: String,
      enum: ["Online", "Offline"],
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Completed", "Failed"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
