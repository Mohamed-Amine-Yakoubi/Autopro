 
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const Ville = require("../Models/VilleModel");
require("dotenv").config();
const privatekey = process.env.PRIVATE_KEY;
 
/**************Get all Store************* */
exports.Get_AllVille = asyncHandler(async (req, res) => {
  try {
    const Get_AllVille = await Ville.findAll({});
    if (Get_AllVille) {
      res.status(201).json(  Get_AllVille );
    } else {
      res.status(404).json({ message: "ville have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
 /**************Get all Store************* */
exports.Get_ville = asyncHandler(async (req, res) => {
  try {
    const {id_ville}=req.params;
    const get_ville = await Ville.findByPk(id_ville);
    if (get_ville) {
      res.status(201).json(  get_ville );
    } else {
      res.status(404).json({ message: "ville have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
 