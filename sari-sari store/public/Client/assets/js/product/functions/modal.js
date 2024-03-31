
export let counterModalProduct = document.querySelector('#product-quantity');
let count = 1;

export function displayModalProduct (image, productName, productAlt, productPrice){
    const addModalImage = document.querySelector('#modal-image-container img');
    
    addModalImage.onerror = () => {
      addModalImage.src = 'assets/image/chicago.jpg';
    }

    addModalImage.src = image;
    addModalImage.alt = productAlt;

    const addModalProductName = document.querySelector('#modal-description-container h1');
    addModalProductName.textContent = productName;

    const addModalProductPrice = document.querySelector('#modal-description-container h4');
    addModalProductPrice.textContent = '₱ ' + productPrice + '.00';
    
}

document.querySelector('#modal-increment-product').addEventListener('click', () => {
  counterModalProduct.textContent = ++count;

});

document.querySelector('#modal-decrement-product').addEventListener('click', () => {
  counterModalProduct.textContent = count <= 1 ? count = 1 : --count;

});

document.querySelector('#modal-closeBtn').addEventListener('click', () => {
  count = 1;
  setTimeout(() => {
    counterModalProduct.textContent = count;
  }, 300);
});



// card
// add-to-cart-button
// favorite-product-button
document.querySelector('#modal-addToCartBtn').addEventListener('click', () => {
  SaveData();
  count = 1;
  counterModalProduct.textContent = count;
});

function getDataFromModal (){
  let getImage = document.querySelector('#modal-image-container img').getAttribute('src');
  let getProductName = document.querySelector('#modal-description-container h1').innerHTML;
  let getPrice = document.querySelector('#modal-description-container h4').innerHTML;
  let getQuantity = document.querySelector('#product-quantity').innerHTML;

  return {
    "productName" : getProductName,
    "price" : getPrice.substring(2),
    "quantity" : getQuantity,
    "image" : getImage
  }
}


function SaveData (){

   fetch('/product', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(getDataFromModal())
   })
   .then(res => {
      return res.json();

   })
  .then(res => {
      if (!res) 
         location.href = '/login';
      else
         window.alert(`Successful`);
   })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
   }); 

}


