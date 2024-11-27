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
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((error) => console.error("MongoDB connection error:", error)); // Improved error handling

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5174", // Local frontend
  "https://e-commerce-mern-client-side.onrender.com", // Deployed frontend
];
// CORS setup to allow frontend requests
// app.use(
//   cors({
//     origin: [process.env.CLIENT_BASE_URL],
//     methods: ["GET", "POST", "DELETE", "PUT"],
//     allowedHeaders: [
//       "Content-Type",
//       "Authorization",
//       "Cache-Control",
//       "Expires",
//       "Pragma",
//     ],
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
