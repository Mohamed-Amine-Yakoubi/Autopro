const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const Marque = require("../Models/MarqueModel");
require("dotenv").config();
const privatekey = process.env.PRIVATE_KEY;

/**************Get all Marque************* */
exports.Get_AllMarque = asyncHandler(async (req, res) => {
  try {
    const Get_AllMarque = await Marque.findAll({});
    if (Get_AllMarque) {
      res.status(201).json(Get_AllMarque);
    } else {
      res.status(404).json({ message: "Marque have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

/**************add marque************* */
exports.add_Marque = asyncHandler(async (req, res) => {
  try {
    const Libelle_marque = req.body.Libelle_marque;

    const add_Marque = await Marque.create({ Libelle_marque });
    if (add_Marque) {
      res.status(201).json(add_Marque);
    } else {
      res.status(404).json({ message: "failed to add marque" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

/**************Get_MarqueById************* */
exports.Get_MarqueById = asyncHandler(async (req, res) => {
  try {
    const{id_marque}=req.params;
    const MarqueById = await Marque.findByPk(id_marque);
    if (MarqueById) {
      res.status(201).json(  MarqueById );
    } else {
      res.status(404).json({ message: "Modele have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});