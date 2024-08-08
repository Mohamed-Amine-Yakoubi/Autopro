// server.js

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
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
const ChatRouter = require("./src/Routers/ChatRouter");
const FactureRouter = require("./src/Routers/FactureRouter");
const ApiError = require("./src/Utils/ApiError");
const Chat = require("./src/Models/ChatModel");
const { Op } = require("sequelize");
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Replace with your client-side URL
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Socket.io logic
const activeUsers = {}; // Object to track active users and their conversations

io.on("connection", (socket) => {
  console.log("Socket.io connected");

  socket.on("userLoggedIn", async (userId) => {
    activeUsers[userId] = {
      socketId: socket.id,
      conversations: [],
    };

    try {
      // Fetch distinct users with whom the current user has exchanged messages
      const [results, metadata] = await sequelize.query(`
        SELECT DISTINCT "Expediteur" AS user FROM "Chats" WHERE "Expediteur" = ${userId} OR "destinataire" = ${userId}
        UNION
        SELECT DISTINCT "destinataire" AS user FROM "Chats" WHERE "Expediteur" = ${userId} OR "destinataire" = ${userId}
      `);

      const users = results.map(result => result.user).filter(user => user !== userId);

      // Emit list of users to the frontend
      socket.emit('conversationsList', users);
    } catch (error) {
      console.error("Error fetching conversations list:", error);
    }

    // Update conversations list for other active users
    Object.keys(activeUsers).forEach((key) => {
      if (key !== userId && !activeUsers[key].conversations.includes(userId)) {
        activeUsers[key].conversations.push(userId);
      }
    });

    // Emit updated active users list to all clients
    io.emit('activeUsers', Object.keys(activeUsers));
  });

  socket.on("message", async (Contenu, Expediteur, destinataire) => {
    console.log(`Received message from ${Expediteur} to ${destinataire}: ${Contenu}`);
    try {
      const chat = await Chat.create({
        Contenu: Contenu,
        Expediteur: Expediteur,
        destinataire: destinataire,
      });
      console.log("Message saved to database:", chat);

      const receiverSocketId = activeUsers[destinataire];
      if (receiverSocketId && receiverSocketId.socketId) {
        socket.to(receiverSocketId.socketId).emit("message", { Contenu: Contenu, Expediteur });
      } else {
        console.log(`User with ID ${destinataire} is not online or not found.`);
        // Handle the scenario where the user is offline or not found
      }
    } catch (error) {
      console.error("Error saving message to the database:", error);
    }
  });

  socket.on("disconnect", () => {
    const userId = Object.keys(activeUsers).find(
      (key) => activeUsers[key].socketId === socket.id
    );
    if (userId) {
      delete activeUsers[userId];
    }
    // Emit updated active users list to all clients after disconnection
    io.emit('activeUsers', Object.keys(activeUsers));
    console.log("User disconnected");
  });
});

// Routes
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/chat", ChatRouter);
app.use("/api/v1/facture", FactureRouter);
app.use("/api/v1/commande", CommandeRouter);
app.use("/api/v1/favoris", FavorisRouter);
app.use("/api/v1/Marque", MarqueRouter);
app.use("/api/v1/Motorisation", MotorisationRouter);
app.use("/api/v1/Modele", ModeleRouter);
app.use("/api/v1/product", ProductRouter);
app.use("/api/v1/category", CategoryRouter);
app.use("/api/v1/subcategory", SubCategoryRouter);
app.use("/api/v1/magasin", MagasinRouter);
app.use("/api/v1/ville", VilleRouter);

// Error handling middleware
app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  res.status(statusCode).json({
    status,
    message: err.message,
  });
});

// Database connection and server start
DbConnection()
  .then(() => sequelize.authenticate())
  .then(() => sequelize.sync({ alter: true }))
  .then(() => {
    console.log("Database setup complete");
    const port = process.env.PORT || 4000;
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error setting up database:", error);
  });
