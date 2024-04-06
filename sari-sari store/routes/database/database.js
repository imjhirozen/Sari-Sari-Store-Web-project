const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "localdb",
  })
  .promise();

function addToCart(id, productName, price, quantity, img) {
  pool.query(
    `INSERT INTO users_addtocart (id, product_name, product_price, product_quantity, image_path)
               VALUES (?, ?, ?, ?, ?)`,
    [id, productName, price, quantity, img]
  );
}

function saveUsersData(id, username, email, password, dateNow) {
  pool.query(
    `INSERT INTO users (id, username, email, password, register_date)
              VALUES (?, ?, ?, ?, ?)`,
    [id, username, email, password, dateNow]
  );
}

async function getUserInfoLogin(username, password) {
  const [row] = await pool.query(
    `
      SELECT id, username, password
      FROM users
      WHERE username = ? AND password = ?`,
    [username, password]
  );

  return row;
}

async function getUserId(id) {
  const [result] = await pool.query(
    `
      SELECT id 
      FROM users
      WHERE id = ?`,
    [id]
  );

  return result;
}

module.exports = { addToCart, saveUsersData, getUserInfoLogin, getUserId };
