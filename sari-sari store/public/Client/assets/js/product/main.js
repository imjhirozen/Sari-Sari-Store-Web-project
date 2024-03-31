import { removeAllChildNodes, displayAllProduct, displayCannedFood, displayJuice, displayLiquor } from './functions/jsonPath.js';
import { selectAll, selectAllDrinks, selectAllPantry } from './functions/navOptions.js';
import { displayLoading, removeLoading } from '../loading/loading.js';
// defaul Display
displayLoading();
displayAllProduct();
setTimeout(() =>{
  removeLoading();
}, 2000);

selectAll.forEach(button => {
  button.addEventListener('click', () => {
    removeAllChildNodes();
    displayAllProduct();
  });
});

selectAllDrinks.forEach(button => {
  button.addEventListener('click', () => {
    removeAllChildNodes();
    displayJuice();
    displayLiquor();
  });
});

selectAllPantry.forEach(button => {
  button.addEventListener('click', () => {
    removeAllChildNodes();
    displayCannedFood();
  });
});





