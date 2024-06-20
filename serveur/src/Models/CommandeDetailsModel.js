const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/Database");

 
const Commande = require("./CommandeModel");
const Product = require("./ProductModel");
const Magasin = require("./MagasinModel");

const CommandeDetails = sequelize.define(
  "CommandeDetails",
  {
    id_dtcmd: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Qte_dtcmd: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    prix_Total_dtcmd: {
      type: DataTypes.FLOAT,
      allowNull: false,
    } 
  },
  {
    updatedA: false,
    createdAt: false,
    timestamps: false,
  }
);

CommandeDetails.belongsTo(Commande, {
  foreignKey: "id_cmd",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
CommandeDetails.belongsTo(Product, {
    foreignKey: "id_prod",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  CommandeDetails.belongsTo(Magasin, {
    foreignKey: "id_magasin",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  
module.exports = CommandeDetails;
