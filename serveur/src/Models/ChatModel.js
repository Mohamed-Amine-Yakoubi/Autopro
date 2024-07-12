const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/Database");
const Magasin = require("./MagasinModel");

const ChatModel = sequelize.define(
  "Chat",
  {
    id_Chat: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Contenu: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Expediteur: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    destinataire: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);
 
module.exports = ChatModel;
