const express = require("express");
const route = express.Router();
const MotorisationController=require("../Controllers/MotorisationController");
route.post(
  "/AddMotor", MotorisationController.Add_Motor
);
route.get(
    "/GetAllMotors", MotorisationController.Get_AllMotors
  );
  route.get(
    "/Get_SpecMotorsById/:id_motor", MotorisationController.Get_SpecMotorsById
  );
  route.get(
    "/Get_SpecMotorsByIdModel/:id_modele", MotorisationController.Get_SpecMotorsByIdModel
  );
module.exports = route;