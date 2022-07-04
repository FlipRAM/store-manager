const saleModel = require('../models/salesModels');

const addSale = async (arrayOfSales) => {
  const response = await saleModel.addSale(arrayOfSales);

  return response;
};

module.exports = { addSale };