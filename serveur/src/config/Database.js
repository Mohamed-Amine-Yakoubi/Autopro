
const { Sequelize } = require("sequelize");
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_DIALECT,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
  }
);

 

const DbConnection = async () => {
  try {
    await sequelize.authenticate();
 
    console.log('Connection to database has been established successfully.');
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { sequelize, DbConnection };
 
