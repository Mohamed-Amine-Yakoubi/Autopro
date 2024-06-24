const AdresseUser = require("../Models/AdresseUser");
const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");

require("dotenv").config();

exports.Add_Adresse = asyncHandler(async (req, res) => {
  try {
    const { code_adr, rue_adr, id_user, id_ville } = req.body;

    const Adresse = await AdresseUser.create({
      code_adr,
      rue_adr,
      id_user,
      id_ville,
    });

    if (Adresse) {
      res.status(201).json(Adresse);
    } else {
      res.status(404).json({
        message: "Store has not been added",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/********************************************* */

exports.GetAdrByIdUser = asyncHandler(async (req, res) => {
  try {
    const { id_user } = req.params;
    const AdrByIdUser = await AdresseUser.findOne({where:{ id_user: id_user }});
    if (AdrByIdUser) {
      res.status(201).json(AdrByIdUser);
    } else {
      res.status(404).json({ message: `can't found this ${id_user}` });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
/********************************************* */
exports.Update_Adresse = asyncHandler(async (req, res) => {
  try {
    const { id_user } = req.params;
    const { code_adr, rue_adr, id_ville } = req.body;
    const updateFields = { code_adr, rue_adr, id_ville };
    const Adresse = await AdresseUser.update(updateFields, {
      where: { id_user: id_user },
    });

    if (Adresse) {
      res.status(201).json(Adresse);
    } else {
      res.status(404).json({
        message: "Store has not been added",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
