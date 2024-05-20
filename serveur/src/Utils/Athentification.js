const jwt = require("jsonwebtoken");
require("dotenv").config();
const privatekey = process.env.JWT_SECRET_KEY;
const option = { expiresIn: process.env.JWT_EXPIRES_IN };

const createToken = (payload) => {
  return jwt.sign(payload, privatekey, option);
};

const verifyToken = (token) => {
  return jwt.verify(token, privatekey);
};
 

module.exports = { createToken ,verifyToken };
