// Importation de multer
const multer = require("multer");

// Définition du dictionnaire de MIME TYPES
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
};

// Destination du fichier (répertoire) et générer un nom de fichier unique
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

// Exportation de multer
module.exports = multer({ storage }).single("image");
