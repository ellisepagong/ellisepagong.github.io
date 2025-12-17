// -- INITIAL STATES & GLOBAL VARIABLES 
var modal = document.getElementById('mobile-modal');
var content = document.getElementById("main-content");

// show notice, auto-hide after 5 seconds
setTimeout(() => {
    modal.style.opacity = '0';
    setTimeout(() =>{
        modal.classList.add('hidden'); 
    }, 400);
    content.classList.remove('hidden');
}, 5000); 

const buttons = document.querySelector('.navbar').getElementsByTagName('button');
var profSection = document.getElementById('professional-section');
var acadSection = document.getElementById('academic-section');

// get list of sections; set home section at start
const sections = document.querySelectorAll('.section');
var currSection = 0;

// show professional section first
acadSection.classList.add('hidden');


// -- SCROLL BEHAVIOR
// removed custom wheel-based paging to allow normal scrolling.
// added IntersectionObserver to update navbar active state when sections become visible.
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.6
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = Array.from(sections).indexOf(entry.target);
            if (index !== -1) {
                currSection = index;
                updateNavbar(currSection);
            }
        }
    });
}, observerOptions);

sections.forEach(s => sectionObserver.observe(s));

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
    currSection = Number(i);
    updateNavbar(currSection);
    if(currSection == 0){
        window.scrollTo({top: 0, behavior: 'smooth'
});
    }else{
        sections.item(currSection).scrollIntoView({ behavior: 'smooth' });
    }
}

function updateNavbar(section){
    for (let j = 0; j < buttons.length; j++){
        const button = buttons[j];
        if (!button) continue;
        if (section === j) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
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

// Floating Particles by Aneks on CodePen https://codepen.io/Aneks
// Modified particle sizes and colors
class Particle {
    parent;
    id;
    position = { x: 0, y: 0 };
    diameter = 0;
    life = 0;
    speed = { x: 0, y: 0 };
    init() {
        const interval = setInterval(() => {
            this.position.x += this.speed.x * 60 / 1000;
            this.position.y -= this.speed.y * 60 / 1000;
            this.life -= 1 / 60;
            if (this.life <= 0) {
                clearInterval(interval);
                this.parent.particles.delete(this.id);
            }
        }, 1000 / 60);
    }
    constructor(id, parent) {
        this.parent = parent;
        this.id = id;
        this.init();
    }
}
class ParticleSystem {
    canvas;
    size;
    lastId = 0;
    ammount = 0;
    particles = new Map();
    diameter = { min: 0, max: 0 };
    life = { min: 0, max: 0 };
    speed = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
    static getRandomNumberInInterval(invterval) {
        const min = Math.ceil(invterval.min);
        const max = Math.floor(invterval.max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    createParticle() {
        const particle = new Particle(this.lastId.toString(), this);
        particle.position.x = ParticleSystem.getRandomNumberInInterval({ min: 0, max: this.size.x });
        particle.position.y = ParticleSystem.getRandomNumberInInterval({ min: 0, max: this.size.y });
        particle.diameter = ParticleSystem.getRandomNumberInInterval(this.diameter);
        particle.life = ParticleSystem.getRandomNumberInInterval(this.life);
        particle.speed.x = ParticleSystem.getRandomNumberInInterval(this.speed.x);
        particle.speed.y = ParticleSystem.getRandomNumberInInterval(this.speed.y);
        this.particles.set(this.lastId.toString(), particle);
        this.lastId++;
    }
    init() {
        const ctx = this.canvas.getContext('2d');
        ctx.fillStyle = 'yellow';
        this.particles = new Map()
        for (let i = 0; i < this.ammount; i++)
            this.createParticle();
        setInterval(() => {
            if (this.particles.size <= this.ammount)
                this.createParticle();
        }, 1000 / 60);
        setInterval(() => {
            ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.particles.forEach((particle) => {
                ctx?.beginPath();
                ctx?.arc(particle.position.x, particle.position.y, particle.diameter / 2, 0, 2 * Math.PI, false);
                ctx?.closePath();
                ctx?.fill();
            });
        }, 1000 / 60);
    }
    constructor(canvas, size) {
        this.canvas = canvas;
        this.size = size;
        canvas.width = size.x;
        canvas.height = size.y;
    }
}

const canvas = document.getElementById('container')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const system = new ParticleSystem(canvas, { x: window.innerWidth, y: window.innerHeight })
system.ammount = 100
system.diameter = { min: 1, max: 2 }
system.life = { min: 15, max: 20 }
system.speed = { x: { min: -10, max: 10 }, y: { min: -10, max: 10 } }
system.init()

onresize = (event) => {
  system.size = { x: window.innerWidth, y: window.innerHeight }
  system.init()
};