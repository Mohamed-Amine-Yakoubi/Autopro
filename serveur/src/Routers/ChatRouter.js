const express = require("express");
const   Chat   = require("../Controllers/Chat");
const route = express.Router();
 
 

  route.get(
    "/GetMsgByIdUser/:Expediteur",Chat.GetMsgByIdUser
  );
  route.get('/GetDestination/:destinataire/:Expediteur', Chat.GetDestination);
  route.get('/conversation/:Expediteur/:destinataire', Chat.conversation);
 
module.exports = route;