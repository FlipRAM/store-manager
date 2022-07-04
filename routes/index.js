const express = require('express');
require('dotenv').config();

const router = express.Router();

const prodControl = require('../controllers/productsControllers');
const saleControl = require('../controllers/salesControllers');

const prodMid = require('../middlewares/productMiddleware');
const saleMid = require('../middlewares/salesMiddleware');

router.get('/products', prodControl.getAll);

router.get('/products/:id', prodControl.getById);

router.post('/products', prodMid.checkName, prodControl.add);

router.put('/products/:id', prodMid.checkName, prodControl.update);

router.get('/sales', saleControl.getAll);

router.get('/sales/:id', saleControl.getById);

router.post('/sales', saleMid.checkId, saleMid.checkQuant, saleControl.add);

module.exports = router;