const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: { type: String }, // Assuming every product needs an image
    title: { type: String },
    description: { type: String },
    category: { type: String },
    brand: { type: String },
    price: { type: Number },
    salePrice: { type: Number },
    totalStock: { type: Number, min: 0 }, // Default value of 0
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
