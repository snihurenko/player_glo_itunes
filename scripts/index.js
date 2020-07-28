import {videoPlayerInit} from './videoPlayer.js'
import {radioPlayerInit} from './radioPlayer.js'
import {musicPlayerInit} from './musicPlayer.js'

const playerBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');

const deactivationPlater = () => {
    temp.style.display = 'none';
    playerBtn.forEach(item => item.classList.remove('active'));
    playerBlock.forEach(item => item.classList.remove('active'));
};

playerBtn.forEach((btn, i) => {         //i - id in list of buttons
    btn.addEventListener('click', () => {
        deactivationPlater();
        btn.classList.add('active');
        playerBlock[i].classList.add('active')
    })
})




//console.log(playerBlock)