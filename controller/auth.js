const { validationResult } = require('express-validator'); // Importation de validationResult pour valider les résultats de la requête
const bcrypt = require('bcryptjs'); // Importation de bcrypt pour le hachage du mot de passe
const jwt = require('jsonwebtoken'); // Importation de jsonwebtoken pour gérer les tokens JWT

const User = require('../models/user'); // Importation du modèle User

// Fonction pour l'inscription d'un utilisateur
exports.signup = (req, res, next) => {
  const errors = validationResult(req); // Validation des erreurs dans la requête
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array(); // Stockage des erreurs de validation
    throw error;
  }
  const email = req.body.email; // Récupération de l'email depuis le corps de la requête
  const name = req.body.name; // Récupération du nom depuis le corps de la requête
  const password = req.body.password; // Récupération du mot de passe depuis le corps de la requête

  bcrypt
    .hash(password, 12) // Hachage du mot de passe avec un coût de 12
    .then((hashedPw) => {
      const user = new User({
        email: email,
        password: hashedPw, // Stockage du mot de passe haché dans la base de données
        name: name,
      });
      return user.save(); // Enregistrement de l'utilisateur dans la base de données
    })
    .then((result) => {
      res.status(201).json({ message: 'User created!', userId: result._id }); // Réponse en cas de succès
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// Fonction de connexion de l'utilisateur
exports.login = (req, res, next) => {
  const email = req.body.email; // Récupération de l'email depuis le corps de la requête
  const password = req.body.password; // Récupération du mot de passe depuis le corps de la requête
  let loadedUser;
  User.findOne({ email: email }) // Recherche de l'utilisateur par email dans la base de données
    .then((user) => {
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error; // Erreur si l'utilisateur n'est pas trouvé
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password); // Comparaison du mot de passe fourni avec le mot de passe haché enregistré
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error; // Erreur si le mot de passe est incorrect
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        process.env.JWT_KEY, // Création d'un token JWT avec les informations de l'utilisateur
        { expiresIn: '1h' }, // Durée de validité du token (1 heure)
      );
      res.status(200).json({
        token: token,
        userId: loadedUser._id.toString(),
        name: loadedUser.name.toString(),
        email: loadedUser.email.toString(),
      }); // Réponse avec le token et les informations de l'utilisateur
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
