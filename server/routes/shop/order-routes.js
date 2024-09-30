const express = require("express");

const {
  createOrder,
  capturePayment,
  getAllOrderByUser,
  getOrderDetails,
} = require("../../controllers/shop/order-controller");

const router = express.Router();

// Routes for managing orders

router.post("/create", createOrder);

router.post("/capture", capturePayment);

router.get("/list/:userId", getAllOrderByUser);

router.get("/details/:Id", getOrderDetails);

module.exports = router;
