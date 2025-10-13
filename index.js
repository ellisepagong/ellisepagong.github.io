console.log("script loaded");
var profSection = document.getElementById('professional-section');
var acadSection = document.getElementById('academic-section');

acadSection.classList.add('hidden');

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

