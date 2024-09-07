 
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const Modele = require("../Models/ModeleCarModel");
require("dotenv").config();
const privatekey = process.env.PRIVATE_KEY;
 /**************add modele************* */
exports.Add_Modele = asyncHandler(async (req, res) => {
  try {
    const  {Libelle_modele,id_marque,annee_modele} = req.body;

    const add_Modele = await Modele.create({ Libelle_modele,id_marque,annee_modele });
    if (add_Modele) {
      res.status(201).json(add_Modele);
    } else {
      res.status(404).json({ message: "failed to add Modele" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

/**************Get all Store************* */
exports.Get_AllModele = asyncHandler(async (req, res) => {
  try {
    const Get_AllModele = await Modele.findAll({});
    if (Get_AllModele) {
      res.status(201).json(  Get_AllModele );
    } else {
      res.status(404).json({ message: "Modele have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
 
/**************Get modele by id************* */
exports.Get_ModeleById = asyncHandler(async (req, res) => {
  try {
    const{id_modele}=req.params;
    const ModeleById = await Modele.findByPk(id_modele);
    if (ModeleById) {
      res.status(201).json(  ModeleById );
    } else {
      res.status(404).json({ message: "Modele have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
/**************Get modele by id and year ************* */
exports.Get_ModeleByIdMarque = asyncHandler(async (req, res) => {
  try {
    const { id_marque } = req.params;
    const { annee_modele } = req.query; // Extract the year from query parameters

    // Define the where clause
    let whereClause = { id_marque: id_marque };
    
    // If the year is provided, add it to the where clause
    if ( annee_modele) {
      whereClause.annee_modele = annee_modele;
    }

    const ModeleByIdMarque = await Modele.findAll({
      where: whereClause,
    });

    if (ModeleByIdMarque && ModeleByIdMarque.length > 0) {
      res.status(200).json(ModeleByIdMarque);
    } else {
      res.status(404).json({ message: "Modele have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


/**************DeleteModele************* */
exports.DeleteModele = asyncHandler(async (req, res) => {
  try {
    const { id_modele } = req.body;
    const deletemodele = await Modele.destroy({ where: { id_modele: id_modele   } });
    if (deletemodele) {
      res.status(201).json(deletemodele);
    } else {
      res.status(404).json({ message: `No favoris found this ${id_modele}` });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});