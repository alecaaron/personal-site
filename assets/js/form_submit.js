let form = new FormData();

let user = {//organize user & form data
  name: document.getElementById('name'),
  email: document.getElementById('email'),
  message: document.getElementById('message')
};

let submit_btn = document.getElementById('form-submit');

submit_btn.addEventListener('click', e => {
  e.preventDefault(); // prevent page submit

  for (data in user){// sanitize input
    form.append(data, user[data].value);
  };

  let init = { //settings for fetch()--POST request
    method: 'POST',
    body: new URLSearchParams(form),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  fetch('/sendMail', init)
  .then(x =>{
    //UI interactivity when data is sent
  });
});
