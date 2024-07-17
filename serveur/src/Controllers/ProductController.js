const ProductModel = require("../Models/ProductModel");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../Utils/Cloudinary");
const Ville = require("../Models/VilleModel");
const Magasin = require("../Models/MagasinModel");
const Matiere = require("../Models/MatiereModel");
require("dotenv").config();
const privatekey = process.env.PRIVATE_KEY;

// Function to generate JWT token
const createToken = (payload) => {
  return jwt.sign({ id: payload }, privatekey, { expiresIn: "90d" });
};
//Create products/
exports.Create_Product = asyncHandler(async (req, res) => {
  try {
    const {
      Libelle_prod,
      Caracteristiques_prod,
      prix_prod,
      Stock_prod,
      Reference_prod,
      id_mat,
      Hauteur,
      Largeur,
      Epaisseur,
      Diametre,
      Longueur,
      id_magasin,
      id_marque,
      id_modele,
      id_motor,
      id_subcat,
      id_cat,
      createdBy,
    } = req.body;
    // Get the file path from the multer upload

    const images = req.files;
    const imagesUrls = [];
    let thumbnailUrl;

    // Loop through each image to upload to Cloudinary
    for (const image of images) {
      const result = await cloudinary.uploader.upload(image.path, {
        resource_type: "auto",
      });

      // Check if this is the first image, if so, set it as the thumbnail
      if (!thumbnailUrl) {
        thumbnailUrl = result.secure_url;
      }

      imagesUrls.push(result.secure_url);
    }
    const imageUrlsString = imagesUrls.join(",");
    const Products = await ProductModel.create({
      Libelle_prod,
      Caracteristiques_prod,
      prix_prod,
      Stock_prod,
      Reference_prod,
      id_magasin,
      id_marque,
      id_modele,
      id_motor,
      id_cat,
      id_mat,
      Hauteur: Hauteur || null,
      Largeur: Largeur || null,
      Epaisseur: Epaisseur || null,
      Diametre: Diametre || null,
      Longueur: Longueur || null,
      id_subcat,
      createdBy,
      Image_thumbnail: thumbnailUrl,
      Image_prod: imageUrlsString,
    });

    if (Products) {
      res.status(201).json({
        message: "Product has been added successfully",
        data: Products,
      });
    } else {
      res.status(404).json({
        message: "product has not been added",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
/**************Get all products************* */
exports.Get_AllProducts = asyncHandler(async (req, res) => {
  try {
    const get_allproducts = await ProductModel.findAll({});
    if (get_allproducts) {
      res.status(201).json(get_allproducts);
    } else {
      res.status(404).json({ message: "your products have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
/**************Get products with specific category************* */
exports.Get_Category_Products = asyncHandler(async (req, res) => {
  try {
    const { id_cat } = req.params;
    const get_category_products = await ProductModel.findAll({
      where: { id_cat: id_cat },
    });
    if (get_category_products) {
      res.status(201).json({
        message: "your products have been successfully found",
        data: get_category_products,
      });
    } else {
      res.status(404).json({ message: "your products have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// /**************Get specific product by id user************* */
exports.Get_spec_ProductByIdUser = asyncHandler(async (req, res) => {
  try {
    const { createdBy } = req.params;
    const productbyiduser = await ProductModel.findAll({
      where: { createdBy: createdBy },
    });
    if (productbyiduser) {
      res.status(201).json(productbyiduser);
    } else {
      res.status(400).json({ message: "your product have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// /**************Get specific product************* */
exports.Get_spec_Product = asyncHandler(async (req, res) => {
  try {
    const { id_prod } = req.params;
    const get_spec_product = await ProductModel.findByPk(id_prod);
    if (get_spec_product) {
      res.status(201).json(get_spec_product);
    } else {
      res.status(404).json({ message: "your product have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// /**************Get specific product by id store************* */
exports.Get_spec_ProductByIdStore = asyncHandler(async (req, res) => {
  try {
    const { id_magasin } = req.params;
    const productbyidstore = await ProductModel.findAll({
      where: { id_magasin: id_magasin },
    });
    if (productbyidstore) {
      res.status(201).json(productbyidstore);
    } else {
      res.status(400).json({ message: "your product have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// /**************Update specific product************* */
exports.Update_spec_Product = asyncHandler(async (req, res) => {
  try {
    const { id_prod } = req.params;

    const {
      Libelle_prod,
      Caracteristiques_prod,
      prix_prod,
      Stock_prod,
      id_cat,
      createdBy,
      id_magasin,
      Hauteur,
      Largeur,
      Epaisseur,
      Diametre,
      Longueur,
      id_marque,
      id_modele,
      id_motor,
      Reference_prod,
      id_mat,
      id_subcat,
    } = req.body;
    const images = req.files;
    const imagesUrls = [];
    let thumbnailUrl;

    // Loop through each image to upload to Cloudinary
    for (const image of images) {
      const result = await cloudinary.uploader.upload(image.path, {
        resource_type: "auto",
      });

      // Check if this is the first image, if so, set it as the thumbnail
      if (!thumbnailUrl) {
        thumbnailUrl = result.secure_url;
      }

      imagesUrls.push(result.secure_url);
    }
    const imageUrlsString = imagesUrls.join(",");

    const updateFields = {
      Libelle_prod,
      Caracteristiques_prod,
      prix_prod,
      Stock_prod,
      id_cat,
      createdBy,
      id_magasin,
      Hauteur,
      Largeur,
      Epaisseur,
      Diametre,
      Longueur,
      Image_thumbnail: thumbnailUrl,
      Image_prod: imageUrlsString,
      id_marque,
      id_modele,
      id_motor,
      Reference_prod,
      id_mat,
      id_subcat,
    };

    const updatedProduct = await ProductModel.update(updateFields, {
      where: { id_prod: id_prod },
      new: true,
    });

    if (updatedProduct) {
      res.status(201).json({
        message: "Your product has been successfully updated",
        data: updatedProduct,
      });
    } else {
      res.status(404).json({ message: `Product with ID ${id_prod} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

/**************Delete specific product************* */
exports.Delete_spec_Product = asyncHandler(async (req, res) => {
  try {
    const { id_prod } = req.params;

    const delete_spec_product = await ProductModel.destroy({
      where: {
        id_prod: id_prod,
      },
    });
    if (delete_spec_product) {
      res.status(201).json({
        message: "your product have been successfully deleted",
        data: delete_spec_product,
      });
    } else {
      res.status(400).json({ message: "your product have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

/**************Delete specific product************* */
exports.Delete_All_Product = asyncHandler(async (req, res) => {
  try {
    const delete_all_product = await ProductModel.destroy({ where: {} });
    if (delete_all_product) {
      res.status(201).json({
        message: "all products have been successfully deleted",
      });
    } else {
      res.status(400).json({ message: " products have not been found " });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
/**********************search product*********************** */
exports.Search_product = asyncHandler(async (req, res) => {
  try {
    const { keyword } = req.query;

    const searchCriteria = {
      [Op.or]: [{ Libelle_prod: { [Op.iLike]: `%${keyword}%` } }],
    };

    const users = await ProductModel.findAll({
      where: searchCriteria,
      attributes: [
        "Libelle_prod",
        "Description_prod",
        "prix_prod",
        "Image_prod",
        "Stock_prod",
        "id_cat",
        "createdBy",
      ],
    });
    if (users.length > 0) {
      res
        .status(201)
        .json({ message: "product have been successfully find", users });
    } else {
      res.status(400).json({ message: "product have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
/**********************search product by ville*********************** */
exports.Get_spec_ProductByVille = asyncHandler(async (req, res) => {
  try {
    const { id_ville } = req.params;
    const get_spec_product = await ProductModel.findByPk(id_ville);
    if (get_spec_product) {
      res.status(201).json({
        message: "your product have been successfully found",
        data: get_spec_product,
      });
    } else {
      res.status(404).json({ message: "your product have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
/**************Get all matter************* */
exports.Get_AllMatter = asyncHandler(async (req, res) => {
  try {
    const AllMatter = await Matiere.findAll({});
    if (AllMatter) {
      res.status(201).json(AllMatter);
    } else {
      res.status(404).json({ message: "your products have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
/**************Get all matter************* */
exports.Get_MatterByid = asyncHandler(async (req, res) => {
  try {
    const { id_mat } = req.params;
    const AllMatter = await Matiere.findByPk(id_mat);
    if (AllMatter) {
      res.status(201).json(AllMatter);
    } else {
      res.status(404).json({ message: "your products have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
