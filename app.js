const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");

mongoose
  .connect(
    "mongodb://usgnvs1hppxhatar2xl7:xRwau1uyvC6za2YfTVxn@brogbj3a6nukl60-mongodb.services.clever-cloud.com:27017/brogbj3a6nukl60",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

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

app.use("images", express.static(path.join(__dirname, "images")));

app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
