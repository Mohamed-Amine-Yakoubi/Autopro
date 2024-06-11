const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/Database");
const User = require("./UserModel");
const Product = require("./ProductModel");

const Favoris = sequelize.define(
  "Favoris",
  {
    id_fav: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
Favoris.belongsTo(User, {
    foreignKey: "id_user",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Favoris.belongsTo(Product, {
    foreignKey: "id_prod",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
module.exports = Favoris;
