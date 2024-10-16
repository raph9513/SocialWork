const db = require("../models");
const comment = require("../models/comment");
const Comment = db.comments;

// CREATION DE COMMENTAIRE
exports.createComment = (req, res, next) => {
  Comment.create({
    postId: req.body.postId,
    comment: req.body.comment,
    userId: req.body.userId,
  })

    .then(() => res.status(201).json({ message: "commentaire crée!" }))
    .catch((error) => res.status(400).json({ error }));
};
// RECUPERATION DE TOUT LES COMMENTAIRES
exports.getAllComments = (req, res, next) => {
  Comment.findAll({
    include: ["user"],
    where: { postId: req.params.postId },
  })
    .then((comments) => {
      const msg = "Voici les commentaires";
      res.status(200).json({ msg, comments });
    })
    .catch((error) => res.status(404).json({ msg: "Impossible d'afficher les commentaires, il y a eu une erreur", error }));
};
//MODIFICATION COM
/*exports.updateComment = (req, res, next) => {
  Comment.findOne({ where: { id: req.params.id }})
      .then(() => {
          Comment.update({ ...req.body }, { where: { id: req.params.id } });
          res.status(200).json({ message: 'Commentaire modifié !'});
      })
      .catch(error => res.status(400).json({ error }));
};*/
exports.updateComment = (req, res, next) => {
  Comment.findOne({ where: { id: req.params.id } }).then((com) => {
    const comUserId = com.userId;
    if (req.token === comUserId || req.admin === true) {
      const id = req.params.id;
      Comment.update(req.body, {
        where: { id: id },
      })
        .then(() => {
          res.send({
            message: "commentaire mise a jour ",
          });
        })

        .catch((err) => {
          res.status(500).send({
            err,
          });
        });
    } else {
      res.status(400).json({ error: "Vous n'avez pas la permission " });
    }
  });
};

// SUPPRESSION DU COMMENTAIRE
exports.deleteComment = (req, res, next) => {
  Comment.findOne({ where: { id: req.params.id } }).then((comment) => {
    // recuperation de l'id du createur du commentaire
    const commentUserId = comment.userId;
    if (req.token === commentUserId || req.admin === true) {
      // Si l'userId de la requete et le meme que le createur du commentaire
      Comment.destroy({ where: { id: req.params.id } }) // ont supprime le commentaire avec son id
        .then(() => res.status(200).json({ message: "commentaire supprimé !" }))
        .catch((error) => res.statuse(400).json({ error }));
    } else {
      // Sinon ont renvoie une erreur
      res.status(400).json({ error: "Vous n'avait pas la permission" });
    }
  });
};
