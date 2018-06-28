const $nav = document.getElementById("nav-bar");
let scrollPos = window.pageYOffset

// simple controller object
const navBar = {
  hide: function(){
    $nav.style.top = "0";
    $nav.style.position = "fixed";
  },
  show: function(){
    $nav.style.top = `-${$nav.offsetHeight+2}px`;
  }
}

window.addEventListener("scroll", (e)=>{
  let currentScrollPos = window.pageYOffset;

  //fire script when parameters are met
  if(currentScrollPos > 75){
    if(scrollPos > currentScrollPos){
      navBar.hide();
    }
    else{
      navBar.show();
    }
  }
  else{
    $nav.style.position = "relative";
  }
  //reset scroll position
  scrollPos = currentScrollPos;

});
