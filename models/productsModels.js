const connection = require('./connection');

const getAll = async () => {
  try {
    const [rows] = await connection.query('SELECT * FROM StoreManager.products;');
    return rows;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const getById = async (id) => {
  try {
    const [result] = await connection.query(`SELECT * FROM StoreManager.products
      WHERE id = ?;`, [id]);
    if (!result.length) return null;
    return result[0];
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const add = async (name) => {
  let id;
  try {
    const [product] = await connection.query(
      'INSERT INTO StoreManager.products (name) VALUES (?);', [name],
    );
    id = product.insertId;
  } catch (err) {
    console.log(err);
    return process.exit(1);
  }
  const match = getById(id);
  return match;
};

const update = async (id, newName) => {
  const ifExist = await getById(id);
  if (ifExist !== null) {
    try {
      await connection.query(
        'UPDATE StoreManager.products SET name = ? WHERE id = ?',
        [newName, id],
      );
      return {
        id,
        name: newName,
      };
    } catch (err) {
      console.log(err);
      return process.exit(1);
    }
  }
  return ifExist;
};

const deleteProd = async (id) => {
  const ifExist = await getById(id);
  if (ifExist !== null) {
    try {
      await connection.query(
        'DELETE FROM StoreManager.products WHERE id = ?',
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

const getByName = async (q) => {
  const nameQuery = `SELECT * FROM StoreManager.products WHERE name like '%${q}%'`;
  const [match] = await connection.query(nameQuery);
  if (match.length === 0) return [];

  return match;
};

module.exports = { getAll, getById, add, update, deleteProd, getByName };