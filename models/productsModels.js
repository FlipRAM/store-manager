const connection = require('./connection');

const getAll = async () => {
  try {
    const [rows] = await connection.query('SELECT * FROM StoreManager.products');
    return rows;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const getById = async (id) => {
  try {
    const [result] = await connection.query(`SELECT * FROM StoreManager.products
      WHERE id = ?`, [id]);
    if (!result.length) return null;
    return result[0];
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

module.exports = { getAll, getById };