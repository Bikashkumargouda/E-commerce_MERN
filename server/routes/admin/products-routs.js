// const express = require("express");
// const router = express.Router();
// const {
//   handleImageUpload,
//   addProduct,
//   fetchAllProducts,
//   editProducts,
//   deleteProducts,
// } = require("../../controllers/admin/product-controller");
// const { upload } = require("../../helpers/cloudinary");

// // Routes for managing products
// router.post("/add", addProduct);
// router.get("/all", fetchAllProducts);
// router.put("/edit/:id", editProducts);
// router.delete("/delete/:id", deleteProducts);
// router.post("/uploadimg", upload.single("image"), handleImageUpload);

// module.exports = router;
// ==================================================================================================
const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProducts,
  deleteProducts,
} = require("../../controllers/admin/product-controller");

const storage = multer.memoryStorage(); // Configure storage (memory storage for Cloudinary)
const upload = multer({ storage: storage }); // Create the multer middleware

// Routes for managing products
router.post("/add", addProduct);
router.get("/all", fetchAllProducts);
router.put("/edit/:id", editProducts);
router.delete("/delete/:id", deleteProducts);
router.post("/uploadimg", upload.single("image"), handleImageUpload); // Use the multer middleware

module.exports = router;
