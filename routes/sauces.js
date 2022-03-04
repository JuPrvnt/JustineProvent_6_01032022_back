// Importation d'express
const express = require("express");

// Lancement de la fonction Router()
const router = express.Router();

// Importation du controlleurs des likes des sauces
const saucesCtrl = require("../controllers/sauces");

// Importation du middleware d'authentification
const auth = require("../middleware/auth");

// Importation du middleware multer pour la gestion des fichiers images
const multer = require("../middleware/multer-config");

// Les routes
router.post("/", auth, multer, saucesCtrl.createSauce);
router.post("/:id/like", auth, multer, saucesCtrl.likedSauces);
router.put("/:id", auth, multer, saucesCtrl.modifySauce);
router.delete("/:id", auth, saucesCtrl.deleteSauce);
router.get("/:id", auth, saucesCtrl.getOneSauce);
router.get("/", auth, saucesCtrl.getAllSauce);

// Exportation du module
module.exports = router;
