const Resume = {

  createChild: function(elem, class_arr, content){
    //create element
    let child = document.createElement(elem);

    //add an array for the classNames
    class_arr.forEach(x =>{
      child.className += x + " ";
    });

    //add content
    child.innerText = content;

    return child;
  },

  mFrag: function(block_title){
    // Keep code DRY. This serves as a quick
    // initialize for info-blocks
    let blockHeading = document.createElement("h2");
        blockHeading.className = "resume-block-heading";
        blockHeading.innerText = block_title;

    let frag = document.createDocumentFragment();
        frag.appendChild(blockHeading);

    return frag;
  },

  add: function(el, id){
    // When adding modules to the DOM, pakcaging everything
    // into a [section.resume-block] then append to #resume-wrapper


    let resume_block = document.createElement("section");
        resume_block.className = "resume-block";
        resume_block.id = "resume-section-"+id;
        resume_block.appendChild(el);

    document.getElementById('resume-body').appendChild(resume_block);
  },

  processInfo: function(obj){//takes an object and turns it into a module atom
    //use create the .resume-block-info atom
    let block_info = document.createElement("div");
        block_info.className = "resume-block-info";

    let hr = document.createElement('hr');
        hr.className = "divide--horizontal";

    // Take the given paramater object and
    // iterate over it to inject children
    // into the .resume-block-info atom
    for(let item in obj){
      block_info.appendChild(obj[item]);
      block_info.appendChild(hr);
    }
    //remember to store in variable to attached to DOM.
    //returns a .resume-block-info atom for the larger .resume-block
    return block_info;
  }
}; // End Resume Obj


//Begin script
// fetch data
let data = fetch('assets/js/resume.json').then(res =>{
  return res.json();
});


//Module for About pre-face
let about = data.then(x =>{
  return x.basics
}).then(basics =>{
  let frag = document.createDocumentFragment();

  let p = document.createElement("p")
      p.className = "resume-blurb";
      p.innerText = basics.summary;

  let blockHeading = document.createElement("h2")
      blockHeading.className = "resume-block-heading"
      blockHeading.innerText = "About";

  let hr = document.createElement('hr');
      hr.className = "divide--horizontal";

  frag.appendChild(blockHeading);
  frag.appendChild(p);
  frag.appendChild(hr);

Resume.add(frag, "about");
}).then(arr =>{

});


//Module for work eperience
let workExperience = data.then(x =>{
  return x.work;
}).then(Wrk =>{
  //collect all data in a single iteration into a block of info
  let info = {
    title: Resume.createChild('h3', ['resume-block-title'], Wrk[0].position),
    entity: Resume.createChild('span', ['highlight', 'resume-block-entity'], Wrk[0].company),
    //divider: Resume.createChild('hr', ['divide--vertical'], ""),
    year: Resume.createChild('span', ['resume-block-year'], Wrk[0].startDate),
    description: Resume.createChild('p', ['resume-block-description'], Wrk[0].summary)
  };
  return info;

}).then(info =>{
  //create a fragment to pre-hold everything
  let frag = Resume.mFrag("Work");
  let block_info = Resume.processInfo(info);
  frag.appendChild(block_info);
  Resume.add(frag, "wrk");
});


//Module for education
let school = data.then(x =>{
  return x.education;
}).then(Edu => {

  return info = {
      title: Resume.createChild("h3", ["resume-block-title"], Edu[0].studyType),
      entity: Resume.createChild("span", ["highlight", "resume-block-entity"], Edu[0].institution),
      //divider: Resume.createChild("hr", ["divide--vertical"], ""),
      year: Resume.createChild("span", ["resume-block-year"], Edu[0].endDate)
  };

}).then( info =>{
  let frag = Resume.mFrag("Education");
  let infoBlock = Resume.processInfo(info);
  frag.appendChild(infoBlock);
  Resume.add(frag, "edu");
});


//module for awards
let awards = data.then(x =>{
  return x.awards;
}).then(awards =>{

  return awards.map(x => {
    return {
      title: Resume.createChild("h3", ["resume-block-title"], x.title),
      entity: Resume.createChild("span", ["highlight", "resume-block-entity"], x.awarder),
      summary: Resume.createChild("p", ["resume-block-description"], x.summary)
    };
  });

}).then( awards_arr =>{

  let frag = Resume.mFrag("Awards");
  awards_arr.forEach(award =>{
    let infoBlock = Resume.processInfo(award);
    frag.appendChild(infoBlock);
  });
  Resume.add(frag, "awards");
});


//module for skills
let skillz = data.then(x =>{
  return (x.skills[0].keywords);
}).then(s =>{
  // since the data itself is just one long string
  // inside an array, we gotta do some dirty work (but not really);
  let str = s.toString();
  //from string, create DOM objects for injection
  const Skills_Arr =  s.toString().split(", ").map(s =>{
    let span = document.createElement("span");
        span.className = "tag";
        span.innerText = s;
    return span;
  });

  return Skills_Arr;

}).then(obj =>{
  let infoBlock = Resume.processInfo(obj);
  let frag = Resume.mFrag("Skills");
      frag.appendChild(infoBlock);
      frag.querySelector(".resume-block-info");
      frag.className += " tag-wrapper";
  Resume.add(frag, "skills");
});
