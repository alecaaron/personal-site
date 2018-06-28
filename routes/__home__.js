let app = require('express');

// handle data base querries to call projects and related data

//code here

// gather that data into array of objects.
// an object per project

// code here


// handle and export routes
module.exports = app.Router()

.get('/', (req, res)=>{

  //Gather data to be sent for projects
  res.render('index');

  // res.send("Hello");

});
