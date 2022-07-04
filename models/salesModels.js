const connection = require('./connection');
const prodModel = require('./productsModels');

const serialize = (obj) => ({
  saleId: obj.sale_id,
  date: obj.date,
  productId: obj.product_id,
  quantity: obj.quantity,
});

const checkIfProdExist = async (array) => {
  const idExist = await Promise.all(array.map(async (element) => {
    if (element.productId === undefined) return false;
    const id = await prodModel.getById(element.productId);
    return (id !== null);
  }));
  if (idExist.includes(false)) return null;
  return true;
};

const checkExistId = async (id) => {
  try {
    const [result] = await connection.query(`SELECT * FROM StoreManager.sales
      WHERE id = ?;`, [id]);
    if (!result.length) return null;
    return result[0];
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const getAll = async () => {
  try {
    const [rows] = await connection.query(
      `SELECT sp.sale_id, sp.product_id, sp.quantity, s.date FROM StoreManager.sales_products as sp
      INNER JOIN StoreManager.sales as s
      ON sp.sale_id = s.id;`,
    );
    const response = rows.map((e) => serialize(e));
    return response;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const getById = async (id) => {
  try {
    const [rows] = await connection.query(
      `SELECT sp.sale_id, sp.product_id, sp.quantity, s.date FROM StoreManager.sales_products as sp
      INNER JOIN StoreManager.sales as s
      ON sp.sale_id = s.id
      WHERE sale_id = ?`,
      [id],
    );
    const response = rows.map((e) => ({
      date: e.date,
      productId: e.product_id,
      quantity: e.quantity,
    }));
    return response;
  } catch (err) {
    console.log(err);
    return process.exit(1);
  }
};

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
  const exist = await checkIfProdExist(saleArray);
  if (exist === null) return null;

  const insertQuery = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
  const [sale] = await connection.execute(insertQuery);
  const id = sale.insertId;
  const response = await getSaleId(id, saleArray);
  return response;
};

const update = async (id, saleArray) => {
  const exist = await checkIfProdExist(saleArray);
  if (exist === null) return { message: 'Product not found' };
  const ifExist = await checkExistId(id);
  if (ifExist !== null) {
    try {
      const updateQuery = `UPDATE StoreManager.sales_products
      SET quantity = ? WHERE sale_id = ? AND product_id = ?`;
      await saleArray.forEach(async (element) => {
        await connection.query(updateQuery, [element.quantity, id, element.productId]);
      });
      return { saleId: id, itemsUpdated: saleArray };
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }
  return { message: 'Sale not found' };
};

const deleteSale = async (id) => {
  const ifExist = await checkExistId(id);

  if (ifExist !== null) {
    try {
      await connection.query(
        'DELETE FROM StoreManager.sales WHERE id = ?',
        [id],
      );
      await connection.query(
        'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
        [id],
      );
      return true;
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }

  return ifExist;
};

module.exports = { getAll, getById, getSaleId, addSale, update, deleteSale };