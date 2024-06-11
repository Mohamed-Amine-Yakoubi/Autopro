const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/Database");
 

const Matiere = sequelize.define(
  "Matiere",
  {
    id_mat: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Libelle_mat: {
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

module.exports = Matiere;
