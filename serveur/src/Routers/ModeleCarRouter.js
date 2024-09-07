const express = require("express");
const route = express.Router();
const ModeleControllers = require("../Controllers/ModeleController");

route.post("/AddModele", ModeleControllers.Add_Modele);
route.get("/GetAllModele", ModeleControllers.Get_AllModele);
route.get("/Get_ModeleById/:id_modele", ModeleControllers.Get_ModeleById);
route.get(
  "/Get_ModeleByIdMarque/:id_marque",
  ModeleControllers.Get_ModeleByIdMarque
);
route.delete(
  "/DeleteModele", ModeleControllers.DeleteModele
);
module.exports = route;
