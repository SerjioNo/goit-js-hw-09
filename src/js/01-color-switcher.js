
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let timerId = null;
stopBtn.disabled = true;

startBtn.addEventListener('click', colorChange);
stopBtn.addEventListener('click', stopColorChange);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

function colorChange() {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    timerId = setInterval(() => {
        const currentColor = getRandomHexColor();
        body.style.backgroundColor = currentColor;
    }, 1000);
}  

function stopColorChange() {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(timerId); 
}  