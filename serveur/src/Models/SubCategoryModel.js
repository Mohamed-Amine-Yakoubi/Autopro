const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/Database");
const Category = require("./CategoryModel");

const SubCategory = sequelize.define(
  "SubCategory",
  {
    id_subcat: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Libelle_subcat: {
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
SubCategory.belongsTo(Category, {
    foreignKey: "id_cat",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
module.exports = SubCategory;
