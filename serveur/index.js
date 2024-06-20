const express = require("express");
require("dotenv").config({ path: `${process.cwd()}/.env` });
const morgan = require("morgan");
const cors = require("cors");

const { DbConnection, sequelize } = require("./src/config/Database");
const UserRouter = require("./src/Routers/UserRouter");
const ProductRouter = require("./src/Routers/ProductRouter");
const CategoryRouter = require("./src/Routers/CategoryRouter");
const SubCategoryRouter = require("./src/Routers/SubCategoryRouter");
const MagasinRouter = require("./src/Routers/MagasinRouter");
const VilleRouter = require("./src/Routers/VilleRouter");
const MarqueRouter = require("./src/Routers/MarqueRouter");
const MotorisationRouter = require("./src/Routers/MotorisationRouter");
const ModeleRouter = require("./src/Routers/ModeleCarRouter");
const FavorisRouter = require("./src/Routers/FavorisRouter");
const CommandeRouter = require("./src/Routers/CommandeRouter");
const ApiError = require("./src/Utils/ApiError");
const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(morgan("dev"));
app.use(cors());

/************************/

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/commande", CommandeRouter);
app.use("/api/v1/favoris", FavorisRouter);
app.use("/api/v1/Marque", MarqueRouter);
app.use("/api/v1/Motorisation",MotorisationRouter);
app.use("/api/v1/Modele", ModeleRouter);
app.use("/api/v1/product", ProductRouter);
app.use("/api/v1/category", CategoryRouter);
app.use("/api/v1/subcategory", SubCategoryRouter);
app.use("/api/v1/magasin", MagasinRouter);
app.use("/api/v1/ville", VilleRouter);
app.all("*", (req, res, next) => {
  next(new ApiError(`can't find this route :${req.originalUrl}`, 400));
});
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(400).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
});
/************************/
DbConnection()
  .then(() => {
    // Sync models with database
    return sequelize.sync({ alter: true }); // Sync without force:true
  })
  .then(() => {
    console.log("Database setup complete");
    const port = process.env.PORT;
    app.listen(port, (req, res) => {
      console.log(`Le serveur écoute sur le port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error setting up database:", error);
  });
/************************/
