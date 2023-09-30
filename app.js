// Importation des modules nécessaires
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Permet de charger des variables d'environnement à partir d'un fichier .env

// Importation des routes pour les produits et l'authentification
const productsRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');

// Middleware pour l'authentification
const auth = require('./middleware/is-auth');

// Création de l'application Express
const app = express();

// Activation de la gestion des CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware pour la gestion des données JSON dans les requêtes
app.use(bodyParser.json());

// Utilisation des routes définies pour l'authentification et les produits
app.use('/auth', authRoutes);
app.use('/products', productsRoutes);

// Middleware pour l'authentification (appliqué à toutes les routes après cette ligne)
app.use(auth);

// Connexion à la base de données MongoDB
mongoose
  .connect(
    'mongodb+srv://David:Adm1n069@cluster0.ov3vohk.mongodb.net/Covoitureact?retryWrites=true&w=majority',
  )
  .then((result) => {
    // Démarrage du serveur Express sur le port 3003
    app.listen(3003, () => {
      console.log('App is listening on port 3003');
    });
  })
  .catch((e) => console.log('Connexion à la BDD échouée' + e));
