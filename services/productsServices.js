const prodModel = require('../models/productsModels');

const getAll = async () => {
  const products = await prodModel.getAll();

  return products;
};

const getById = async (id) => {
  const product = await prodModel.getById(id);

  return product;
};

module.exports = { getAll, getById };