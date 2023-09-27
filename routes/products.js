const express = require('express');

const {
  getProducts,
  getByID,
  deleteProduct,
  updateProduct,
  createProduct,
  getByName,
} = require('../controller/products');

const router = express.Router();

router.get('/getproducts', getProducts);

router.get('/getproducts/:id', getByID);

router.get('/getproducts/name/:name', getByName);

router.delete('/deleteproduct/:id', deleteProduct);

router.put('/updateproduct/:id', updateProduct);

router.post('/createproduct', createProduct);

module.exports = router;
