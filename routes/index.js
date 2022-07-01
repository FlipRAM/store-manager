const express = require('express');
require('dotenv').config();

const router = express.Router();

const prodControl = require('../controllers/productsControllers');

router.get('/products', prodControl.getAll);

router.get('/products/:id', prodControl.getById);

module.exports = router;