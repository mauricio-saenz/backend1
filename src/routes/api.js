const express = require('express');
const router = express.Router();

const productsRoutes = require('./products');
const cartsRoutes = require('./carts');

router.use('/products', productsRoutes);
router.use('/carts', cartsRoutes);


module.exports = router;