const asyncHandler = require("express-async-handler");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const Facture = require("../Models/FactureModel");

const { generatePdf } = require("../Utils/generatePdf");
const uploadPDF = require("../Utils/uploadPDF");

require("dotenv").config();

exports.saveFacture = asyncHandler(async (req, res) => {
  const { Nom_user, Refrence_fact, htmlContent, id_magasin, id_MainCmd } =
    req.body;

  try {
    // Generate the PDF from HTML content
    const pdfBuffer = await generatePdf(htmlContent);

    // Upload the PDF to Cloudinary
    const pdfUrl = await uploadPDF(pdfBuffer, Refrence_fact);

    // Save the PDF URL in the database
    const newFacture = await Facture.create({
      Nom_user,
      Refrence_fact,
      pdf_fact: pdfUrl,
      id_magasin,
      id_MainCmd,
    });

    res.status(201).json(newFacture);
  } catch (error) {
    console.log("error pdf", error);
    res.status(500).json({ error: error.message });
  }
});

exports.getFacturebyIdStore = asyncHandler(async (req, res) => {
  try {
    const { id_magasin } = req.params;
    const FacturebyIdStore = await Facture.findAll({
      where: { id_magasin: id_magasin },
    });
    if (FacturebyIdStore) {
      res.status(201).json(FacturebyIdStore);
    } else {
      res.status(404).json({ message: `No favoris found this ${id_magasin}` });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
