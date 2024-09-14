const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/Database");
const Magasin = require("./MagasinModel");
const User = require("./UserModel");

const Facture = sequelize.define(
  "Facture",
  {
    id_fact: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    Nom_user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Refrence_fact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pdf_fact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_MainCmd: {
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
Facture.belongsTo(Magasin, {
  foreignKey: "id_magasin",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Facture.belongsTo(User, {
  foreignKey: "id_user",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
module.exports = Facture;
