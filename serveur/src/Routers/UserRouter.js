const express = require("express");
const route = express.Router();
const UserControllers = require("../Controllers/UserController");
const AuthMiddlware = require("../Middleware/AuthMiddleware");

route.post("/SignUp", UserControllers.SignUp);
route.post("/SignIn", UserControllers.SingIn);
route.get(
  "/GetAllUsers",
  // AuthMiddlware.Protect,
  // AuthMiddlware.isAdmin ,
  UserControllers.GetAllUsers
);
route.get(
  "/GetUserById/:id_user",
  // AuthMiddlware.Protect,
  UserControllers.GetUserById
);
route.put(
  "/UpdateAccount/:id_user",
  // AuthMiddlware.Protect, 
    UserControllers.Update_spec_User
);
route.patch(
  "/UpdateAccountPassword/:id_user",
  // AuthMiddlware.Protect,
  UserControllers.Update_spec_UserPassword
);


route.delete(
  "/DeleteAllUsers",
  // AuthMiddlware.Protect,
  // AuthMiddlware.isAdmin,
  UserControllers.DeleteUsers
);
route.delete(
  "/DeleteSpecificUsers/:id_user",
  // AuthMiddlware.Protect,
  // AuthMiddlware.isAdmin, 
  UserControllers.DeleteSpecificUser
);
route.post("/SearchUser", UserControllers.Search_User);
route.get("/activate/:token", UserControllers.activateAccount);
route.post("/FindUserByEmail", UserControllers.FindUserByEmail);
module.exports = route;
