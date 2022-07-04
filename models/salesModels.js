const connection = require('./connection');
const prodModel = require('./productsModels');

const getSaleId = async (id, saleArray) => {
  await saleArray.forEach(async (element) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [id, element.productId, element.quantity],
    );
  });

  return {
    id,
    itemsSold: saleArray,
  };
};

const addSale = async (saleArray) => {
  const idExist = await Promise.all(saleArray.map(async (element) => {
    const id = await prodModel.getById(element.productId);
    return (id !== null);
  }));

  if (idExist.includes(false)) return null;

  const insertQuery = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
  const [sale] = await connection.execute(insertQuery);
  const id = sale.insertId;
  const response = await getSaleId(id, saleArray);
  return response;
};

module.exports = { getSaleId, addSale };