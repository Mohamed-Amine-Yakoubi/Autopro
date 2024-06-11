const express = require("express");
const   Favoris   = require("../Controllers/FavorisController");
const route = express.Router();
 
route.post(
    "/AddFavoris",  Favoris.AddFavrois
  );

  route.get(
    "/getFavorisByIdUser/:id_user", Favoris.getFavorisByIdUser
  );
  route.delete(
    "/DeleteFavoris/:id_prod/:id_user", Favoris.DeleteFavrois
  );
module.exports = route;