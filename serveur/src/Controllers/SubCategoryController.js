const CategoryModel = require("../Models/CategoryModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const SubCategory = require("../Models/SubCategoryModel");
require("dotenv").config();
const cloudinary = require("../Utils/Cloudinary");

 

// sub category

exports.CreatesubCategory = asyncHandler(async (req, res) => {
    try {
      const {Libelle_subcat ,id_cat} = req.body;
      const image = req.file; // Assuming you're using 'req.file' for single file upload
   
  
      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(image.path, {
        resource_type: "auto",
      });
  
      const thumbnailUrl = result.secure_url;
      const subcategory = await SubCategory.create({
        Libelle_subcat,id_cat,      Image_subcat: thumbnailUrl,
      });
      if (subcategory) {
        res.status(201).json({
          message: "Category has been added successfully",
          data: subcategory,
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



  
/****************get all subcategories*************** */
exports.GetAllsubCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await SubCategory.findAll({});
    if (categories) {
      res.status(201).json(categories);
    } else {
      res.status(404).json({ message: "Your categories have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
//get sub category
  exports.GetSubCategory = asyncHandler(async (req, res) => {
    try {
      const { id_subcat } = req.params;
      const category = await SubCategory.findByPk(id_subcat);
      if (category) {
        res.status(201).json(category);
      } else {
        res.status(404).json({ message: `No category found this ${id_subcat}` });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  //get sub category by id category
  exports.GetSubCategoryByIdCat = asyncHandler(async (req, res) => {
    try {
      const { id_cat } = req.params;
      const category = await SubCategory.findAll({where:{id_cat:id_cat}});
      if (category) {
        res.status(201).json(category);
      } else {
        res.status(404).json({ message: `No category found this ${id_cat}` });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });