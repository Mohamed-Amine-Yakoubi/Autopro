const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/Database");
const Modele = require("./ModeleCarModel");
 

const Motorisation = sequelize.define(
  "Motorisation",
  {
    id_motor: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Libelle_motor: {
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
Motorisation.belongsTo(Modele, {
    foreignKey: "id_modele",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
module.exports = Motorisation;
