const mysql = require('mysql2');

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'password',
  database: 'mydatabase'
}).promise();


function addToCart (id, productName, price, quantity, img) {
   pool.query(`INSERT INTO users_carts (id, product_name, product_price, quantity, img_path)
               VALUES (?, ?, ?, ?, ?)`,
               [id, productName, price, quantity, img]);

}

function saveUsersData(id, username, email, password, dateNow) {
   pool.query(`INSERT INTO users (id, username, email, password, register_date)
              VALUES (?, ?, ?, ?, ?)`,
              [id, username, email, password, dateNow]);

}




async function getUserInfoLogin(username, password) {
   const [row] = await pool.query(`
      SELECT username, password
      FROM users
      WHERE username = ? AND password = ?`,
      [username, password]);

   
   return row || -1;
}

async function getUserId (username) {
   const [result] = await pool.query(`
      SELECT id 
      FROM users
      WHERE username = ?`,
      [username]);

   return result;
}



module.exports = { addToCart, saveUsersData, getUserInfoLogin, getUserId };