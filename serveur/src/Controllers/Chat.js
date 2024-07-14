const asyncHandler = require("express-async-handler");
const ChatModel = require("../Models/ChatModel");
const MagasinModel = require("../Models/MagasinModel");
const User = require("../Models/UserModel");
const { Op } = require("sequelize");

require("dotenv").config();

/********************************************* */

exports.GetMsgByIdUser = asyncHandler(async (req, res) => {
  try {
    const { Expediteur } = req.params;
    const MsgByIdUser = await ChatModel.findAll({
      where: { Expediteur: Expediteur },
    });
    if (MsgByIdUser) {
      res.status(201).json(MsgByIdUser);
    } else {
      res.status(404).json({ message: `can't found this ${Expediteur}` });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

/********************************************* */
exports.GetDestination = asyncHandler(async (req, res) => {
  try {
    const { destinataire, Expediteur } = req.params;

    // Query the ChatModel to find relevant chats where Expediteur or destinataire match
    const chats = await ChatModel.findAll({
      where: {
        [Op.or]: [
          { destinataire: destinataire, Expediteur: Expediteur },
          { destinataire: Expediteur, Expediteur: destinataire }
        ]
      }
    });

    // Extract unique magasin IDs from chats
    const magasinIds = chats.map(chat => chat.destinataire);

    // Query MagasinModel to fetch magasins based on IDs
    const getDestination = await MagasinModel.findAll({
      where: {
        id_magasin: magasinIds
      }
    });

    if (getDestination.length > 0) {
      res.status(200).json(getDestination); // Use 200 for a successful fetch
    } else {
      res.status(404).json({ message: `Cannot find destination with id ${destinataire}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
/******************************* */


exports.conversation = asyncHandler(async (req, res) => {
  try {
    const { Expediteur, destinataire } = req.params;
    console.log(`Fetching conversation between ${Expediteur} and ${destinataire}`);

    const messages = await ChatModel.findAll({
      where: {
        [Op.or]: [
          { Expediteur: Expediteur, destinataire: destinataire },
          { Expediteur: destinataire, destinataire: Expediteur },
        ],
      },
      order: [[  'timestamp']],
    });

    console.log('Fetched messages:', messages);
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching conversation:', error);
    res.status(500).json({ error: 'Failed to fetch conversation' });
  }
})
