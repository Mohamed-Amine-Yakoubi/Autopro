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
      type: DataTypes.STRING,
      allowNull: false,
    },
    Telephone_rec: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description_rec: {
      type: DataTypes.STRING(400),
      allowNull: false,
    },
    file_rec: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    Profil_user: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    etat_rec: {
      type: DataTypes.STRING,
      allowNull: false,
      enum: ["Approuvé", "Rejeté", "En attente"],
      defaultValue: "En attente",
    },
    id_magasin: {
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
 
 
Reclamtion.belongsTo(User, {
  foreignKey: {
    name: "id_user",
    allowNull: true,
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
module.exports = Reclamtion;
