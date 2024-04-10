

export function createTableList (productName, price, img, alt, quantity = 1){
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