let express = require('express');
let fs = require('fs');

module.exports = express.Router().get('/', (req, res)=>{

  // fix rendering error where skill keywords return undefined
  function reformat_arr(arr){
    return arr.map(obj =>{ //take the given array and create a new one
      return {
        name: obj.name,
        keywords: obj.keywords.toString().split(", ") //turn keywords into array
      }
    });
  };

  fs.readFile('./assets/js/resume.json', (err, data)=>{ //grab resume.json
    let resume = JSON.parse(data);

    // carve what sections we need
    let about = resume.basics.summary;
    let work = resume.work[0];
    let edu = resume.education[0];
    let awards = resume.awards;
    let skills = reformat_arr(resume.skills);

    res.render('resume', {
      about: about,
      work: work,
      edu: edu,
      awards: awards,
      skills: skills
    });
  });//End file read

});
