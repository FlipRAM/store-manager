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

  const product = await prodServ.add(name);

  return res.status(201).json(product);
};

const update = async (req, res, _next) => {
  const { id } = req.params;
  const { name } = req.body;

  const updated = await prodServ.update(id, name);

  if (!updated) return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json(updated);
};

const deleteProd = async (req, res, _next) => {
  const { id } = req.params;

  const deleted = await prodServ.deleteProd(id);

  if (deleted === null) return res.status(404).json({ message: 'Product not found' });
  
  return res.status(204).json();
};

module.exports = { getAll, getById, add, update, deleteProd };