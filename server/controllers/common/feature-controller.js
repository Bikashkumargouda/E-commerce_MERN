const Feature = require("../../models/Feature");

const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;
    console.log(image, "image");

    const featureImages = new Feature({
      image,
    });

    await featureImages.save();
    res.status(201).json({
      success: true,
      data: featureImages,
      message: "Feature Image added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getFeatureImage = async (req, res) => {
  try {
    const images = await Feature.find({});
    res.status(200).json({
      success: true,
      data: images,
      message: "Feature Images fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = { addFeatureImage, getFeatureImage };
