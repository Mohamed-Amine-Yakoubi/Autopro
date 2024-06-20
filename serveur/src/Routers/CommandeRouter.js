const express = require("express");
const route = express.Router();
const CommandeController = require("../Controllers/CommandeController");

route.post("/add_Commande", CommandeController.add_Commande);
route.get("/Get_AllCommande/:id_magasin", CommandeController.Get_AllCommande);

module.exports = route;
