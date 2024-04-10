import { createTableList, addTotalCost } from './functions/createProduct.js';

fetch('/page/myCart', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
  
  })
  .then(res => {
    if(!res.ok) throw new Error('Network not was okay')
  
    return res.json();
  })
  .then(data => {
    loadTheCarts(data);
    addTotalCost();
  })
  .catch(error => {
    console.error(error);
  
  })


function loadTheCarts(item){
    for(let items of item){
        createTableList(items.id, items.product_name, items.product_price,  items.image_path, items.product_name, items.product_quantity);
    }
}