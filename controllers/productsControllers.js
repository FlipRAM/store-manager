const prodServ = require('../services/productsServices');

const getAll = async (_req, res, _next) => {
  const products = await prodServ.getAll();

  return res.status(200).json(products);
};

const getById = async (req, res, _next) => {
  const { id } = req.params;
  const product = await prodServ.getById(id);

  if (!product) return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json(product);
};

const add = async (req, res, _next) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: '"name" is required' });

  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  const product = await prodServ.add(name);

  return res.status(201).json(product);
};

module.exports = { getAll, getById, add };