const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/Database");
 
const User = require("./UserModel");
 

const AdresseUser = sequelize.define(
  "Adresse_User",
  {
    id_adr: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ville_adr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code_adr: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rue_adr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    updatedA: false,
    createdAt: false,
    timestamps: false,
  }
);

AdresseUser.belongsTo(User, {
  foreignKey: "user_ID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = AdresseUser;
