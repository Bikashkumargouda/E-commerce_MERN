const express = require("express");
const router = express.Router();
const {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProducts,
  deleteProducts,
} = require("../../controllers/admin/product-controller");
const { upload } = require("../../helpers/cloudinary");

// Routes for managing products
router.post("/add", addProduct);
router.get("/all", fetchAllProducts);
router.put("/edit/:id", editProducts);
router.delete("/delete/:id", deleteProducts);
router.post("/uploadimg", upload.single("image"), handleImageUpload);

module.exports = router;
