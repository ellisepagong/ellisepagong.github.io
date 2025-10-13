console.log("script loaded");
var profSection = document.getElementById("professional-section");
var acadSection = document.getElementById("academic-section");

acadSection.classList.add("hide");

document.getElementById("professional-button").addEventListener("click", ()=>{
        profSection.classList.remove("hide");
        acadSection.classList.add("hide");

});

document.getElementById("academic-button").addEventListener("click", ()=>{
        profSection.classList.add("hide");
        acadSection.classList.remove("hide");
});



