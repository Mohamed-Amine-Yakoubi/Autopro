const express = require("express");
const route = express.Router();
const FactureController = require("../Controllers/FactureController");
 
route.post('/SaveFacture', FactureController.saveFacture);
route.get(
    "/getFacturebyIdStore/:id_magasin", FactureController.getFacturebyIdStore
  );
 
  route.get(
    "/getFacturebyIdCmd", FactureController.getFacturebyIdCmd
  );
  route.get(
    "/getFacturebyIdUser/:id_user", FactureController.getFacturebyIdUser
  );

  route.get(
    "/GetAllFacture", FactureController.GetAllFacture
  );
module.exports = route;
