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

function addToMyFavorite(id, productName, price, img) {
  pool.query(
    `INSERT INTO users_favorite (id, product_name, product_price, image_path)
               VALUES (?, ?, ?, ?)`,
    [id, productName, price, img]
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

function deleteToMyFavorite(id, productName, price) {
  pool.query(
    `DELETE FROM users_favorite 
            WHERE id = ? AND product_name = ? AND product_price = ?`,
    [id, productName, price]
  );
}

function deleteToAddToCart(id, productName, quantity) {
  pool.query(
    `DELETE FROM users_addtocart 
            WHERE id = ? AND product_name = ? AND product_quantity = ?`,
    [id, productName, quantity]
  );
}

async function getMyCarts (id){
  const result = await pool.query(`
              SELECT *
              FROM users_addtocart
              WHERE id = ?`, [id])

  return result;  
}

module.exports = { addToCart, saveUsersData, getUserInfoLogin, getUserId, addToMyFavorite, deleteToMyFavorite, getMyCarts, deleteToAddToCart };
