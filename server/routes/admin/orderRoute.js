const express = require("express");

const {
  getAllOrderOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} = require("../../controllers/admin/order-controller");

const router = express.Router();

// Routes for managing orders

router.get("/get", getAllOrderOfAllUsers);

router.get("/details/:id", getOrderDetailsForAdmin);

router.put("/update/:id", updateOrderStatus);

module.exports = router;
