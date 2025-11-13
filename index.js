console.log("script loaded");

// -- INITIAL STATES & GLOBAL VARIABLES 

const buttons = document.querySelector('.navbar').getElementsByTagName('button');
var profSection = document.getElementById('professional-section');
var acadSection = document.getElementById('academic-section');

// get list of sections; set home section at start
const sections = document.querySelectorAll('.section');
var currSection = 0;
scroll(currSection);

// show professional section first
acadSection.classList.add('hidden');


// -- SCROLL BEHAVIOR (disabled when on mobile)
// let throttleTimeout = null;
// document.addEventListener('wheel', e => {
//     if (!throttleTimeout) {
//         const dir = e.deltaY > 0 ? 'next' : 'prev';
//         scroll(dir);
//         throttleTimeout = setTimeout(function() {
//             throttleTimeout = null; 
//         }, 500); // Execute at most every 0.5s
//   }
// });

// -- NAVIGATION BEHAVIOR
document.querySelector('.navbar').addEventListener("click", function (event) {
    for (let i in buttons){
        console.log(buttons[i]);
        if (event.target == buttons[i]) {
            scroll(i);
        }
    }
    
});

function scroll(i){
    if(i=='next'){
        currSection +=1;
        if(sections.item(currSection) == null){
            currSection = 4;
            return;
        }
    }else if(i=='prev'){
        currSection -=1;
        if(sections.item(currSection) == null){
            currSection = 0;
            return;
        }
    }
    else{
        currSection = i;
    }
    updateNavbar(currSection);
    sections.item(currSection).scrollIntoView();
}

function updateNavbar(section){
    for (let j =0; j<5; j++){
        var button = buttons[j]
        if(currSection == j){
            button.classList.add('active');
        }else{
            button.classList = '';
        }
    }
}


// -- EXPERIENCE SECTION BEHAVIOR

var profButton = document.getElementById('professional-button');
var acadButton = document.getElementById('academic-button');

profButton.addEventListener("click", ()=>{
    if(profSection.classList.contains('hidden')){
        acadSection.classList.add('hidden')
        setTimeout(() => {
            profSection.classList.remove('hidden');
            profButton.classList.add('active');
            acadButton.classList = '';
        }, 200); //
    }
});

acadButton.addEventListener("click", ()=>{
    if(acadSection.classList.contains('hidden')){
        profSection.classList.add('hidden')
        setTimeout(() => {
            acadSection.classList.remove('hidden');
            acadButton.classList.add('active');
            profButton.classList = '';
        }, 200); //
    }
});

