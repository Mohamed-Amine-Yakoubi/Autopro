const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/Database");

const User = require("./UserModel");
const Ville = require("./VilleModel");

const AdresseUser = sequelize.define(
  "Adresse_User",
  {
    id_adr: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
  foreignKey: "id_user",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
AdresseUser.belongsTo(Ville, {
  foreignKey: "id_ville",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = AdresseUser;
