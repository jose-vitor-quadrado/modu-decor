const express = require("express");
const AsyncHandler = require("express-async-handler");
const protect = require("../middleware/Auth");
const Order = require("../models/Order");

const orderRoute = express.Router();

orderRoute.post("/", protect, AsyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethods,
    shippingPrice,
    taxPrice,
    totalPrice,
    price
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items found!");
  }
  else {
    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethods,
      shippingPrice,
      taxPrice,
      totalPrice,
      price,
      user: req.user._id
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
}));

orderRoute.put(
  "/:id/payment",
  protect,
  AsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        updated_time: req.body.updated_time,
        email_address: req.body.email_address
      };
      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    }
    else {
      res.status(404);
      throw new Error("Order not found");
    }
  })
);

orderRoute.get("/", protect, AsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ _id: -1 });
  if (orders) {
    res.status(200).json(orders);
  }
  else {
    res.status(404);
    throw new Error("Orders not found");
  }
}));

orderRoute.get("/:id", protect, AsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "email");
  if (order) {
    res.status(200).json(order);
  }
  else {
    res.status(404);
    throw new Error("Order not found");
  }
}));

module.exports = orderRoute;