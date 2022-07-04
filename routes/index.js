const express = require('express');
require('dotenv').config();

const router = express.Router();

const prodControl = require('../controllers/productsControllers');
const saleControl = require('../controllers/salesControllers');

const saleMid = require('../middlewares/salesMiddleware');

router.get('/products', prodControl.getAll);

router.get('/products/:id', prodControl.getById);

router.post('/products', prodControl.add);

router.post('/sales', saleMid.checkId, saleMid.checkQuant, saleControl.add);

module.exports = router;