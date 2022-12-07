let control = false


function startGame(){

let canvas = document.getElementById('canvas');
let startScreen = document.getElementById('first-screen');
let gameNav = document.getElementById('game-nav');

canvas.classList.remove('d-none');
startScreen.classList.add('d-none');
gameNav.classList.remove('d-none')
}

function showControl(){

    let controlMenu = document.getElementById('controller-exp');

    if(control == false){
        controlMenu.classList.remove('d-none');
        control = true;
        return;

    }

    if(control == true){
        controlMenu.classList.add('d-none');
        control = false;
    }

}