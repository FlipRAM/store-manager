const saleModel = require('../models/salesModels');

const getAll = async () => {
  const sales = await saleModel.getAll();

  return sales;
};

const getById = async (id) => {
  const sale = await saleModel.getById(id);
  
  return sale;
};

const addSale = async (arrayOfSales) => {
  const response = await saleModel.addSale(arrayOfSales);

  return response;
};

const update = async (id, arrayOfSales) => {
  const response = await saleModel.update(id, arrayOfSales);

  return response;
};

const deleteSale = async (id) => {
  const response = await saleModel.deleteSale(id);

  return response;
};

module.exports = { getAll, getById, addSale, update, deleteSale };