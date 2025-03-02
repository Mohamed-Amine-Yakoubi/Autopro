const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/Database");

const Magasin = require("./MagasinModel");
const User = require("./UserModel");

const Commande = sequelize.define(
  "Commande",
  {
    id_cmd: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    id_MainCmd: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    prix_total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Reference_cmd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    etat_cmd: {
      type: DataTypes.STRING,
      allowNull: false,
      enum: ["en attente", "approuvé", "Retour", "Annuler"],
      defaultValue: "en attente",
    },
    Date_cmd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    updatedAt: false,
    createdAt: false,
    timestamps: false,
  }
);

Commande.belongsTo(User, {
  foreignKey: "id_user",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Commande.belongsTo(Magasin, {
  foreignKey: "id_magasin",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = Commande;
