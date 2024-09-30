require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const AuthRouter = require("./routes/auth/AuthRoutes");
const adminProductsRouter = require("./routes/admin/products-routs"); // Ensure correct file name here
const shopProductsRouter = require("./routes/shop/products-routes");
// const shopCartRouter = require("./routes/shop/cart-routes");
const cartRoutes = require("./routes/shop/cart-routes");
const shopAddressRoutes = require("./routes/shop/address-routes");
const shopOrderRoutes = require("./routes/shop/order-routes");
const adminOrderRoutes = require("./routes/admin/orderRoute");
const shopSearchRoutes = require("./routes/shop/search-routes");
const shopreviewRoutes = require("./routes/shop/review-routes");
const commonFeatureRoutes = require("./routes/common/feature-routes");

// Create a database connection
mongoose
  .connect(
    process.env.MONGO_URL
    // {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true, // These options are helpful for ensuring stable MongoDB connection
    // }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.error("MongoDB connection error:", error)); // Improved error handling

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(","); // Get allowed origins from environment variable

// CORS setup to allow frontend requests
app.use(
  cors({
    // origin: process.env.CLIENT_BASE_URL, // Make sure this matches your frontend address
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

// Middleware setup
app.use(cookieParser());
app.use(express.json()); // To parse incoming JSON requests

// Routes
app.use("/api/auth", AuthRouter);
app.use("/api/admin/products", adminProductsRouter); // Product routes for admin

// Shopping Product routes
app.use("/api/shop/products", shopProductsRouter); // Shopping cart routes
// app.use("/api/shop/cart", shopCartRouter);

// Shopping cart routes
app.use("/api/shop/cart", cartRoutes);

// Shopping Address routes
app.use("/api/shop/address", shopAddressRoutes); // Shopping address routes

// Shopping Order routes

app.use("/api/shop/order", shopOrderRoutes); // Shopping order routes

// Admin Order routes

app.use("/api/admin/orders", adminOrderRoutes); // Admin order routes

// Shopping Search routes

app.use("/api/shop/search", shopSearchRoutes); // Shopping search routes

// Shopping Review routes

app.use("/api/shop/review", shopreviewRoutes); // Shopping review routes

// Common feature routes

app.use("/api/common/feature", commonFeatureRoutes); // Common feature routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
