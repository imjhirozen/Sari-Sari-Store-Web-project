
export function createTableList (id, productName, price, img, alt, quantity = 1){
  // table body
  const tableBodyContainer = document.querySelector('#tbody-container');

  // table row
  const tableRow = document.createElement('tr');

  // table column 1
  const column1 = createTd('table-product-info');
  const productImage = createImage(img, alt);
  const createDivProductName = createDiv(null, productName);

  // table column 2
  const column2 = createTd('table-price');
  const productPrice = createDiv('product-price', price);

  // table column 3
  const column3 = createTd('table-action');
  const tableActionContainer = createDiv('table-action-container');
  const incrementBtn = createButton('increment', '+', 'btn btn-secondary btn-sm');
  const productQuantity = createDiv ('product-quantity', quantity);
  const decrementBtn = createButton('decrement', '-', 'btn btn-secondary btn-sm');

  // table column 4
  const column4 = createTd('table-total-price');
  const totalPriceQuantity = createDiv('total-price-quantity', price * quantity);

  //table column 5
  const column5 = createTd('table-close-container');
  const closeButton = createButton('close-button', null, 'btn-close bg-dark');

  tableBodyContainer.appendChild(tableRow);

  tableRow.appendChild(column1);
  column1.appendChild(productImage);
  column1.appendChild(createDivProductName);

  tableRow.appendChild(column2);
  column2.appendChild(productPrice);

  tableRow.appendChild(column3);
  column3.appendChild(tableActionContainer);
  tableActionContainer.appendChild(incrementBtn);
  tableActionContainer.appendChild(productQuantity);
  tableActionContainer.appendChild(decrementBtn);

  tableRow.appendChild(column4);
  column4.appendChild(totalPriceQuantity);

  tableRow.appendChild(column5);
  column5.appendChild(closeButton);

  closeButton.addEventListener('click', () => removeProductTable(tableRow, id, productName, quantity ));
  incrementBtn.addEventListener('click', () => incrementProduct( productQuantity, totalPriceQuantity, price ) );
  decrementBtn.addEventListener('click', () => decrementProduct( productQuantity, totalPriceQuantity, price ) );
  
}

function createTd (id){
  const createTD = document.createElement('td');
  createTD.id = id;
  
  return createTD;

}

function createDiv(id, value=null) {
  const createDiv = document.createElement('div');
  createDiv.id = id;
  createDiv.textContent = value;
  return createDiv;

}

function createImage(src, alt) {
  const createImage = document.createElement('img');
  createImage.src = src;
  createImage.alt = alt;

  return createImage;
}

function createButton(id, sysmbol, attribute){
  const createButton = document.createElement('button');
  createButton.setAttribute("type", "button");
  createButton.setAttribute("class", attribute);
  createButton.id = id;
  createButton.textContent = sysmbol;

  return createButton;

}

function removeProductTable(container, id, productName, quantity){
  removeFromDB(id, productName, quantity)
  container.remove();
  addTotalCost();
}

function removeFromDB (id, productName, quantity){
  fetch("/page/myCart", {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },  
    body: JSON.stringify(makeJsonFormat( id, productName, quantity ))
  })
  .then(res => res.json)
  .then(res => {
      if(res) window.alert('remove');
      else window.alert('failed');
  })
  .catch(error => {
    console.error(error);
  })

}

function makeJsonFormat( id, productName, quantity ){

  return {
    "id": id,
    "productName": productName,
    "quantity": quantity
  }

}

function incrementProduct ( container, totalCost, price ){
  const quantity = +container.innerText + 1;
  const total = +totalCost.innerText + price;

  container.innerText = quantity;
  totalCost.innerText = total;

  addTotalCost();
}

function decrementProduct ( container, totalCost, price ){
  const quantity = +container.innerText - 1;
  const total = +totalCost.innerText - price;

  if(quantity <= 1){
    container.innerText = 1;
    totalCost.innerText = price;
  }else {
    container.innerText = quantity;
    totalCost.innerText = total;
  }

  addTotalCost();
}



export function addTotalCost (){
  let item = document.querySelectorAll('#total-price-quantity');
  const subTotal = document.querySelector('#sub-total');
  const total = document.querySelector('#product-total-cost');

  let arr = [];

  item.forEach(items => {
    arr.push(+items.innerHTML);
  })

  const result = arr.reduce((prev, next) => {
    return prev + next;
  })

  subTotal.innerHTML = "₱ " + result + ".00";
  total.innerHTML = "₱ " + result + ".00";
}