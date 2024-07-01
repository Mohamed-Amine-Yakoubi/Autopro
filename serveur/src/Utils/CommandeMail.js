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
    console.log(error);
  } else {
    console.log("ready for messages", success);
  }
});

const CommandeMail = async (email, subject, html ) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_AUTH,
      to: email,
      subject: subject ,
      html:html  ,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server " });
  }
};

module.exports = CommandeMail;
