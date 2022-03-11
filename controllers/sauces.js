// Importation du model de la base de donnée MongoDB
const Sauce = require("../models/Sauces");

// Importation du module fs de node.js pour accéder au fichier du serveur
const fs = require("fs");

// Création d'une sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
    .catch((error) => res.status(400).json({ error }));
};

// Modification d'une sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.findOne({ _id: req.params.id }).then((data) => {
    const filename = data.imageUrl.split("/images/")[1];
    fs.unlink(`images/${filename}`, () => {});
  });
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
    .catch((error) => res.status(400).json({ error }));
};

// Like ou dislike d'une sauce
exports.likedSauces = (req, res, next) => {
  const like = req.body.like;
  const idSauce = req.params.id;

  Sauce.findOne({ _id: idSauce }).then((sauce) => {
    const idIncluded =
      !sauce.usersLiked.includes(req.body.userId) &&
      !sauce.usersDisliked.includes(req.body.userId);
    if (like === 1 && idIncluded) {
      Sauce.updateOne(
        { _id: idSauce },
        {
          $push: { usersLiked: req.body.userId },
          $inc: { likes: +1 },
        }
      )
        .then(() => res.status(200).json({ message: "Like ajoutée !" }))
        .catch((error) => res.status(400).json({ error }));
    } else if (like === -1 && idIncluded) {
      Sauce.updateOne(
        { _id: idSauce },
        {
          $push: { usersDisliked: req.body.userId },
          $inc: { dislikes: +1 },
        }
      )
        .then(() => res.status(200).json({ message: "Dislike ajoutée !" }))
        .catch((error) => res.status(400).json({ error }));
    } else {
      if (sauce.usersLiked.includes(req.body.userId)) {
        Sauce.updateOne(
          { _id: idSauce },
          {
            $pull: { usersLiked: req.body.userId },
            $inc: { likes: -1 },
          }
        )
          .then(() => res.status(200).json({ message: "Like retirée !" }))
          .catch((error) => res.status(400).json({ error }));
      } else if (sauce.usersDisliked.includes(req.body.userId)) {
        Sauce.updateOne(
          { _id: idSauce },
          {
            $pull: { usersDisliked: req.body.userId },
            $inc: { dislikes: -1 },
          }
        )
          .then(() => res.status(200).json({ message: "Dislike retirée !" }))
          .catch((error) => res.status(400).json({ error }));
      }
    }
  });
};

// Suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (!sauce) {
        res.status(404).json({
          error: new Error("Vous ne pouvez pas supprimer cette sauce !"),
        });
      }

      // Empêchement que n'importe quel utilisateur supprime une sauce
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// Récupération d'une sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

// Récupération de toutes les sauces
exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};
