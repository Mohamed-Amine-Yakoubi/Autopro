const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const Motorisation = require("../Models/MotorisationModel");
require("dotenv").config();
const privatekey = process.env.PRIVATE_KEY;

/**************add Mostor n************* */
exports.Add_Motor = asyncHandler(async (req, res) => {
  try {
    const { Libelle_motor, id_modele } = req.body;

    const add_Motor = await Motorisation.create({ Libelle_motor, id_modele });
    if (add_Motor) {
      res.status(201).json(add_Motor);
    } else {
      res.status(404).json({ message: "failed to add Motor" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

/**************Get all Mtors************* */
exports.Get_AllMotors = asyncHandler(async (req, res) => {
  try {
    const Get_allMotors = await Motorisation.findAll({});
    if (Get_allMotors) {
      res.status(201).json(Get_allMotors);
    } else {
      res.status(404).json({ message: "Motorisation have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

/**************Get_SpecMotorsById************* */
exports.Get_SpecMotorsById = asyncHandler(async (req, res) => {
  try {
    const { id_motor } = req.params;
    const  SpecMotorsById = await Motorisation.findByPk(id_motor  );
    if ( SpecMotorsById) {
      res.status(201).json( SpecMotorsById);
    } else {
      res.status(404).json({ message: "Motorisation have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

/**************Get_SpecMotorsByIdModel************* */
exports.Get_SpecMotorsByIdModel = asyncHandler(async (req, res) => {
  try {
    const { id_modele } = req.params;
    const MotorsByIdModel = await Motorisation.findAll({
      where: { id_modele: id_modele },
    });
    if (MotorsByIdModel) {
      res.status(201).json(MotorsByIdModel);
    } else {
      res.status(404).json({ message: "Motorisation have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
