const slider = document.querySelector('.slider')
const slide = document.querySelectorAll('.slide')
const next = document.querySelector('.next')
const prev = document.querySelector('.prev')

let direction; // 1 => slide précédent , -1 => slide suivant
let nbSlide = 7  
let translate = 100/nbSlide  //pourcentage de chaque slide pour le transform translate
let time = 5000
var intervalId  // Id de l'intervalle en cours
let slideActive = 0


function activeClass(){

    slide.forEach(element => {
        element.classList.remove("active")
    });

    let first = slider.firstElementChild  //1er élément du slider
    first.classList.add("active")
}

function carousel() {

    // Si un interval existe déjà on le supprime
    if (intervalId) {
        clearInterval(intervalId)
    }

    // Animation slider
    intervalId = setInterval(() => {
        // position par rapport a au slide selon si c'est la direction
        if(direction == 1){
            slider.style.transform = `translate(${translate}%)`

        } else{
            slider.style.transform = `translate(-${translate}%)`
        }
    }, time)
}

carousel()


next.addEventListener('click', function() {
    direction = -1
    slider.style.transform = `translate(-${translate}%)`

    carousel()
});

prev.addEventListener('click', function() {
    direction = 1;    
    slider.style.transform = `translate(${translate}%)`

    carousel()

});

//Si la transition du slider est fini 
slider.addEventListener('transitionend', function() {

    // On verifie la direction pour savoir si on ajoute le dernier slide en premiere position ou la premiere slide en derniere position
    if (direction === 1) {
        slider.prepend(slider.lastElementChild);
    } else {
        slider.appendChild(slider.firstElementChild);
    }
    // La direction redevient vers la droite
    direction = -1

    // 
    slider.style.transition = 'none';
    slider.style.transform = 'translate(0)';

    activeClass()
    
    setTimeout(() => {
        slider.style.transition = 'all 0.5s';
    })

}, false);
