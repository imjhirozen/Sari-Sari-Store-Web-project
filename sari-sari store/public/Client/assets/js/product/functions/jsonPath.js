import { displayModalProduct } from './modal.js'


const jsonFilePath = {
  "cannedFood" : "assets/Product items/product_name/pantry Essentials/Canned_Food.json",
  "Juice" : "assets/Product Items/product_name/Drinks/Juices.json",
  "liqour" : "assets/Product Items/product_name/Drinks/Liqour.json"
}

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
  addToCartBtn.id = 'add-to-cart-button';
  addToCartBtn.setAttribute("type", "button");
  addToCartBtn.setAttribute("data-bs-toggle", "modal");
  addToCartBtn.setAttribute("data-bs-target", "#display-product")

  
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

  addToCartBtn.addEventListener('click', () => displayModalProduct(img, productName, alt, price));

  let checkIfFavClick = true;
  favoriteIcon.addEventListener('click', () => {
    if(checkIfFavClick){
      addToFavoritePage(favoriteIcon, newCardContainer, checkIfFavClick);
      checkIfFavClick = false;
    }
    else{
      addToFavoritePage(favoriteIcon, newCardContainer, checkIfFavClick);
      checkIfFavClick = true;
    }

  });
}


function addToFavoritePage (element, container, isClick){
  if(isClick) element.style.color = "red";
  else element.style.color = "black";
  
}

function getDataFromJson (path){
  
  fetch(path)
  .then(res => {
    if(!res.ok) throw new Error(`No File Path Found`);
    return res.json();
  })
  .then(data => {
    for(let i = 0; i < data.length; i++){
      createCard(data[i].name, data[i].price, data[i].image, data[i].alternative);
    } 
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Fetch error:', error);
  });

}



export function removeAllChildNodes (){
  const parentProductContainer = document.querySelector('#product-item-container');
  while (parentProductContainer.firstChild) {
    parentProductContainer.removeChild(parentProductContainer.firstChild);
  }

}


export function displayAllProduct (){
  getDataFromJson(jsonFilePath.cannedFood);
  getDataFromJson(jsonFilePath.Juice);
  getDataFromJson(jsonFilePath.liqour);
}

export function displayCannedFood (){
  getDataFromJson(jsonFilePath.cannedFood);
}

export function displayJuice (){
  getDataFromJson(jsonFilePath.Juice);
}

export function displayLiquor (){
  getDataFromJson(jsonFilePath.liqour);
}