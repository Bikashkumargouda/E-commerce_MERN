const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logOutUser,
  authMiddleWare,
} = require("..//..//controllers/auth/AuthController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logOutUser);

router.get("/checkauth", authMiddleWare, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "User authenticated successfully",
    user: user,
  });
});

module.exports = router;
