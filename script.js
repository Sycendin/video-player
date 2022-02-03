const player = document.querySelector(".player")
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.querySelector('#play-btn');
const volumeIcon = document.querySelector('#volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');
const speed = document.querySelector(".player-speed");

// Play & Pause ----------------------------------- //
const showPlayIcon = () =>{
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play')
}
const togglePlay = () =>{
    if(video.paused){
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'Pause')
    }
    else{
        video.pause();
        showPlayIcon();

    }
}
// On Video end, show play button icon
video.addEventListener('ended', showPlayIcon)

// Progress Bar ---------------------------------- //
// calculate display time format
const displayTime = (time) => {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`; 
}
//update progress bar as video plays
const updateProgress = () =>{
    // Get percent of video played through
    progressBar.style.width = `${(video.currentTime/video.duration) * 100}%`
    currentTime.textContent = `${displayTime(video.currentTime)} /`;
    duration.textContent = `${displayTime(video.duration)}`;
}

// Click to go to certain part of video
const setProgress= (e) =>{
    const newTime = e.offsetX / progressRange.offsetWidth
    progressBar.style.width = `${newTime * 100}%`
    // 20 sec video click 2 sec = 10% through video
    // multiply 0.1 (newtime) by duration of 20 seconds = 10% of video
    video.currentTime = newTime * video.duration
}
// Volume Controls --------------------------- //
let lastVolume = 1;
//Volume bar
const changeVolume = (e) =>{
    let volume = e.offsetX / volumeRange.offsetWidth;
    // Rounding volume up or down
    if (volume < 0.1){
        volume = 0
    }
    if (volume > 0.9){
        volume = 1;
    }
    volumeBar.style.width = `${volume * 100}%`
    video.volume = volume
    // Change icon
    volumeIcon.className ="";
    if (volume > 0.7){
        volumeIcon.classList.add('fas', 'fa-volume-up')
    }
    else if(volume < 0.7 && volume > 0) {
        volumeIcon.classList.add('fas', 'fa-volume-down')
    }
    else if (volume === 0) {
        volumeIcon.classList.add('fas', 'fa-volume-off')
    }
    lastVolume = volume;
}

//Mute/unmute

const toggleMute = () =>{
    volumeIcon.className = '';
    if (video.volume){
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        volumeIcon.classList.add('fas', 'fa-volume-mute');
        volumeIcon.setAttribute('title', 'Unmute');
        
    }
    else{
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`
        if (lastVolume > 0.7){
            volumeIcon.classList.add('fas', 'fa-volume-up');
        }
        else{
            volumeIcon.classList.add('fas', 'fa-volume-down');
        }
        
        volumeIcon.setAttribute('title', 'Mute');

    }
}
// Change Playback Speed -------------------- //

const changeSpeed = () =>{
    video.playbackRate = speed.value;
}

// Fullscreen ------------------------------- //
/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen');
}

  /* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen');
}
let fullscreen = false;
// Toggle fullscreen
const toggleFullscreen = () =>{
    !fullscreen ? openFullscreen(player) : closeFullscreen();
    fullscreen = !fullscreen;
}
//Event listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute)
speed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);