const saleServ = require('../services/salesServices');

const add = async (req, res, _next) => {
  const arraySale = req.body;

  const product = await saleServ.addSale(arraySale);

  if (product === null) return res.status(404).json({ message: 'Product not found' });

  return res.status(201).json(product);
};

module.exports = {
  add,
};