const express = require("express");
const route = express.Router();
const villeControllers=require("../Controllers/VilleControllers")
route.get(
    "/GetAllville", villeControllers.Get_AllVille
  );
module.exports = route;