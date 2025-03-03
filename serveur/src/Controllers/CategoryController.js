const CategoryModel = require("../Models/CategoryModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const SubCategory = require("../Models/SubCategoryModel");
require("dotenv").config();
const cloudinary = require("../Utils/Cloudinary");

/**************************** */
// Function to generate JWT token

const createToken = (payload) => {
  return jwt.sign({ id: payload }, privatekey, { expiresIn: "90d" });
};
exports.CreateCategories = asyncHandler(async (req, res) => {
  try {
    const Libelle_cat = req.body.Libelle_cat;
    const image = req.file; // Assuming you're using 'req.file' for single file upload

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(image.path, {
      resource_type: "auto",
    });

    const thumbnailUrl = result.secure_url;
    const category = await CategoryModel.create({
      Libelle_cat,
      Image_cat: thumbnailUrl,
    });
    if (category) {
      res.status(201).json({
        message: "Category has been added successfully",
        data: category,
      });
    } else {
      res.status(404).json({
        message: "The category has not been added",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

/****************get all categories*************** */
exports.GetAllCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await CategoryModel.findAll({});
    if (categories) {
      res.status(201).json(categories);
    } else {
      res.status(404).json({ message: "Your categories have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
/*************get specific category*************/
exports.GetCategory = asyncHandler(async (req, res) => {
  try {
    const { id_cat } = req.params;
    const category = await CategoryModel.findByPk(id_cat);
    if (category) {
      res.status(201).json(category);
    } else {
      res.status(404).json({ message: `No category found this ${id_cat}` });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

/*************update specific category*************/
exports.UpdateCategory = asyncHandler(async (req, res) => {
  try {
    const { id_cat } = req.params;
    const { Libelle_cat } = req.body;
    const updatefields = { Libelle_cat };
    const category = await CategoryModel.update(updatefields, {
      where: { id_cat: id_cat },
      new: true,
    });
    console.log(category);
    if (category) {
      res.status(201).json({
        message: "Category has been updated successfully",
        data: category,
      });
    } else {
      res.status(404).json({ message: "Failed to update the category" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
/*************delete specific category*************/
exports.DeleteCategory = asyncHandler(async (req, res) => {
  try {
    const { id_cat } = req.body;

    const category = await CategoryModel.destroy({
      where: { id_cat: id_cat },
      new: true,
    });
    if (category) {
      res.status(201).json(category);
    } else {
      res.status(400).json({ message: `No category found this ${id_cat}` });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
