// Importation du module jsonwebtoken pour gérer les jetons JWT (JSON Web Tokens)
const jwt = require('jsonwebtoken');

// Exportation du middleware qui vérifie l'authentification de l'utilisateur
module.exports = async (req, res, next) => {
  try {
    // Récupération du jeton d'authentification depuis l'en-tête de la requête
    const token = await req.headers.authorization.split(' ')[1];

    // Vérification et décryptage du jeton en utilisant la clé secrète JWT (process.env.JWT_KEY)
    const decodedToken = await jwt.verify(token, process.env.JWT_KEY);

    // Stockage des données de l'utilisateur extraites du jeton dans req.user
    const user = await decodedToken;
    req.user = user;

    // Passage au middleware suivant
    next();
  } catch (err) {
    // En cas d'erreur lors de la vérification du jeton
    res.status(401).json({
      err: new Error('Invalid request !'),
    });
  }
};
