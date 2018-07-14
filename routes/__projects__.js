
const app = require('express');
const Butter = require('buttercms')('7a285b05684dcbcbe3f71307ec67d8c780f4afe0');

module.exports = app.Router()

.get('/', (req, res)=>{

  Butter.post.list({
    page: 1,
    page_size: 10
  })
  .then(resp =>{
    console.log(resp.data);
  })

});
