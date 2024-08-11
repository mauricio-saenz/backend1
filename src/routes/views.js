const express = require('express');
const router = express.Router();

const FileController = require('../controllers/fileController');
const path = require('path');
const filePath = path.resolve('src/json/products.json');

router.get('/products', (req, res) => {

    const fileController = new FileController(filePath);
    const products = fileController.readFile();

    res.render('index', {
      title: 'Products',
      products: products
    });
});

router.get('/realtimeproducts', (req, res) => {

  const fileController = new FileController(filePath);
  const products = fileController.readFile();

  res.render('index', {
    title: 'Real time products',
    products: products
  });
});


module.exports = router;