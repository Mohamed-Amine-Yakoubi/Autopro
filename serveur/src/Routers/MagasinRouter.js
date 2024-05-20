const express = require("express");
const route = express.Router();
const MagasinControllers = require("../Controllers/MagasinController");
 
route.post("/addStore",   MagasinControllers.CreateStore);
route.get("/getAllStore", MagasinControllers.Get_AllStore);
route.get("/getStoreByID/:id_magasin", MagasinControllers.Get_spec_Store);
route.get("/getStoreByUserID/:id_proprietaire", MagasinControllers.Get_spec_StoreByIdUser);
route.put("/updateStore/:id_magasin",  MagasinControllers.Update_spec_Store);
route.delete("/deleteStore/:id_magasin", MagasinControllers.Delete_spec_Store);
route.post("/SearchStore", MagasinControllers.Search_Store);
module.exports = route;
