const express = require('express');
const router = express.Router();

const viewsRoutes = require('./views');

router.use('/', viewsRoutes);

module.exports = router;