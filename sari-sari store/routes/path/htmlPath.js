const express = require('express');
const router = express.Router();
const path = require('path');

router.use(express.static(path.join(__dirname, '..', '..', 'public', 'client')));

router.get('/' ,(req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'client', 'index.html'));

});

router.get('/login' ,(req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'client', 'login.html'));

});

router.get('/register' ,(req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'client', 'register.html'));

});

router.get('/myCart', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'client', 'addToCart.html'));
  
});

router.get('/:id', (req, res) => {
  const response = req.body;
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'client', 'product.html'));

});

module.exports = router;