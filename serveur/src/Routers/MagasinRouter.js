const express = require("express");
const route = express.Router();
const MagasinControllers = require("../Controllers/MagasinController");
const upload = require("../Middleware/Multer");
route.post("/addStore",  upload.single("Logo_magasin"), MagasinControllers.CreateStore);
route.get("/getAllStore", MagasinControllers.Get_AllStore);
route.get("/getStoreByID/:id_magasin", MagasinControllers.Get_spec_Store);
route.get("/getStoreByUserID/:id_proprietaire", MagasinControllers.Get_spec_StoreByIdUser);
route.put("/updateStore/:id_magasin", upload.single("Logo_magasin"),  MagasinControllers.Update_spec_Store);
route.delete("/deleteStore/:id_magasin", MagasinControllers.Delete_spec_Store);
route.post("/SearchStore", MagasinControllers.Search_Store);
route.post("/MailStore", MagasinControllers.User_Mail);

module.exports = route;
