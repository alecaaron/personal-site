let app = require('express');

// handle data base querries to call projects and related data

//code here

// gather that data into array of objects.
// an object per project

// // code here
// for(let i=1; i<8; i++){
//   if (i%3 == 0){
//     //add class for larger photos
//     // on every 3rd project
//   }
//   else{
//     //add class for squar photos
//   }
// }


// handle and export routes
module.exports = app.Router()

.get('/', (req, res)=>{

  //Gather data to be sent for projects
  res.render('index');

  // res.send("Hello");

});
