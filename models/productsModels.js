const connection = require('./connection');

const getAll = async () => {
  const [rows] = await connection.query('SELECT * FROM StoreManager.products;');
  return rows;
};

const getById = async (id) => {
  const [result] = await connection.query(`SELECT * FROM StoreManager.products
    WHERE id = ?;`, [id]);
  if (!result.length) return null;
  return result[0];
};

const add = async (name) => {
  const [product] = await connection.query(
    'INSERT INTO StoreManager.products (name) VALUES (?);', [name],
  );
  const id = product.insertId;
  const match = getById(id);
  return match;
};

const update = async (id, newName) => {
  const ifExist = await getById(id);
  if (ifExist !== null) {
    await connection.query(
      'UPDATE StoreManager.products SET name = ? WHERE id = ?',
      [newName, id],
    );
    return {
      id,
      name: newName,
    };
  }
  return ifExist;
};

const deleteProd = async (id) => {
  const ifExist = await getById(id);
  if (ifExist !== null) {
    await connection.query(
      'DELETE FROM StoreManager.products WHERE id = ?',
      [id],
    );
    return true;
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