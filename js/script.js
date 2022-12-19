let control = false
let playMusic = true;
let gameStarted = false;
let gameMusic = new Audio('audio/el_pollo_loco.mp3')
let fullscreenMode = false;

function startGame() {

  let canvas = document.getElementById('canvas');
  let startScreen = document.getElementById('first-screen');
  let gameNav = document.getElementById('game-nav');
  canvas.classList.remove('d-none');
  startScreen.classList.add('d-none');
  gameNav.classList.remove('d-none');
  gameStarted = true;
  checkPlayMusic();
  showResponsiveBtn();
  if(fullscreenMode == true && gameStarted == true){
    showCanvasinFull();
  }

}

function showResponsiveBtn(){
  
  if (screen.height < 480 && gameStarted == true){
    let mobileControl = document.getElementById('mobile-cont');
    console.log(mobileControl);
    mobileControl.classList.remove('d-none');
  }
}

function checkPlayMusic() {
  setInterval(() => {
    if (playMusic == true) {
      gameMusic.play();
    }
  }, 1000);

}

function showControl() {
  let controlMenu = document.getElementById('controller-exp');
  if (control == false) {
    controlMenu.classList.remove('d-none');
    control = true;
    return;
  }
  if (control == true) {
    controlMenu.classList.add('d-none');
    control = false;
  }
}

function muteSound() {

  let mute = document.getElementById('mute');
  let unmute = document.getElementById('unmute');
  let muteInGame = document.getElementById('muteInGame');
  let unmuteInGame = document.getElementById('unmuteInGame');

  if (playMusic == true && gameStarted == true) {
    gameMusic.pause();
    playMusic = false;
    mute.classList.add('d-none');
    unmute.classList.remove('d-none');
    muteInGame.classList.add('d-none');
    unmuteInGame.classList.remove('d-none');
    return;
  }
  if (playMusic == false && gameStarted == true) {
    gameMusic.play();
    playMusic = true;
    mute.classList.remove('d-none');
    unmute.classList.add('d-none');
    muteInGame.classList.remove('d-none');
    unmuteInGame.classList.add('d-none');
  }


}

function setFullscreen() {
  let fullscreenCont = document.getElementById('canvas-cont');
  let canvas = document.getElementById('canvas');
  if (fullscreenMode == false && gameStarted == false) {
    enterFullscreen(fullscreenCont);
    showCanvasinFull();
    showNavinFull();
    fullscreenMode = true;
    return
  }else if(fullscreenMode == true && gameStarted == false){
    exitFullscreen(fullscreenCont);
    closeFullCanvas();
    closeFullNav();
    fullscreenMode = false;
  }else if(fullscreenMode == true && gameStarted == true){
    exitFullscreen(fullscreenCont);
    closeFullCanvas();
    closeFullNav();
    fullscreenMode = false;
  }else if(gameStarted == true && fullscreenMode == false){
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
  canvas.style.width = '720px';
  canvas.style.height = '480px';
  canvasCont.style.maxWidth = '720px';
  canvasCont.style.maxHeight = '480px';
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
  canvas.style.width = '100%';
  canvas.style.height = '100vh';
  canvasCont.style.maxWidth = 'none';
  canvasCont.style.maxHeight = 'none';
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