const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/Database");
const Magasin = require("./MagasinModel");
const User = require("./UserModel");

const Reclamtion = sequelize.define(
  "Reclamtion",
  {
    id_rec: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    NomPrenom_rec: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email_rec: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    Telephone_rec: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    description_rec: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    file_rec: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    etat_rec: {
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
 
Reclamtion.belongsTo(Magasin, {
  foreignKey: {
    name: "id_magasin",
    allowNull: true,
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = Reclamtion;
