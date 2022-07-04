const prodModel = require('../models/productsModels');

const getAll = async () => {
  const products = await prodModel.getAll();

  return products;
};

const getById = async (id) => {
  const product = await prodModel.getById(id);

  return product;
};

const add = async (name) => {
  const product = await prodModel.add(name);

  return product;
};

const update = async (id, newName) => {
  const updated = await prodModel.update(id, newName);

  return updated;
};

const deleteProd = async (id) => {
  const deleted = await prodModel.deleteProd(id);

  return deleted;
};

const getByName = async (q) => {
  const response = await prodModel.getByName(q);

  return response;
};

module.exports = { getAll, getById, add, update, deleteProd, getByName };