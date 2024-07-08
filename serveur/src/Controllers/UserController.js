const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const Adresse_User = require("../Models/AdresseUser");
const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");
const { createToken, verifyToken } = require("../Utils/Athentification");
const cloudinary = require("../Utils/Cloudinary");

const VerificationEmail = require("../Utils/VerificationEmail");
const AdresseUser = require("../Models/AdresseUser");
const Reclamtion = require("../Models/ClaimModel");
//Sign Up

exports.SignUp = asyncHandler(async (req, res) => {
  try {
    const {
      Nom_user,
      Prenom_user,
      Email_user,
      MotDePasse_user,
      Telephone_user,
    } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(MotDePasse_user, 10);

    // Create new user
    const newUser = await UserModel.create({
      Nom_user,
      Prenom_user,
      Email_user,
      MotDePasse_user: hashedPassword,
      Telephone_user,
    });

    // Create JWT token
    const token = createToken({ newUser });

    await VerificationEmail(newUser.Email_user, token);
    // Respond with success message and token
    res.status(201).cookie("token", token).json({
      message: "User registered successfully",
      savedUser: newUser,

      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
//SignIn
exports.SingIn = asyncHandler(async (req, res) => {
  try {
    const { Email_user, MotDePasse_user } = req.body;
    if (!Email_user && !MotDePasse_user) {
      return res.status(400).json({ message: "Missing required fields" });
    } else if (Email_user && MotDePasse_user) {
      const user = await UserModel.findOne({
        where: { Email_user: Email_user },
      });

      if (
        !user ||
        !(await bcrypt.compare(MotDePasse_user, user.MotDePasse_user))
      ) {
        return res.status(400).json({ message: "Incorrect email or password" });
      } else if (!user.isActive) {
        return res
          .status(400)
          .json({ message: "please check your mailbox for activation" });
      }
      let token = createToken({ user });
      return res
        .status(200)
        .cookie("token", token)
        .json({ message: "user found successfully", user, token });
    } else {
      res.status(404).json({ message: " account have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
//get all users
exports.GetAllUsers = asyncHandler(async (req, res) => {
  try {
    const getalluser = await UserModel.findAll({});
    if (getalluser) {
      res.status(200).json(getalluser);
    } else {
      res.status(404).json({ message: " accounts were not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
//get user by id
exports.GetUserById = asyncHandler(async (req, res) => {
  const { id_user } = req.params;
  try {
    const getuserbyid = await UserModel.findByPk(id_user);
    if (getuserbyid) {
      res.status(201).json(getuserbyid);
    } else {
      res.status(404).json({ message: " account have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
//delete all users
exports.DeleteUsers = asyncHandler(async (req, res) => {
  try {
    const deleteusers = await UserModel.destroy({
      where: {},
    });
    if (deleteusers) {
      res
        .status(200)
        .json({ message: "all users have been successfully deleted" });
    } else {
      res.status(404).json({ message: "problem during deleted all users" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
//delete specific users
exports.DeleteSpecificUser = asyncHandler(async (req, res) => {
  const { id_user } = req.params;
  try {
    const deletespecificuser = await UserModel.destroy({
      where: { id_user: id_user },
    });
    if (deletespecificuser) {
      res
        .status(201)
        .json({ message: "your specific user have been successfully deleted" });
    } else {
      res.status(404).json({ message: "user account have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
//update user
exports.Update_spec_User = asyncHandler(async (req, res) => {
  try {
    const { id_user } = req.params;
    const { Nom_user, Prenom_user, Email_user, Telephone_user, Profil_user } =
      req.body;

    const updateFields = {
      Nom_user: Nom_user,
      Prenom_user: Prenom_user,
      Email_user: Email_user,
      Telephone_user: Telephone_user,

      Profil_user: Profil_user,
    };
    const [update_spec_user] = await UserModel.update(updateFields, {
      where: { id_user: id_user },
    });
    if (update_spec_user > 0) {
      res.status(201).json({
        message: "your account have been successfully updated",
        data: updateFields,
      });
    } else {
      res.status(404).json({
        message: `user account have not been found with this id ${id_user}`,
      });
    }
    console.log(id_user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
//update user password
exports.Update_spec_UserPassword = asyncHandler(async (req, res) => {
  try {
    const { id_user } = req.params;
    const { MotDePasse_user } = req.body;
    const hashedPassword = await bcrypt.hash(MotDePasse_user, 10);
    const updateFields = {
      MotDePasse_user: hashedPassword,
    };
    const update_spec_userpassword = await UserModel.update(updateFields, {
      where: { id_user: id_user },
      new: true,
    });
    if (update_spec_userpassword) {
      res.status(201).json({
        message: "your account have been successfully updated",
        data: update_spec_userpassword,
      });
    } else {
      res.status(404).json({ message: " account have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
//search user
exports.Search_User = asyncHandler(async (req, res) => {
  try {
    const { keyword } = req.query;

    const searchCriteria = {
      [Op.or]: [
        { Nom_user: { [Op.iLike]: `%${keyword}%` } },
        { Prenom_user: { [Op.iLike]: `%${keyword}%` } },
        { Email_user: { [Op.iLike]: `%${keyword}%` } },
      ],
    };

    const users = await UserModel.findAll({
      where: searchCriteria,
      attributes: [
        "id_user",
        "Nom_user",
        "Prenom_user",
        "Email_user",
        "Telephone_user",
        "Profil_user",
      ],
    });
    if (users) {
      res
        .status(200)
        .json({ message: "user account have been successfully find", users });
    } else {
      res.status(404).json({ message: "user account have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// Email verification endpoint
exports.activateAccount = asyncHandler(async (req, res) => {
  try {
    const { token } = req.params; // Récupérer le token depuis la requête
    // Vérifier si le token est valide
    const decodedToken = verifyToken(token);
    const user = await UserModel.findOne({
      where: { Email_user: decodedToken.newUser.Email_user },
    });
    // Si l'utilisateur n'existe pas ou que le compte est déjà activé, renvoyer une erreur
    if (!user || user.isActive) {
      return res
        .status(400)
        .json({ message: "Invalid token or account is already activated" });
    }
    // Activer le compte en mettant à jour le champ 'isActive' dans la base de données
    await UserModel.update(
      { isActive: true },
      { where: { Email_user: decodedToken.newUser.Email_user } }
    );

    // Rediriger l'utilisateur vers une page de confirmation ou afficher un message
    res.redirect("http://localhost:3000/"); // Redirigez l'utilisateur vers une page de succès d'activation
  } catch (error) {
    console.error("Error activating account:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
//find user by email
exports.FindUserByEmail = asyncHandler(async (req, res) => {
  const { Email_user } = req.body;
  try {
    // Check if user with the same email already exists
    const existingUser = await UserModel.findOne({ where: { Email_user } });
    if (existingUser) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//Reclamation
exports.AddClaim = asyncHandler(async (req, res) => {
  try {
    const {
      NomPrenom_rec,
      Email_rec,
      Telephone_rec,
      description_rec,

      id_magasin,
    } = req.body;
    let file_rec = null;
    // Check if a file is uploaded
    if (req.file) {
      const image = req.file;
      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(image.path, {
        resource_type: "auto",
      });
      file_rec = result.secure_url;
    }
    const addclaim = await Reclamtion.create({
      NomPrenom_rec,
      Email_rec,
      Telephone_rec,
      description_rec,
      file_rec,

      id_magasin,
    });
    if (addclaim) {
      res.status(201).json({
        message: " claim has been added successfully",
        data: addclaim,
      });
    } else {
      res.status(404).json({
        message: "The  Favrois has not been added",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
//get all users claim
exports.GetAllUsersClaim = asyncHandler(async (req, res) => {
  try {
    const allusersclaim = await Reclamtion.findAll({});
    if (allusersclaim) {
      res.status(200).json(allusersclaim);
    } else {
      res.status(404).json({ message: " accounts were not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
//get user by id
exports.GetClaimStoreId = asyncHandler(async (req, res) => {
  const { id_magasin } = req.params;
  try {
    const ClaimByStoreId = await Reclamtion.findAll({
      where: { id_magasin: id_magasin },
    });
    if (ClaimByStoreId) {
      res.status(201).json(ClaimByStoreId);
    } else {
      res.status(404).json({ message: " account have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
