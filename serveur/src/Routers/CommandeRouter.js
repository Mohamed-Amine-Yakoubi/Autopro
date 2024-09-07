const express = require("express");
const route = express.Router();
const CommandeController = require("../Controllers/CommandeController");

route.post("/add_Commande", CommandeController.add_Commande);
route.get("/Get_AllCommandeUsers", CommandeController.Get_AllCommandeUsers);
route.get("/Get_AllCommande/:id_magasin", CommandeController.Get_AllCommande);
route.get("/Get_AllMainCommande/:id_user", CommandeController.Get_AllMainCommande);
route.get("/getOneCommandeByIdUser/:id_user", CommandeController.getOneCommandeByIdUser);
route.get("/Get_MainCommande/:id_MainCmd", CommandeController.Get_MainCommande);
route.get("/getdetailsCommande/:id_MainCmd", CommandeController.getdetailsCommande);
route.get("/Get_AllCommandebydiMagasin/:id_MainCmd/:id_magasin", CommandeController.Get_AllCommandebydiMagasin);
route.put("/Update_commande/:id_MainCmd/:id_magasin", CommandeController.Update_commande);
route.post("/MailCommande", CommandeController.User_Mail);
route.delete("/DeleteCommande", CommandeController.DeleteCmmande);


module.exports = route;
