const express = require("express");
const route = express.Router();
const CategoryControllers = require("../Controllers/CategoryController");
 
route.post("/addCategory",  CategoryControllers.CreateCategories);
route.get("/getAllCategories", CategoryControllers.GetAllCategories);
route.get("/getcategory/:id_cat", CategoryControllers.GetCategory);
route.put("/updateCategory/:id_cat",  CategoryControllers.UpdateCategory);
route.delete("/deletecategory/:id_cat", CategoryControllers.DeleteCategory);

module.exports = route;
