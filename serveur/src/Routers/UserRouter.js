const express = require("express");
const route = express.Router();
const UserControllers = require("../Controllers/UserController");
const AdresseUserController = require("../Controllers/AdresseUserController");
const AuthMiddlware = require("../Middleware/AuthMiddleware");
const upload = require("../Middleware/Multer");
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
route.post("/AddClaim", upload.single("file_rec"), UserControllers.AddClaim);
route.get(
  "/GetAllUsersClaim",UserControllers.GetAllUsersClaim
);
route.get(
  "/GetClaimStoreId/:id_magasin",UserControllers.GetClaimStoreId
);
route.patch("/Update_etat_Rec/:id_rec", UserControllers.Update_etat_Rec);

route.post("/Add_Adresse", AdresseUserController.Add_Adresse);
route.get("/GetAdrByIdUser/:id_user", AdresseUserController.GetAdrByIdUser);
route.patch("/Update_Adresse/:id_user", AdresseUserController.Update_Adresse);
module.exports = route;
