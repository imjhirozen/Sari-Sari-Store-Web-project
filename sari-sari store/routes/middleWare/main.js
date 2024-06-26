const express = require('express');
const router = express.Router();
const { addToCart, saveUsersData, getUserInfoLogin, getUserId, addToMyFavorite, deleteToMyFavorite, getMyCarts, deleteToAddToCart } = require('../database/database');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const userLog = [];

router.post('/page/register', async (req, res) => {
    const dateNow = new Date();
    const data = req.body;
    const result = await getUserInfoLogin(data.username, data.password);

    if(result.length <= 0 || result[0].username !== data.username){
        saveUsersData(data.id, data.username, data.email, data.password, dateNow);
        res.send(true.toString());
    }
    else res.send(false.toString());

});

router.post('/page/login', async (req, res) => {
    const data = req.body;
    const result = await getUserInfoLogin(data.username, data.password);
    
    if(result.length <= 0) res.send(false.toString());
    else if(data.username == result[0].username && data.password == result[0].password){
        const userId = result[0].id
        userLog.push(userId);
        res.send({
            "status": true,
            "path": userId
        });
    }

});

router.post('/page/myCart', async (req, res) => {
    const getAllUserCarts = await getMyCarts(userLog[userLog.length -1]); // static user

    if(getAllUserCarts === 0) res.send(false.toString());
    else res.send(getAllUserCarts[0]);
})

router.delete("/page/myCart", (req, res) => {
    const data = req.body;
    const result = deleteToAddToCart(data.id, data.productName, data.quantity);
    
    if(result === 0) res.send(false.toString());
    
    res.send(true.toString());
})

router.post('/page/:id', async (req, res) => {
    const currentUrl = req.params.id;
    const parts = currentUrl.split(',');
    const checkValidUrl = await checkIfValidUrl(parts[parts.length -1]);
    const data = req.body;
    const userId = await getUserId(checkValidUrl);
    if(userId.length == 0){
        res.send(false.toString());
    }
    else if(data.favorite){
        addToMyFavorite( userId[0].id, data.productName, data.price, data.image );
        res.send(true.toString());
    }
    else {
        addToCart(userId[0].id, data.productName, data.price, data.quantity, data.image);
        res.send(true.toString());
    }
})

router.delete('/page/:id', (req, res) => {
    const data = req.body;

    const result = deleteToMyFavorite(data.id, data.productName, data.price);
    
    if(result === 0) res.send(false.toString());
    
    res.send(true.toString());
})

function checkIfValidUrl (id){

    const numericRegex = /^[0-9]+$/;

    if(numericRegex.test(id)) return id;

    return 404;
}



module.exports = router;
