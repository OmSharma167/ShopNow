import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";

import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

// User registration controller
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;

    // Validations
    if (!name) {
      return res.status(400).send({ error: "Name is required" });
    }
    if (!email) {
      return res.status(400).send({ error: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ error: "Password is required" });
    }
    if (!phone) {
      return res.status(400).send({ error: "Phone number is required" });
    }
    if (!address) {
      return res.status(400).send({ error: "Address is required" });
    }
    if (!answer) {
      return res.status(400).send({ error: "Answer is required" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "Already registered, please login",
      });
    }

    // Register user
    const hashedPassword = await hashPassword(password);
    const user = new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    });
    await user.save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

// User login controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    // Compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

// Forgot password controller
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    // Validation
    if (!email) {
      return res.status(400).send({ error: "Email is required" });
    }
    if (!answer) {
      return res.status(400).send({ error: "Answer is required" });
    }
    if (!newPassword) {
      return res.status(400).send({ error: "New password is required" });
    }

    // Check user
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong email or answer",
      });
    }

    // Update password
    const hashedPassword = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });

    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

// Test controller
export const testController = (req, res) => {
  try {
    res.status(200).send("Protected route");
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

// Update profile controller
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);

    // Validate password
    if (password && password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    const hashedPassword = password
      ? await hashPassword(password)
      : user.password;

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while updating profile",
      error,
    });
  }
};

// Get orders controller
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting orders",
      error,
    });
  }
};

// Get all orders controller
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting orders",
      error,
    });
  }
};

// Order status controller
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating order",
      error,
    });
  }
};

export const placeOrderController = async (req, res) => {
  try {
    const { products, address } = req.body;
    console.log("Received data:", req.body); // Log the received data

    if (!products || !products.length || !address) {
      return res.status(400).send({ error: "Missing or invalid fields" });
    }

    const newOrder = new Order({
      products,
      address,
      buyer: req.user._id,
    });

    await newOrder.save();

    res.status(201).send({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error placing order",
      error,
    });
  }
};
