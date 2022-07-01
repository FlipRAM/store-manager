const prodServ = require('../services/productsServices');

const getAll = async (_req, res, _next) => {
  const products = await prodServ.getAll();

  return res.status(200).json(products);
};

const getById = async (req, res, _next) => {
  const { id } = req.params;
  console.log(id);
  const product = await prodServ.getById(id);

  if (!product) return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json(product);
};

module.exports = { getAll, getById };