// constants
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const button = document.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

// functions

function play(){
    if(video.paused){
        video.play();
        button.innerText ='❚ ❚';
    }
    else{
        video.pause();
        button.innerText = '►';

    }
}

function skip(){
   video.currentTime += parseFloat(this.dataset.skip);
}

function handel(){
    video[this.name] =this.value;
}

function handelprogress(){
    const percent = (video.currentTime/video.duration)*100;
    progressBar.style.flexBasis =`${percent}%`;
}
function scrub(e){
    const time = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = time;
}

// event listeners

video.addEventListener('click',play);
button.addEventListener('click',play);
skipButtons.forEach(button =>{
    button.addEventListener('click',skip);
});
ranges.forEach(range =>range.addEventListener('change',handel));
ranges.forEach(range =>range.addEventListener('mousemove',handel));
video.addEventListener('timeupdate', handelprogress);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);