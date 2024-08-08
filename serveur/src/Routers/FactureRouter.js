const express = require("express");
const route = express.Router();
const FactureController = require("../Controllers/FactureController");
 
route.post('/SaveFacture', FactureController.saveFacture);
route.get(
    "/getFacturebyIdStore/:id_magasin", FactureController.getFacturebyIdStore
  );
module.exports = route;
