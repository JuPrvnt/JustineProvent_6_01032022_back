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
    let name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];

    if (extension) {
      name = name.toLowerCase().replace("." + extension, "_");
      if (extension === "jpg" || extension === "jpeg") {
        name =
          extension === "jpg"
            ? name.replace(".jpeg", "_")
            : name.replace(".jpg", "_");
      }
    }

    callback(null, name + Date.now() + "." + extension);
  },
});

// Exportation de multer
module.exports = multer({ storage }).single("image");
