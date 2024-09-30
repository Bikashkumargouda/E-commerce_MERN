// const Cart = require("../../models/Cart");

// const Product = require("../../models/product");

// // Add item to cart
// exports.addToCart = async (req, res) => {
//   try {
//     const { userId, productId, quantity } = req.body;

//     if (!userId || !productId || quantity <= 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid request",
//       });
//     }
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     let cart = await Cart.findOne({ userId });
//     if (!cart) {
//       cart = new Cart({ userId, items: [] });
//     }

//     const findCurrentIndex = cart.items.findIndex(
//       (item) => item.productId.toString() === productId
//     );
//     if (findCurrentIndex == -1) {
//       cart.items.push({ productId, quantity });
//     } else {
//       cart.items[findCurrentIndex].quantity += quantity;
//     }

//     await cart.save();
//     res.status(200).json({
//       success: true,
//       data: cart,
//       // message: "Product added to cart",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };
// // Get cart items
// exports.getCartItems = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     if (!userId) {
//       return res.status(400).json({
//         success: false,
//         message: "User id is required",
//       });
//     }

//     const cart = await Cart.findOne({ userId }).populate({
//       path: "items.productId",
//       select: "image title price salePrice",
//       // model: "Product",
//     });
//     if (!cart) {
//       return res.status(404).json({
//         success: false,
//         message: "Cart not found",
//       });
//     }

//     const validItems = cart.items.filter(
//       (productItem) => productItem.productId
//     );

//     if (validItems.length < cart.items.length) {
//       cart.items = validItems;
//       await cart.save();
//     }

//     const populateCartItems = validItems.map((item) => ({
//       productId: item.productId._id,
//       quantity: item.quantity,
//       image: item.productId.image,
//       title: item.productId.title,
//       price: item.productId.price,
//       salePrice: item.productId.salePrice,
//       totalPrice: item.quantity * item.productId.salePrice,
//     }));
//     console.log(cart.items);
//     res.status(200).json({
//       success: true,
//       data: {
//         ...cart._doc,
//         items: populateCartItems,
//         // totalPrice: populateCartItems.reduce(
//         //   (total, item) => total + item.totalPrice,
//         //   0
//         // ),
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };
// // Update item quantity in cart
// exports.updateCartItemQuantity = async (req, res) => {
//   try {
//     const { userId, productId, quantity } = req.body;

//     if (!userId || !productId || quantity <= 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid request",
//       });
//     }
//     const cart = await Cart.findOne({ userId });
//     if (!cart) {
//       return res.status(404).json({
//         success: false,
//         message: "Cart not found",
//       });
//     }
//     const findCurrentIndex = cart.items.findIndex(
//       (item) => item.productId.toString() === productId
//     );
//     if (findCurrentIndex == -1) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found in cart",
//       });
//     }
//     cart.items[findCurrentIndex].quantity = quantity;
//     await cart.save();

//     await cart.populate({
//       path: "items.productId",
//       select: "image title price salePrice",
//       // model: "Product",
//     });
//     const populateCartItems = cart.items.map((item) => ({
//       productId: item.productId ? item.productId._id : null,
//       quantity: item.quantity,
//       image: item.productId ? item.productId.image : null,
//       title: item.productId ? item.productId.title : "Product bot found",
//       price: item.productId ? item.productId.price : 0,
//       salePrice: item.productId ? item.productId.salePrice : 0,
//       totalPrice: item.productId ? item.quantity * item.productId.salePrice : 0,
//     }));
//     res.status(200).json({
//       success: true,
//       data: {
//         ...cart._doc,
//         items: populateCartItems,
//         // totalPrice: populateCartItems.reduce(
//         //   (total, item) => total + item.totalPrice,
//         //   0
//         // ),
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };
// // Delete item from cart
// exports.deleteCartItem = async (req, res) => {
//   // const { userId, productId } = req.params;
//   // try {
//   //   const cart = await Cart.findOne({ userId });
//   //   if (!cart) return res.status(404).json({ message: "Cart not found" });
//   //   cart.items = cart.items.filter((item) => item.productId !== productId);
//   //   await cart.save();
//   //   res.status(200).json({ data: cart });
//   // } catch (error) {
//   //   res.status(500).json({ message: error.message });
//   // }
//   try {
//     const { userId, productId } = req.params;
//     if (!userId || !productId) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid request",
//       });
//     }
//     const cart = await Cart.findOne({ userId }).populate({
//       path: "items.productId",
//       select: "image title price salePrice",
//       // model: "Product",
//     });
//     if (!cart) {
//       return res.status(404).json({
//         success: false,
//         message: "Cart not found",
//       });
//     }
//     cart.items = cart.items.filter(
//       (item) => item.productId._id.toString() !== productId
//     );
//     await cart.save();
//     await Cart.populate({
//       path: "items.productId",
//       select: "image title price salePrice",
//       // model: "Product",
//     });
//     const populateCartItems = cart.items.map((item) => ({
//       productId: item.productId ? item.productId._id : null,
//       quantity: item.quantity,
//       image: item.productId ? item.productId.image : null,
//       title: item.productId ? item.productId.title : "Product bot found",
//       price: item.productId ? item.productId.price : null,
//       salePrice: item.productId ? item.productId.salePrice : null,
//       totalPrice: item.quantity * item.productId.salePrice,
//     }));
//     res.status(200).json({
//       success: true,
//       data: {
//         ...cart._doc,
//         items: populateCartItems,
//         // totalPrice: populateCartItems.reduce(
//         //   (total, item) => total + item.totalPrice,
//         //   0
//         // ),
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };

// =====================================================================

const Cart = require("../../models/Cart");
const Product = require("../../models/product");

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const findCurrentIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (findCurrentIndex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[findCurrentIndex].quantity += quantity;
    }

    await cart.save();
    res.status(200).json({
      success: true,
      data: cart,
      message: "Product added to cart",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get cart items
exports.getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const validItems = cart.items.filter((item) => item.productId);

    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      totalPrice: item.quantity * item.productId.salePrice,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update item quantity in cart
exports.updateCartItemQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Check for missing or invalid parameters
    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
      });
    }

    // Find the cart for the user
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Find the index of the product in the cart items
    const findCurrentIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (findCurrentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    // Update the quantity of the product in the cart
    cart.items[findCurrentIndex].quantity = quantity;
    await cart.save();

    // Populate product details in the cart
    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    // Prepare the response with populated cart items
    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      quantity: item.quantity,
      image: item.productId ? item.productId.image : "default_image.png",
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : 0,
      salePrice: item.productId ? item.productId.salePrice : 0,
      totalPrice: item.productId ? item.quantity * item.productId.salePrice : 0,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete item from cart
exports.deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );
    await cart.save();

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      quantity: item.quantity,
      image: item.productId ? item.productId.image : "default_image.png",
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : 0,
      salePrice: item.productId ? item.productId.salePrice : 0,
      totalPrice: item.productId ? item.quantity * item.productId.salePrice : 0,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
