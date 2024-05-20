const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/Database");
 
const Product = require("./ProductModel");
const Magasin = require("./MagasinModel");

const Ville = sequelize.define(
  "Villes",
  {
    id_ville: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Libelle_ville: {
      type: DataTypes.STRING,
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

module.exports = Ville;
