
// let contactForm = {
//   data: new FormData(), // create new FormData object to submit data with
//
//   helmet: function(input){
//     //sanitize strings
//     return input
//   }
// };
let form = new FormData();

let user = {
  name: document.getElementById('name'),
  email: document.getElementById('email'),
  message: document.getElementById('message')
};



let submit_btn = document.getElementById('form-submit');

submit_btn.addEventListener('click', e => {
  e.preventDefault(); // take prevent page submit

  for (data in user){
    form.append(data, user[data].value);
  }

  let init = {
    method: 'POST',
    body: new URLSearchParams(form),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  fetch('/sendMail', init)
  .then(x =>{
    console.log(x);
  });
});
