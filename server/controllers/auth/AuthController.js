const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("..//..//models/User");

// Register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User Already exists with the same email plase try again",
      });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User not found! Please register first.",
      });
    }
    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "Invalid password! please try again",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );
    // res.cookie("token", token, { httpOnly: true, secure: true }).json({
    //   success: true,
    //   message: "User Logged in successfully",
    //   user: {
    //     email: checkUser.email,
    //     role: checkUser.role,
    //     id: checkUser._id,
    //     userName: checkUser.userName,
    //   },
    // });
    res.status(200).json({
      success: true,
      message: "User Logged in successfully",
      token,
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// Logout

const logOutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "User Logged out successfully",
    user: null,
  });
};

// AuthMiddleware
// const authMiddleWare = async (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token)
//     return res.status(401).json({
//       success: false,
//       message: "No token, authorization denied",
//     });
//   try {
//     const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({
//       success: false,
//       message: "Token is not valid, authorization denied",
//     });
//   }
// };
// ===============================================

const authMiddleWare = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({
      success: false,
      message: "No token, authorization denied",
    });
  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      message: "Token is not valid, authorization denied",
    });
  }
};

// ===============================================

// const authMiddleWare = async (req, res, next) => {
//   try {
//     // Get the Authorization header
//     const authHeader = req.headers.authorization;

//     // Validate the header format
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         success: false,
//         message: "No token or invalid token format, authorization denied",
//       });
//     }

//     // Extract the token
//     const token = authHeader.split(" ")[1];

//     // Verify the token
//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET || "CLIENT_SECRET_KEY"
//     );

//     // Attach user data to the request
//     req.user = decoded;

//     // Proceed to the next middleware
//     next();
//   } catch (error) {
//     console.error("JWT verification error:", error.message);

//     // Handle specific JWT errors (optional)
//     let message = "Token is not valid, authorization denied";
//     if (error.name === "TokenExpiredError") {
//       message = "Token expired, please log in again";
//     } else if (error.name === "JsonWebTokenError") {
//       message = "Malformed token, authorization denied";
//     }

//     return res.status(401).json({
//       success: false,
//       message,
//     });
//   }
// };

module.exports = { registerUser, loginUser, logOutUser, authMiddleWare };
