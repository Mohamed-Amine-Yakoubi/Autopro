const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");
const Commande = require("../Models/CommandeModel");
const CommandeDetails = require("../Models/commandeDetailsModel");
const { UserMail } = require("../Utils/UserMail");
 
 
require("dotenv").config();

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
/**************add Commande************* */
exports.add_Commande = asyncHandler(async (req, res) => {
  try {
    /***** */
    const {
      prix_total,
      id_cmd,
      id_user,
      id_magasin,
      add_CommandeDetail,
      Date_cmd,
      id_MainCmd,
    } = req.body;

    const referenceLength = 8; // Length of the reference string
    const referencePrefix = "AP"; // Static prefix for the reference
    const randomString = generateRandomString(referenceLength);
    const Reference_cmd = `${referencePrefix}-${randomString}`;

    // Create Commande
    const add_Commande = await Commande.create({
      id_cmd,
      id_user,
      id_magasin,
      prix_total,
      Reference_cmd,
      Date_cmd,
      id_MainCmd,
    });

    if (!add_Commande) {
      return res.status(404).json({ message: "Failed to add Commande" });
    }

    // Create CommandeDetails

    const commandeDetailsPromises = add_CommandeDetail.map((detail) => {
      return CommandeDetails.create({
        id_cmd: add_Commande.id_cmd,
        Qte_dtcmd: detail.Qte_dtcmd,
        prix_Total_dtcmd: detail.prix_Total_dtcmd,
        id_prod: detail.id_prod,
        id_magasin: detail.id_magasin,
        id_MainCmd: add_Commande.id_MainCmd,
      }).catch((err) => {
        console.error(
          `Failed to create CommandeDetail for id_prod ${detail.id_prod}:`,
          err
        );
        throw err; // Rethrow the error to propagate it
      });
    });

    const createdCommandeDetails = await Promise.all(commandeDetailsPromises);

    res.status(201).json({ add_Commande, createdCommandeDetails });
  } catch (error) {
    console.error("Error while adding Commande and CommandeDetails:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

/**************Get all Commande************* */
exports.Get_AllCommandeUsers = asyncHandler(async (req, res) => {
  try {
    const Get_AllCommande = await Commande.findAll();
    if (Get_AllCommande) {
      res.status(201).json(Get_AllCommande);
    } else {
      res.status(404).json({ message: "Commande have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

/**************Get all Commande************* */
exports.Get_AllCommande = asyncHandler(async (req, res) => {
  try {
    const { id_magasin } = req.params;
    const Get_AllCommande = await Commande.findAll({
      where: { id_magasin: id_magasin },
    });
    if (Get_AllCommande) {
      res.status(201).json(Get_AllCommande);
    } else {
      res.status(404).json({ message: "Commande have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

/**************Get Commande************* */
exports.getOneCommandeByIdUser = asyncHandler(async (req, res) => {
  try {
    const { id_user } = req.params;
    const OneCommandeByIdUser = await Commande.findAll({
      where: { id_user: id_user },
    });
    if (OneCommandeByIdUser) {
      res.status(201).json(OneCommandeByIdUser);
    } else {
      res.status(404).json({ message: `No favoris found this ${id_user}` });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
/**************Get all Commande************* */
exports.Get_AllMainCommande = asyncHandler(async (req, res) => {
  try {
    const { id_user } = req.params;
    const Get_AllCommande = await Commande.findAll({
      where: { id_user: id_user },
    });
    if (Get_AllCommande) {
      res.status(201).json(Get_AllCommande);
    } else {
      res.status(404).json({ message: "Commande have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

exports.Get_MainCommande = asyncHandler(async (req, res) => {
  try {
    const { id_MainCmd } = req.params;
    const Get_AllCommande = await Commande.findAll({
      where: { id_MainCmd: id_MainCmd },
    });
    if (Get_AllCommande) {
      res.status(201).json(Get_AllCommande);
    } else {
      res.status(404).json({ message: "Commande have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
/**************Get detailsCommande************* */
exports.getdetailsCommande = asyncHandler(async (req, res) => {
  try {
    const { id_MainCmd } = req.params;
    const detailsCommande = await CommandeDetails.findAll({
      where: { id_MainCmd: id_MainCmd },
    });
    if (detailsCommande) {
      res.status(201).json(detailsCommande);
    } else {
      res.status(404).json({ message: `No favoris found this ${id_user}` });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

/**************Get all CommandeMagasin************* */
exports.Get_AllCommandebydiMagasin = asyncHandler(async (req, res) => {
  try {
    const { id_MainCmd, id_magasin } = req.params;
    const Get_AllCommande = await CommandeDetails.findAll({
      where: { id_MainCmd: id_MainCmd, id_magasin: id_magasin },
    });
    if (Get_AllCommande) {
      res.status(201).json(Get_AllCommande);
    } else {
      res.status(404).json({ message: "Commande have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

/*****************update etat commabde**************************** */
exports.Update_commande = asyncHandler(async (req, res) => {
  try {
    const { id_cmd } = req.params;
    const { etat_cmd } = req.body;
    const updateFields = { etat_cmd };
    const update_commande = await Commande.update(updateFields, {
      where: { id_cmd: id_cmd },
    });

    if (update_commande) {
      res.status(201).json(update_commande);
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
/******************sen Mail commande****************** */
exports.User_Mail = asyncHandler(async (req, res) => {
  try {
    const { to, subject, html } = req.body;
    await UserMail(to, subject, html);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error while sending email:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});
