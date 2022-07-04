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

module.exports = { getAll, getById, addSale };