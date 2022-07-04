const saleServ = require('../services/salesServices');

const getAll = async (_req, res, _next) => {
  const sales = await saleServ.getAll();

  return res.status(200).json(sales);
};

const getById = async (req, res, _next) => {
  const { id } = req.params;

  const sale = await saleServ.getById(id);

  if (sale.length === 0) return res.status(404).json({ message: 'Sale not found' });

  return res.status(200).json(sale);
};

const add = async (req, res, _next) => {
  const arraySale = req.body;

  const sale = await saleServ.addSale(arraySale);

  if (sale === null) return res.status(404).json({ message: 'Product not found' });

  return res.status(201).json(sale);
};

const update = async (req, res, _next) => {
  const { id } = req.params;
  const arraySale = req.body;

  const updated = await saleServ.update(id, arraySale);

  if (updated.message !== undefined) return res.status(404).json({ message: updated.message });

  return res.status(200).json(updated);
};

const deleteSale = async (req, res, _next) => {
  const { id } = req.params;

  const deleted = await saleServ.deleteSale(id);

  if (deleted === null) return res.status(404).json({ message: 'Sale not found' });

  return res.status(204).json();
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  deleteSale,
};