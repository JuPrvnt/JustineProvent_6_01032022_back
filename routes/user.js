// Importation d'express
const express = require("express");

// Lancement de la fonction Router()
const router = express.Router();

// Importation du controlleur user
const userCtrl = require("../controllers/user");

// Route du endpoint signup
router.post("/signup", userCtrl.signup);

// Route du endpoint login
router.post("/login", userCtrl.login);

// Exportation du module router
module.exports = router;
