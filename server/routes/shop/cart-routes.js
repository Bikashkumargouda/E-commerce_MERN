const express = require("express");
const {
  addToCart,
  getCartItems,
  updateCartItemQuantity,
  deleteCartItem,
} = require("../../controllers/shop/cart-controller");
const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", getCartItems);
router.put("/update", updateCartItemQuantity);
router.delete("/delete/:userId/:productId", deleteCartItem);

module.exports = router;
