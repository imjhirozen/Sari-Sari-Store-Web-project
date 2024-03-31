const express = require('express');
const router = express.Router();
const { addToCart, saveUsersData, getUserInfoLogin, getUserId } = require('../database/database');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const user = [];

router.post('/register', async (req, res) => {
    const dateNow = new Date();
    const data = req.body;
    const result = await getUserInfoLogin(data.username, data.password);

    if(result.length <= 0 || result[0].username !== data.username){
        saveUsersData(data.id, data.username, data.email, data.password, dateNow);
        res.send(true.toString());
    }
    else res.send(false.toString());

});

router.post('/login', async (req, res) => {
    const data = req.body;
    const result = await getUserInfoLogin(data.username, data.password);
    
    if(result.length <= 0) res.send(false.toString());
    else if(data.username == result[0].username && data.password == result[0].password){
        user.push(data.username);
        res.send(true.toString());
    }

});

router.post('/product', async (req, res) => {
    const data = req.body;
    const userId = await getUserId(user[0]);

    if(userId.length == 0){
        res.send(false.toString());
    }
    else {
        addToCart(userId[0].id, data.productName, data.price, data.quantity, data.image);
        res.send(true.toString());
    }
})




module.exports = router;
