const express = require("express");
const route = express.Router();
const villeControllers=require("../Controllers/VilleControllers")
route.get(
    "/GetAllville", villeControllers.Get_AllVille
  );
  route.get(
    "/Getville/:id_ville", villeControllers.Get_ville
  );
module.exports = route;