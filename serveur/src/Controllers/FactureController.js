const asyncHandler = require("express-async-handler");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const Facture = require("../Models/FactureModel");

const { generatePdf } = require("../Utils/generatePdf");
const uploadPDF = require("../Utils/uploadPDF");

require("dotenv").config();

exports.saveFacture = asyncHandler(async (req, res) => {
  const { Nom_user, Refrence_fact, htmlContent, id_magasin, id_MainCmd,id_user } =
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
      id_user
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

exports.getFacturebyIdCmd = asyncHandler(async (req, res) => {
  try {
    const { id_MainCmd} = req.body;
    const FacturebyIdCmd = await Facture.findAll({
      where: { id_MainCmd: id_MainCmd },
    });
    if (FacturebyIdCmd) {
      res.status(201).json(FacturebyIdCmd);
    } else {
      res.status(404).json({ message: `No favoris found this ${id_MainCmd}` });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

exports.getFacturebyIdUser= asyncHandler(async (req, res) => {
  try {
    const { id_user} = req.params;
    const FacturebyIdUser = await Facture.findAll({
      where: { id_user: id_user },
    });
    if (FacturebyIdUser) {
      res.status(201).json(FacturebyIdUser);
    } else {
      res.status(404).json({ message: `No favoris found this ${id_user}` });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

exports.GetAllFacture = asyncHandler(async (req, res) => {
  try {
    const allfacture = await Facture.findAll({});
    if (allfacture) {
      res.status(200).json(allfacture);
    } else {
      res.status(404).json({ message: " accounts were not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});