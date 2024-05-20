const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/Database");
const User = require("./UserModel");
const Ville = require("./VilleModel");

const Magasin = sequelize.define(
  "Magasins",
  {
    // Model attributes are defined here
    id_magasin: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Libelle_magasin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Adresse_magasin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Telephone_magasin: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Description_magasin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Logo_magasin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Ouverture_magasin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Fermeture_magasin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: "false",
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
Magasin.belongsTo(User, {
  foreignKey: "id_proprietaire",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Magasin.belongsTo(Ville, {
  foreignKey: "id_ville",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
module.exports = Magasin;
