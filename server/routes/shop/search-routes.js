const express = require("express");

const { searchProducts } = require("../../controllers/shop/search-controller");

const router = express.Router();

// Routes for managing products

router.get("/:keyword", searchProducts);


module.exports = router;
