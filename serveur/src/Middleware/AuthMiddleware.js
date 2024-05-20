const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const privatekey = process.env.JWT_SECRET_KEY;
/*********************protector*************************/

exports.Protect = asyncHandler(async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(400).json({ message: "failed to access to token" });
      }
    }
    const decoded = jwt.verify(token, privatekey);

    const currentUser = await User.findByPk(decoded.user.id_user);

    if (!currentUser) {
      return res.status(400).json({ message: "can't found user" });
    }
    req.user = currentUser;
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
/*********************verify user is admin*************************/
exports.isAdmin = asyncHandler(async (req, res, next) => {
  console.log("aminiinini", req.user.Profil_user);
  if (req.user && req.user.Profil_user === "admin") {
    // User is an admin, proceed to the next middleware or route handler

    next();
  } else {
    // User is not an admin, return unauthorized response
    return res.status(403).json({
      message: "Permission denied. Only admins can perform this action.",
    });
  }
});
/*********************verify user is admin*************************/
exports.isSupplier = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.Profil_user === "fournisseur") {
    next();
  } else {
    return res.status(403).json({
      message: "Permission denied. Only supplier can perform this action.",
    });
  }
});
