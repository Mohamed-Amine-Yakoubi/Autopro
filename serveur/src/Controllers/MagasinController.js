const MagasinModel = require("../Models/MagasinModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
require("dotenv").config();
const privatekey = process.env.PRIVATE_KEY;
const cloudinary = require("../Utils/Cloudinary");

exports.CreateStore = asyncHandler(async (req, res) => {
  try {
    const {
      Libelle_magasin,
      Email_magasin,
      Adresse_magasin,
      Telephone_magasin,
      Description_magasin,
      id_proprietaire,
      id_ville,
      Lien_facebook,
      Lien_instagram,
      Lien_linkedin,
      Lien_siteWeb,
    } = req.body;

    const image = req.file; // Assuming you're using 'req.file' for single file upload

    if (!image) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(image.path, {
      resource_type: "auto",
    });

    const thumbnailUrl = result.secure_url;

    // Create the store with the image URL
    const Magasin = await MagasinModel.create({
      Libelle_magasin,
      Email_magasin,
      Adresse_magasin,
      Telephone_magasin,
      Description_magasin,
      Logo_magasin: thumbnailUrl, // Use the single image URL
      id_proprietaire,
      id_ville,
      Lien_facebook,
      Lien_instagram,
      Lien_linkedin,
      Lien_siteWeb,
    });

    if (Magasin) {
      res.status(201).json({
        message: "Store has been added successfully",
        data: Magasin,
      });
    } else {
      res.status(404).json({
        message: "Store has not been added",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
//Get all Store
exports.Get_AllStore = asyncHandler(async (req, res) => {
  try {
    const get_allstore = await MagasinModel.findAll();
    if (get_allstore) {
      res.status(201).json(get_allstore);
    } else {
      res.status(404).json({ message: "your Magasin have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// /Get specific store by id user
exports.Get_spec_StoreByIdUser = asyncHandler(async (req, res) => {
  try {
    const { id_proprietaire } = req.params;
    const storebyiduser = await MagasinModel.findAll({
      where: { id_proprietaire: id_proprietaire },
    });
    if (storebyiduser.length > 0) {
      res.status(201).json(storebyiduser);
    } else {
      res.status(400).json({ message: "magasin have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// /Get specific store /
exports.Get_spec_Store = asyncHandler(async (req, res) => {
  try {
    const { id_magasin } = req.params;
    const get_spec_store = await MagasinModel.findByPk(id_magasin);
    if (get_spec_store) {
      res.status(201).json({
        message: "store have been successfully found",
        data: get_spec_store,
      });
    } else {
      res.status(404).json({ message: "magasin have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// /Update specific store /
exports.Update_spec_Store = asyncHandler(async (req, res) => {
  try {
    const { id_magasin } = req.params;

    const {
      Libelle_magasin,
      Adresse_magasin,
      Telephone_magasin,
      Description_magasin,
      Logo_magasin,
      Ouverture_magasin,
      Fermeture_magasin,
      isActive,
    } = req.body;

    const updateFields = {
      Libelle_magasin,
      Adresse_magasin,
      Telephone_magasin,
      Description_magasin,
      Logo_magasin,
      Ouverture_magasin,
      Fermeture_magasin,
      isActive,
    };

    const updatedStore = await MagasinModel.update(updateFields, {
      where: { id_magasin: id_magasin },
      new: true,
    });

    if (updatedStore) {
      res.status(201).json({
        message: "store has been successfully updated",
        data: updatedStore,
      });
    } else {
      res.status(404).json({ message: `store with ID ${id_prod} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//Delete specific magasin
exports.Delete_spec_Store = asyncHandler(async (req, res) => {
  try {
    const { id_magasin } = req.params;

    const delete_spec_store = await MagasinModel.destroy({
      where: {
        id_magasin: id_magasin,
      },
    });
    if (delete_spec_store) {
      res.status(201).json({
        message: "store have been successfully deleted",
        data: delete_spec_magasin,
      });
    } else {
      res.status(400).json({ message: "store have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
//search store
exports.Search_Store = asyncHandler(async (req, res) => {
  try {
    const { keyword } = req.query;

    const searchCriteria = {
      [Op.or]: [{ Libelle_magasin: { [Op.iLike]: `%${keyword}%` } }],
    };

    const store = await MagasinModel.findAll({
      where: searchCriteria,
      attributes: [
        "Libelle_magasin",
        "Adresse_magasin",
        "Telephone_magasin",
        "Description_magasin",
        "Logo_magasin",
        "Ouverture_magasin",
        "Fermeture_magasin",
        "id_proprietaire",
      ],
    });
    if (store.length > 0) {
      res
        .status(201)
        .json({ message: "store have been successfully find", store });
    } else {
      res.status(400).json({ message: "store have not been found " });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
