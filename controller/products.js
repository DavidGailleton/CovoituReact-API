const Product = require('../models/products');
const { matchedData } = require('express-validator');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((posts) => {
      res.status(200).json({ message: 'Fetched product successfully.', posts: posts });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getByID = async (req, res, next) => {
  const productID = req.params.id;
  Product.findById(productID)
    .then((product) => {
      //verifier si le post est correct
      const matchData = matchedData(req);
      if (!matchData) {
        return res.json({
          message: 'id note found',
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

exports.getByName = async (req, res, next) => {
  const productName = req.params.name;
  Product.find({ name: productName })
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

exports.createProduct = async (req, res) => {
  const name = req.body.name;
  const depart = req.body.depart;
  const car = req.body.car;
  const heure = req.body.heure;
  const l100 = req.body.l100;
  const distance = req.body.distance;
  const place = req.body.place;

  //TO DO: ajouter des controles...

  // Creates a post in a mongo database
  const product = new Product({
    name: name,
    depart: depart,
    car: car,
    heure: heure,
    l100: l100,
    distance: distance,
    place: place,
  });

  product
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Products created successfully',
        post: result,
      });
    })
    .catch((error) => {
      console.log('error: ', error);
      //envoyer une réponse approprié
    });
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
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
      //envoyer une réponse approprié
    });
};

exports.deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).json({
        message: 'Products deleted successfully',
        post: result,
      });
    })
    .catch((error) => {
      console.log('error: ', error);
      //envoyer une réponse approprié
    });
};
