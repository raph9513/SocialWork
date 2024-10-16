const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // ont recupere le token dans le header de la requete
    const decript = jwt.verify(token, process.env.JWT_KEY); // Ont verifie le token 
    req.token = decript.userId;                            // ont recupere l'user id decripter dans le token 
    req.admin = decript.admin;                             // ont recuperer si l'user est admin ou non 
    next();
  } catch (error) {
    res.status(401).json({
      error,
    });
  }
};
