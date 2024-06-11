const express = require("express");
const route = express.Router();
const MarqueControllers=require("../Controllers/MarqueController")
route.get(
    "/GetAllMarque", MarqueControllers.Get_AllMarque
  );

  route.post(
    "/AddMarque", MarqueControllers.add_Marque
  );
  route.get(
    "/GetMarqueById/:id_marque", MarqueControllers.Get_MarqueById
  );
module.exports = route;