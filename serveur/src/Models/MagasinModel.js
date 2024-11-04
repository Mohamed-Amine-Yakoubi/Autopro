const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/Database");
const User = require("./UserModel");
const Ville = require("./VilleModel");
const ChatModel = require("./ChatModel");

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
    Email_magasin: {
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
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Logo_magasin: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Lien_facebook: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Lien_instagram: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Lien_linkedin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Lien_siteWeb: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    etat_magasin: {
      type: DataTypes.STRING,
      allowNull: false,
      enum: ["Approuvé", "Rejeté", "En attente"],
      defaultValue: "En attente",
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
