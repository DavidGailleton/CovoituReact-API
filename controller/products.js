const Product = require('../models/products'); // Importation du modèle Product
const { matchedData } = require('express-validator'); // Importation de matchedData pour valider les données

// Fonction pour obtenir tous les produits
exports.getProducts = (req, res, next) => {
  Product.find() // Recherche tous les produits dans la base de données
    .then((posts) => {
      res.status(200).json({ message: 'Fetched product successfully.', posts: posts }); // Répond avec les produits trouvés
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// Fonction pour obtenir un produit par ID
exports.getByID = async (req, res, next) => {
  const productID = req.params.id; // Récupère l'ID du produit depuis les paramètres de la requête
  Product.findById(productID) // Recherche le produit par ID
    .then((product) => {
      const matchData = matchedData(req); // Validation des données de la requête
      if (!matchData) {
        return res.json({
          message: 'id not found',
        });
      }

      res.status(200).json({
        message: 'Product found',
        post: product,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

// Fonction pour obtenir un produit par nom
exports.getByName = async (req, res, next) => {
  const productName = req.params.name; // Récupère le nom du produit depuis les paramètres de la requête
  Product.find({ name: productName }) // Recherche le produit par nom
    .then((product) => {
      if (product.length === 0) {
        // Aucun produit correspondant n'a été trouvé
        res.status(404).json({
          message: 'Product not found',
        });
      } else {
        // Un produit correspondant a été trouvé
        res.status(200).json({
          message: 'Product found',
          post: product,
        });
      }
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

// Fonction pour créer un nouveau produit
exports.createProduct = async (req, res) => {
  const name = req.body.name; // Récupère les données du corps de la requête
  const mail = req.body.mail;
  const depart = req.body.depart;
  const car = req.body.car;
  const heure = req.body.heure;
  const l100 = req.body.l100;
  const distance = req.body.distance;
  const place = req.body.place;

  const product = new Product({
    name: name,
    mail: mail,
    depart: depart,
    car: car,
    heure: heure,
    l100: l100,
    distance: distance,
    place: place,
  });

  product
    .save() // Enregistre le produit dans la base de données
    .then((result) => {
      res.status(201).json({
        message: 'Products created successfully',
        post: result,
      });
    })
    .catch((error) => {
      console.log('error: ', error);
      // Envoyer une réponse appropriée en cas d'erreur
    });
};

// Fonction pour mettre à jour un produit
exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    mail: req.body.mail,
    depart: req.body.depart,
    car: req.body.car,
    heure: req.body.heure,
    l100: req.body.l100,
    distance: req.body.distance,
    place: req.body.place,
  })
    .then((result) => {
      res.status(201).json({
        message: 'Products updated successfully',
        post: result,
      });
    })
    .catch((error) => {
      console.log('error: ', error);
      // Envoyer une réponse appropriée en cas d'erreur
    });
};

// Fonction pour supprimer un produit
exports.deleteProduct = async (req, res) => {
  const product = await Product.findOneAndDelete(req.body.name)
    .then((result) => {
      res.status(200).json({
        message: 'Products deleted successfully',
        post: result,
      });
    })
    .catch((error) => {
      console.log('error: ', error);
    });
};

// Fonction pour supprimer un produit par nom
exports.deleteProductByName = async (req, res) => {
  try {
    console.log("Nom de l'utilisateur à supprimer :", req.params.name);
    const product = await Product.findOneAndDelete({ name: ObjectName(req.params) });
    console.log('Produit supprimé :', product);
    if (product) {
      // Suppression réussie
      res.status(200).json({
        message: 'Product deleted successfully',
        post: product,
      });
    } else {
      // Aucun produit correspondant trouvé
      res.status(404).json({
        message: 'Product not found',
      });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de l'annonce", error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};
