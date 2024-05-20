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

const VerificationEmail = async (email, token) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_AUTH,
      to: email,
      subject: "Activation de votre compte",
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
             background-color: #007bff;
             color:white;
             flex:center;
             text-decoration: none;
             border-radius: 5px;
           }
         </style>
       </head>
       <body>
         <div class="container">
           <h1>Bienvenue !</h1>
           <p>Merci de vous être inscrit sur notre plateforme.</p>
           <p>Pour activer votre compte, veuillez cliquer sur le bouton ci-dessous :</p>
           <a class="button" href="http://localhost:4000/api/v1/user/activate/${token}">Activer mon compte</a>
           <p>Si le bouton ne fonctionne pas, vous pouvez également copier et coller le lien suivant dans votre navigateur :</p>
           <p><a href="http://localhost:4000/api/v1/user/activate/${token}">lien</a></p>
         </div>
       </body>
     </html>`,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server " });
  }
};

module.exports = VerificationEmail;
