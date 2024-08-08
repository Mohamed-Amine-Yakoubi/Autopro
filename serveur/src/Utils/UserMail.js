const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_AUTH,
    pass: process.env.PASS_AUTH,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Error verifying transporter:", error);
  } else {
    console.log("Transporter ready for messages:", success);
  }
});

const UserMail = async (email, subject, html) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_AUTH,
      to: email,
      subject: subject,
      html: html,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

const sendNewPasswordEmail = async (email, newPassword) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_AUTH,
      to: email,
      subject: "Réinitialisation du mot de passe",
      text: `Votre nouveau mot de passe est : ${newPassword}\n\nVeuillez utiliser ce mot de passe pour vous connecter. Nous vous recommandons de modifier votre mot de passe après vous être connecté.\n`,
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {
  UserMail,
  sendNewPasswordEmail,
};
