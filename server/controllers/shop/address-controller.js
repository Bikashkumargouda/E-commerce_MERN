const Address = require("../../models/Address");

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pinCode, phone, notes } = req.body;
    console.log("Request body:", req.body);

    if (!userId || !address || !city || !pinCode || !phone || !notes) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided.",
      });
    }
    const newlyCreatedAddress = new Address({
      userId,
      address,
      city,
      pinCode,
      phone,
      notes,
    });

    await newlyCreatedAddress.save();

    res.status(201).json({
      success: true,
      message: "Address added successfully.",
      data: newlyCreatedAddress,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }
    const addressList = await Address.find({ userId });

    res.status(200).json({
      success: true,
      message: "Addresses fetched successfully.",
      data: addressList,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: " User and address id is required   ",
      });
    }
    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formData,
      { new: true }
    );
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Address updated successfully.",
      data: address,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and address id is required",
      });
    }
    const address = await Address.findOneAndDelete({
      _id: addressId,
      userId,
    });
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Address deleted successfully.",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = { addAddress, fetchAllAddress, editAddress, deleteAddress };

// ================================================================================================================