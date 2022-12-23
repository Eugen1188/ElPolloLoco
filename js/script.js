let control = false
let playMusic = true;
let gameStarted = false;
let gameMusic = new Audio('audio/el_pollo_loco.mp3')
let fullscreenMode = false;

function startGame() {
  showGame();
  gameStarted = true;
  checkPlayMusic();
  showResponsiveBtn();
  if (fullscreenMode && gameStarted) {
    showCanvasinFull();
  }
}

function showGame() {
  let canvas = document.getElementById('canvas');
  let startScreen = document.getElementById('first-screen');
  let gameNav = document.getElementById('game-nav');
  canvas.classList.remove('d-none');
  startScreen.classList.add('d-none');
  gameNav.classList.remove('d-none'); // show the game nav menu with is outside the screen.
}

function showResponsiveBtn() {

  if (screen.height < 480 && gameStarted) {
    let mobileControl = document.getElementById('mobile-cont');
    mobileControl.classList.remove('d-none');
  }
}

function checkPlayMusic() {
  if (playMusic) {
    gameMusic.play();
  }
}

function showControl() {
  let controlMenu = document.getElementById('controller-exp');
  if (!control) {
    controlMenu.classList.remove('d-none');
    control = true;
  } else {
    controlMenu.classList.add('d-none');
    control = false;
  }
}

function muteSound() {

  let mute = document.getElementById('mute');
  let unmute = document.getElementById('unmute');
  let muteInGame = document.getElementById('muteInGame');
  let unmuteInGame = document.getElementById('unmuteInGame');

  if (playMusic) {
    gameMusic.pause();
    playMusic = false;
    muteIcon(mute, unmute, muteInGame, unmuteInGame);
  } else {
    if (gameStarted) {
      gameMusic.play();
    }
    playMusic = true;
    unmuteIcon(mute, unmute, muteInGame, unmuteInGame);
  }
}

function muteIcon(mute, unmute, muteInGame, unmuteInGame) {
  mute.classList.add('d-none');
  unmute.classList.remove('d-none');
  muteInGame.classList.add('d-none');
  unmuteInGame.classList.remove('d-none');
}

function unmuteIcon(mute, unmute, muteInGame, unmuteInGame) {
  mute.classList.remove('d-none');
  unmute.classList.add('d-none');
  muteInGame.classList.remove('d-none');
  unmuteInGame.classList.add('d-none');
}



function setFullscreen() {
  let fullscreenCont = document.getElementById('canvas-cont');
  let canvas = document.getElementById('canvas');
  if (!fullscreenMode && !gameStarted) {
    enterFullscreen(fullscreenCont);
    showCanvasinFull();
    showNavinFull();
    fullscreenMode = true;
  } else if (fullscreenMode && !gameStarted) {
    exitFullscreen(fullscreenCont);
    closeFullCanvas();
    closeFullNav();
    fullscreenMode = false;
  } else if (fullscreenMode && gameStarted) {
    exitFullscreen(fullscreenCont);
    closeFullCanvas();
    closeFullNav();
    fullscreenMode = false;
  } else {
    enterFullscreen(fullscreenCont);
    showCanvasinFull();
    showNavinFull();
    fullscreenMode = true;
  }
}

function closeFullCanvas() {
  let canvas = document.getElementById('canvas');
  let canvasCont = document.getElementById('canvas-cont');
  let headline = document.getElementById('headline');

  if (screen.height < 480) {
    canvasCont.style.maxWidth = '560px';
    canvasCont.style.maxHeight = '400px';
  }else{
    canvasCont.style.maxWidth = '720px';
    canvasCont.style.maxHeight = '480px';
  }
  canvas.style.height = '480px';

  headline.classList.remove('d-none');
}

function showNavinFull() {

  let gameNav = document.getElementById('game-nav');
  gameNav.style.position = 'absolute';
  gameNav.style.top = '10px';
  gameNav.style.left = '10px';
  gameNav.style.right = '10px';
}

function closeFullNav() {
  let gameNav = document.getElementById('game-nav');
  gameNav.style.position = 'unset';
  gameNav.style.top = 'unset';
  gameNav.style.left = 'unset';
  gameNav.style.right = 'unset';
}

function showCanvasinFull() {
  let canvas = document.getElementById('canvas');
  let canvasCont = document.getElementById('canvas-cont');
  let headline = document.getElementById('headline');

  canvasCont.style.maxWidth = 'none';
  canvasCont.style.maxHeight = 'none';
  canvas.style.width = '100%';
  canvas.style.height = '100vh';
  headline.classList.add('d-none');
}



function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {  // iOS Safari
    element.webkitRequestFullscreen();
  }
}


function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}