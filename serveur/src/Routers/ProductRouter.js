const express = require("express");
const route = express.Router();
const ProductControllers = require("../Controllers/ProductController");
const AuthMiddlware = require("../Middleware/AuthMiddleware");
const upload = require("../Middleware/Multer");
route.post(
  "/AddProducts",
  // AuthMiddlware.Protect,
  // AuthMiddlware.isSupplier,
  upload.array("Image_prod", 5),
  ProductControllers.Create_Product
);
route.get("/GetAllProducts", ProductControllers.Get_AllProducts);
route.get(
  "/get_specProductByCategory/:id_cat",
  ProductControllers.Get_Category_Products
);
route.get(
  "/Get_spec_ProductByIdUser/:createdBy",
  ProductControllers.Get_spec_ProductByIdUser
);

route.get(
  "/Get_spec_ProductByIdStore/:id_magasin",
  ProductControllers.Get_spec_ProductByIdStore
);

route.get("/get_specProduct/:id_prod", ProductControllers.Get_spec_Product);

route.put(
  "/UpdateProduct/:id_prod",
  // AuthMiddlware.Protect,
  upload.array("Image_prod", 5),
  ProductControllers.Update_spec_Product
);
route.delete(
  "/DeleteProduct/:id_prod",
  // AuthMiddlware.Protect,
  ProductControllers.Delete_spec_Product
);
route.delete(
  "/DeleteAllProduct",
  // AuthMiddlware.Protect,
  ProductControllers.Delete_All_Product
);
route.post("/SearchProduct", ProductControllers.Search_product);
route.post(
  "/get_specProductByVille/:id_ville",
  ProductControllers.Get_spec_ProductByVille
);

//Get_AllMatter
route.get("/Get_AllMatter", ProductControllers.Get_AllMatter);

//Get_matter by id
route.get("/Get_MatterById/:id_mat", ProductControllers.Get_MatterByid);

module.exports = route;
