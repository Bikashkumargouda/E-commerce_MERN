const express = require("express");

const {
  addFeatureImage,
  getFeatureImage,
} = require("../../controllers/common/feature-controller");

const router = express.Router();

// Routes for managing feature images

router.post("/add", addFeatureImage);

router.get("/get", getFeatureImage);

module.exports = router;
