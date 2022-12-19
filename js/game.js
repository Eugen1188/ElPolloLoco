let canvas;
let world
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('My Character is', world.character);
    responsiveControl();

}

function responsiveControl() {
    goRight();
    goLeft();
    goJump();
    goThrow();
}


function goLeft() {
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
}

function goRight() {
    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
}

function goJump() {
    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.UP = true;
    });
    document.getElementById('btnJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.UP = false;
    });
}

function goThrow() {
    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}




window.addEventListener("keydown", (e) => {
    if (e.keyCode == '39') {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == '37') {
        keyboard.LEFT = true;
    }
    if (e.keyCode == '38') {
        keyboard.UP = true;
    }
    if (e.keyCode == '40') {
        keyboard.DOWN = true;
    }
    if (e.keyCode == '68') {
        keyboard.D = true;
    }

});

window.addEventListener("keyup", (e) => {
    if (e.keyCode == '39') {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == '37') {
        keyboard.LEFT = false;
    }
    if (e.keyCode == '38') {
        keyboard.UP = false;
    }
    if (e.keyCode == '40') {
        keyboard.DOWN = false;
    }
    if (e.keyCode == '68') {
        keyboard.D = false;
    }

});



