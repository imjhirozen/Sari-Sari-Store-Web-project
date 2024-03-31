import { displayLoading, removeLoading } from '../loading/loading.js';

displayLoading();
setTimeout(()=>{
   removeLoading();
}, 2000);

const form = document.querySelector('form');

document.querySelector('#login').addEventListener('click', (event) => {
   event.preventDefault();
   location.href= '/login';
})

document.querySelector('form').addEventListener('submit', (event) => {
   event.preventDefault();
  
   const formData = new FormData(form);
   formData.append('id', generateRandomId());
   const payload = isPasswordSame(formData);
   
   if(payload == undefined) return;

   fetchDataToServer(payload);

});

function isPasswordSame (form){
  const res = Object.fromEntries(form);
  const payload = JSON.stringify(res);
  
  if(res.password != res.confirmPassword) {
    window.alert(`Password are not same`);
    return;
  }

  return payload;
}

function fetchDataToServer (payload){
   displayLoading();
   fetch('/register', {
         method: 'POST',
         body: payload,
         headers: {
            'Content-Type': 'application/json',
         }
   })
         .then(res => {
            if(!res.ok) throw new Error(`network response was not ok`);
            
            return res.json();
         })
         .then(res => {
            if(res){
               window.alert('Account Successfull Created');
               location.href= '/login';
            }else {
               window.alert('Username already Exist');

            }
         })
         .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
         }).finally(() => {
            removeLoading();
         });

}

function generateRandomId (){
   return Math.floor(Math.random() * 99999) + 10000;
}

