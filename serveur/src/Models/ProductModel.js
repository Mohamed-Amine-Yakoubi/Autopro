const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/Database");
const Category = require("./CategoryModel");
const User = require("./UserModel");
const Magasin = require("./MagasinModel");
const Ville = require("./VilleModel");

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
    Description_prod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prix_prod: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Image_thumbnail: {
      type: DataTypes.STRING, // or DataTypes.TEXT if storing image data directly
      allowNull: false,
    },
    Image_prod: {
      type: DataTypes.STRING, // or DataTypes.TEXT if storing image data directly
      allowNull: false,
    },
    Stock_prod: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

 
 
module.exports = Product;
