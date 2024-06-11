const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Favoris = require("../Models/FavorisModel");
const Product = require("../Models/ProductModel");

require("dotenv").config();

// sub category

exports.AddFavrois = asyncHandler(async (req, res) => {
  try {
    const { id_prod, id_user } = req.body;

    const addFavrois = await Favoris.create({
      id_prod,
      id_user,
    });
    if (addFavrois) {
      res.status(201).json({
        message: " Favrois has been added successfully",
        data: addFavrois,
      });
    } else {
      res.status(404).json({
        message: "The  Favrois has not been added",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
//get sub category
exports.getFavorisByIdUser = asyncHandler(async (req, res) => {
    try {
      const { id_user  } = req.params;
      const FavroisByIdUser = await Favoris.findAll({ where: { id_user: id_user } });
      if ( FavroisByIdUser) {
        res.status(201).json(FavroisByIdUser);
      } else {
        res.status(404).json({ message: `No favoris found this ${id_user}` });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
//deleete favoris
exports.DeleteFavrois = asyncHandler(async (req, res) => {
  try {
    const { id_prod ,id_user } = req.params;
    const DeleteFavrois = await Favoris.destroy({ where: { id_prod: id_prod ,id_user: id_user  } });
    if (DeleteFavrois) {
      res.status(201).json(DeleteFavrois);
    } else {
      res.status(404).json({ message: `No favoris found this ${id_fav}` });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
//get sub category
 