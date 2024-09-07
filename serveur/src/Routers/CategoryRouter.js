const express = require("express");
const route = express.Router();
const CategoryControllers = require("../Controllers/CategoryController");
const upload = require("../Middleware/Multer");
 
route.post("/addCategory",  upload.single("Image_cat"),  CategoryControllers.CreateCategories);
route.get("/getAllCategories", CategoryControllers.GetAllCategories);
route.get("/getcategory/:id_cat", CategoryControllers.GetCategory);
route.put("/updateCategory/:id_cat",  CategoryControllers.UpdateCategory);
route.delete("/deletecategory", CategoryControllers.DeleteCategory);
 
module.exports = route;
