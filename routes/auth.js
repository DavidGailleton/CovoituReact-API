// Importation du module Express
const express = require('express');

// Importation du module Express-validator pour la validation des entrées
const { body } = require('express-validator');

// Importation du modèle User depuis le fichier ../models/user
const User = require('../models/user');

// Importation du contrôleur d'authentification depuis le fichier ../controller/auth
const authController = require('../controller/auth');

// Importation du middleware d'authentification depuis le fichier ../middleware/is-auth
const auth = require('../middleware/is-auth');

// Création d'un routeur Express
const router = express.Router();

// Définition des routes et de leurs gestionnaires

// Route pour l'inscription d'un nouvel utilisateur
router.put(
  '/signup',
  [
    // Validation des champs de formulaire avec des règles spécifiques
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 5 }), // Le mot de passe doit avoir au moins 5 caractères
    body('name').trim().not().isEmpty(), // Le nom ne doit pas être vide
  ],
  authController.signup, // Gestionnaire de route pour l'inscription
);

// Route pour la connexion de l'utilisateur
router.put('/login', authController.login); // Gestionnaire de route pour la connexion

// Route protégée nécessitant une authentification pour y accéder
router.get('/auth-endpoint', auth, (request, response) => {
  response.json({ message: 'You are authorized to access me', user: User });
});

// Exportation du routeur pour qu'il puisse être utilisé dans d'autres parties de l'application
module.exports = router;
