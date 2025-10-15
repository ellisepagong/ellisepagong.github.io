console.log("script loaded");

// -- INITIAL STATES & GLOBAL VARIABLES 

var profSection = document.getElementById('professional-section');
var acadSection = document.getElementById('academic-section');

// get list of sections; go to home section at start
const sections = document.querySelectorAll('.section');
var currSection = 0;
sections.item(currSection).scrollIntoView();

// show professional section first
acadSection.classList.add('hidden');


// -- SCROLL BEHAVIOR (disabled when on mobile)
let throttleTimeout = null;
document.addEventListener('wheel', e => {
    if (!throttleTimeout) {
    throttleTimeout = setTimeout(function() {
        const dir = e.deltaY > 0 ? 'next' : 'prev';
        scroll(dir);
      throttleTimeout = null; 
    }, 200); // Execute at most every 0.5s
  }
});

// -- NAVIGATION BEHAVIOR
function scroll(i){
    if(i=='next'){
        currSection +=1;
        if(sections.item(currSection) == null){
            currSection = 4;
        }else{
            sections.item(currSection).scrollIntoView();
        }
    }else if(i=='prev'){
        currSection -=1;
        if(sections.item(currSection) == null){
            currSection = 0;
        }else{
            sections.item(currSection).scrollIntoView();
        }
    }
}


// -- EXPERIENCE SECTION BEHAVIOR
document.getElementById('professional-button').addEventListener("click", ()=>{
    if(profSection.classList.contains('hidden')){
        acadSection.classList.add('hidden')
        setTimeout(() => {
            profSection.classList.remove('hidden');
        }, 200); //
    }
});

document.getElementById('academic-button').addEventListener("click", ()=>{
    if(acadSection.classList.contains('hidden')){
        profSection.classList.add('hidden')
        setTimeout(() => {
            acadSection.classList.remove('hidden');
        }, 200); //
    }
});

