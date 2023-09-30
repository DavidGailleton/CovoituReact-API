// Importation du module Express
const express = require('express');

// Importation des fonctions de contrôleur pour les produits depuis le fichier ../controller/products
const {
  getProducts,
  getByID,
  deleteProduct,
  updateProduct,
  createProduct,
  getByName,
  deleteProductByName,
} = require('../controller/products');

// Création d'un routeur Express
const router = express.Router();

// Définition des routes et de leurs gestionnaires

// Route pour obtenir tous les produits
router.get('/getproducts', getProducts);

// Route pour obtenir un produit par son ID
router.get('/getproducts/:id', getByID);

// Route pour obtenir un produit par son nom
router.get('/getproducts/name/:name', getByName);

// Route pour supprimer un produit par son ID
router.delete('/deleteproduct/:id', deleteProduct);

// Route pour supprimer un produit par son nom
router.delete('/deleteproduct/name/:name', deleteProductByName);

// Route pour mettre à jour un produit par son ID
router.put('/updateproduct/:id', updateProduct);

// Route pour créer un nouveau produit
router.post('/createproduct', createProduct);

// Exportation du routeur pour qu'il puisse être utilisé dans d'autres parties de l'application
module.exports = router;
