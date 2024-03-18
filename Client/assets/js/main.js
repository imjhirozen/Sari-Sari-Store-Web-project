
const jsonFilePath = {
  "cannedFood" : "assets/Product items/product_name/pantry Essentials/Canned_Food.json",
  "Juice" : "assets/Product Items/product_name/Drinks/Juices.json",
  "liqour" : "assets/Product Items/product_name/Drinks/Liqour.json"
}

// const jsonCannedData = "assets/Product items/product_name/pantry Essentials/Canned_Food.json";
let countProductDisplay = 0;

function createCard (productName, price, img, alt) {
  // parent container
  const productMainContainer = document.querySelector('#product-item-container');

  // 1: create a card
  // 2: create img element
  // 3: create card body element
  // 4: create a footer card element
  const newCardContainer = document.createElement('div');
  newCardContainer.classList.add('card');

  const image = document.createElement('img');
  image.src = img;
  image.alt = alt;

  // body
  const newCardBody = document.createElement('div');
  newCardBody.classList.add('card-body');

  const newProductName = document.createElement('h6');
  newProductName.textContent = productName;

  const newProductPrice = document.createElement('p');
  newProductPrice.textContent = '₱ ' + price + '.00';

  // footer
  const newCardFooter = document.createElement('div');
  newCardFooter.classList.add('card-actions');

  const favoriteIcon = document.createElement('i');
  favoriteIcon.classList.add('material-icons');
  favoriteIcon.textContent = "favorite";
  favoriteIcon.id = 'favorite-product-button';

  const addToCartBtn = document.createElement('button');
  addToCartBtn.textContent = "Add to cart";
  addToCartBtn.classList.add('add-to-cart-button');

  // main container
  productMainContainer.appendChild(newCardContainer);
  newCardContainer.appendChild(image);

  // body
  newCardContainer.appendChild(newCardBody);
  newCardBody.appendChild(newProductName);
  newCardBody.appendChild(newProductPrice);

  // footer
  newCardContainer.appendChild(newCardFooter);
  newCardFooter.appendChild(favoriteIcon);
  newCardFooter.appendChild(addToCartBtn);


  console.log(countProductDisplay);
}

function getDataFromJson (path){
  
  fetch(path)
  .then(res => {
    if(!res.ok) throw new Error(`No File Path Found`);
    return res.json();
  })
  .then(data => {
    countProductDisplay += data.length;
    for(let i = 0; i < data.length; i++){
      createCard(data[i].name, data[i].price, data[i].image, data[i].alternative);
    } 
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Fetch error:', error);
  });

}

document.querySelector('#SelectAll-button').addEventListener('click', () => {
  displayAllProduct();
  removeAllChildNodes();
})
  

function removeAllChildNodes (){
  const parentProductContainer = document.querySelector('#product-item-container');
  while (parentProductContainer.firstChild) {
    parentProductContainer.removeChild(parentProductContainer.firstChild);
  }

}

function displayAllProduct (){
  getDataFromJson(jsonFilePath.cannedFood);
  getDataFromJson(jsonFilePath.Juice);
  getDataFromJson(jsonFilePath.liqour);
}

