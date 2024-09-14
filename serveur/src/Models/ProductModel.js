const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/Database");
const Category = require("./CategoryModel");
const User = require("./UserModel");
const Magasin = require("./MagasinModel");
 
const Marque = require("./MarqueModel");
const Modele = require("./ModeleCarModel");
const Motor = require("./MotorisationModel");
const Matiere = require("./MatiereModel");
const SubCategory = require("./SubCategoryModel");

const Product = sequelize.define(
  "Products",
  {
    id_prod: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Libelle_prod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Caracteristiques_prod: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Reference_prod: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    prix_prod: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Image_thumbnail: {
      type: DataTypes.TEXT, // or DataTypes.TEXT if storing image data directly
      allowNull: false,
    },
    Image_prod: {
      type: DataTypes.TEXT, // or DataTypes.TEXT if storing image data directly
      allowNull: false,
    },
    Stock_prod: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Hauteur: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Largeur: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Epaisseur: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Diametre: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Longueur: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now,
    },
  },
  {
    timestamps: false,
  }
);
Product.belongsTo(Category, {
  foreignKey: "id_cat",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Product.belongsTo(User, {
  foreignKey: "createdBy",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Product.belongsTo(Magasin, {
  foreignKey: "id_magasin",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Product.belongsTo(Marque, {
  foreignKey: "id_marque",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Product.belongsTo(Modele, {
  foreignKey: "id_modele",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Product.belongsTo(Motor, {
  foreignKey: "id_motor",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Product.belongsTo(Matiere, {
  foreignKey: "id_mat",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Product.belongsTo(SubCategory, {
  foreignKey: "id_subcat",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
module.exports = Product;
