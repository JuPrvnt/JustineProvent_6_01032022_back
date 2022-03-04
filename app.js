// Importation de express
const express = require("express");

// Importation de la connexion à la base de données mongoDB
const mongoose = require("mongoose");

// Importation utilitaire de node.js pour travailler avec les chemins de fichiers
const path = require("path");

// Importation des routes
const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");

// Création de l'application express
const app = express();

// Module pour les variables d'environnement
require("dotenv").config();

mongoose
  .connect(process.env.BDD_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.log(error));

// Pour gérer les problèmes de CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Intercepte toutes les requêtes qui contiennent du JSON
// pour le mettre à disposition sur l'objet requête dans req.body
// remplace body parser
app.use(express.json());

// La route des images uploadées
app.use("/images", express.static(path.join(__dirname, "images")));

// La route des sauces
app.use("/api/sauces", saucesRoutes);

// La route d'authentification
app.use("/api/auth", userRoutes);

// Exportation de app.js pour pouvoir y accéder depuis un autre fichier
module.exports = app;
