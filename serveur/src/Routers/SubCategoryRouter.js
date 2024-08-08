const express = require("express");
const route = express.Router();
const SubCategoryControllers = require("../Controllers/SubCategoryController");
const upload = require("../Middleware/Multer");
 
 
route.post("/addSubCategory", upload.single("Image_subcat"),  SubCategoryControllers.CreatesubCategory);
route.get("/getSubcategory/:id_subcat", SubCategoryControllers.GetSubCategory);
route.get("/getSubcategorybyidCat/:id_cat", SubCategoryControllers.GetSubCategoryByIdCat);
route.get("/GetAllsubCategories", SubCategoryControllers.GetAllsubCategories);
 

module.exports = route;
