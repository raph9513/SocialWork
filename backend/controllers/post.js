
const db = require("../models");
const Post = db.posts;


// CREATION DU POST

exports.createPost = (req, res, next) => {
  Post.create({
    userId: req.body.userId,
    content: req.body.content,
    title: req.body.title,
   /* likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []*/
  })

    .then((post) => res.status(201).json(post))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};
// RECUPERE TOUT LES POST D'UN USER
exports.findAllPostUser = (req, res, next) => {
  
  Post.findAll({
    include: ["user"],
    where: { userId: req.params.userId },
  })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(500).json(error));
};
// RECUPERE TOUT LES POSTS
exports.getAllPosts = (req, res, next) => {
  return Post.findAll({
    include: ["user"],
  })
    .then((posts) => {
      return res.status(200).json(posts);
    })
    .catch((error) => {
      return res.status(500).json({error});
    });
};
// MODIFICATION DU POST
exports.updatePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
  .then((post) => {
    const postUserId = post.userId;
    if (req.token === postUserId || req.admin === true) {
      const id = req.params.id;
      Post.update(req.body, {
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "Post mis a jour ",
            });
          } else {
            res.send({
              message: "impossible de mettre a jour le post il n'existe pas",
            });
          }
        })

        .catch((err) => {
          res.status(500).send({
            message: "errror",
          });
        });
    } else {
      res.status(400).json({ error: "Vous n'avez pas la permission " });
    }
  });
};
// SUPPRESSION DU POST
          
exports.deletePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } }).then((post) => {
    const postUserId = post.userId;
    if (req.token === postUserId  || req.admin === true) {
      Post.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "Le post a etait supprimé !" }))
        .catch((error) => res.status(400).json({ error }));
    } else {
      res.status(400).json({ error: "Vous n'avait pas la permission" });
    }
  });
};        

//GESTION DES LIKES
/*
exports.likePost = (req, res, next) => {
  const like = req.body.like;
  switch (like) {
    //l'utilisateur aime : on ajoute son id au tableau et on incrémente les likes
    case 1:
      Post.updateOne({ _id: req.params.id }, {
        $inc: { likes: +1 },
        $push: { usersLiked: req.body.userId }
      })
        .then(() => res.status(201).json({ message: "J'aime ajouté" }))
        .catch(error => res.status(500).json({ error }))
      break;

    //l'utilisateur n'aime pas : on ajoute son id au tableau et on incrémente les likes
    case -1:
      Post.updateOne({ _id: req.params.id }, {
        $push: { usersDisliked: req.body.userId }, $inc: { dislikes: +1 }
      })
        .then(() => res.status(201).json({ message: "je n'aime pas ajouté" }))
        .catch(error => res.status(500).json({ error }))
      break;

    //l'utilisateur annule son choix : on retire l'utilisateur du tableau et on désincrémente les likes ou dislikes suivant le tableau dans lequel il se trouvait
    case 0:
      Post.findOne({ _id: req.params.id })
        .then(post => {
          if (post.usersLiked.includes(req.body.userId)) {
            Post.updateOne({ _id: req.params.id }, {
              $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 }
            })
              .then(() => res.status(201).json({ message: "j'aime a été retiré !" }))
              .catch(error => res.status(500).json({ error }))
          }
          else {
            Post.updateOne({ _id: req.params.id }, {
              $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 }
            })
              .then(() => res.status(201).json({ message: "je n'aime pas été retiré !" }))
              .catch(error => res.status(500).json({ error }))
          }

        })
        .catch(error => res.status(500).json({ error }))
      break;

    default: console.log(req.body)
  }
};*/
     
    

