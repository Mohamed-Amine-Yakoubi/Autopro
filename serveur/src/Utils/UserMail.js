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
    const Autopro_logo_URL =
    "https://res.cloudinary.com/dszbzybhk/image/upload/v1723404962/c76ktevrn9lvxad0pmux.png";
    await transporter.sendMail({
      from: process.env.EMAIL_AUTH,
      to: email,
      subject: "Réinitialisation du mot de passe",
      html: `     <html>
<head>
  <style>
    /* Add your CSS styles here */
    body {
      font-family: Arial, sans-serif;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #f9f9f9;
    }
    h1 {
      color: #333;
    }
    p {
      color: #666;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #4BAF4F;
     color: #ffffff !important; 
      flex:center;
      text-decoration: none;
      border-radius: 5px;
    }
      .logo_Auto{
      display: flex !important;
      justify-content:center !important;
      }
        .logo {
                  display: flex !important;
      justify-content:center !important;
         width: 300px;
       }
  </style>
</head>
<body>
  <div class="container">
  <div class="logo_Auto" >
        <img src="${Autopro_logo_URL}" class="logo" alt="logo" />
        </div>
    <h1>Bienvenue Chez Autopro!</h1>

    <p>Votre nouveau mot de passe est : ${newPassword}\n\n
    <p>Veuillez utiliser ce mot de passe pour vous connecter. 
    Nous vous recommandons de modifier votre mot de passe après vous être connecté.\n</p>
    <p>Merci pour votre confiance.</p>
    
  </div>
</body>
</html>`,
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {
  UserMail,
  sendNewPasswordEmail,
};
