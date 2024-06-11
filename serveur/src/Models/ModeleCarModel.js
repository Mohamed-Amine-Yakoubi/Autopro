const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/Database");
const Marque = require("./MarqueModel");
 

const Modele = sequelize.define(
  "Modele",
  {
    id_modele: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Libelle_modele: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  
    annee_modele: {
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
Modele.belongsTo(Marque, {
    foreignKey: "id_marque",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
module.exports = Modele;
