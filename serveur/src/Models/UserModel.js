const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/Database");
 
 

const User = sequelize.define(
  "Users",
  {
    // Model attributes are defined here
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nom_user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Prenom_user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email_user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    MotDePasse_user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Telephone_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
   
    Profil_user: {
      type: DataTypes.STRING,
      allowNull: false,
      enum: ["admin", "fournisseur", "client"],
      defaultValue: "client",
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


module.exports = User;
