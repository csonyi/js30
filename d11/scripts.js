const player = document.querySelector('.player')

const video = player.querySelector('.viewer')

const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')

const playButton = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const fullscreenButton = player.querySelector('#fsBtn')

const sliders = player.querySelectorAll('.player__slider')

function togglePlay(e) {
    if(video.paused) video.play()
    else video.pause()
}

function updatePlayButton(e) {
    playButton.textContent = this.paused ? '►' : '❚❚'
}

function skip(e) {
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleSliderUpdate(e) {
    video[this.name] = this.value
}

function updateProgressBar(e) {
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
}

function handleScrub(e) {
    // if(!mouseDown) return
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = scrubTime
}

function toggleFullscreen(e) {
    if(document.fullscreenElement) {
        if (document.exitFullscreen) document.exitFullscreen();
    } else {
        player.requestFullscreen();
    }
    
video.addEventListener('click', togglePlay)
video.addEventListener('play', updatePlayButton)
video.addEventListener('pause', updatePlayButton)
video.addEventListener('timeupdate', updateProgressBar)

playButton.addEventListener('click', togglePlay)

skipButtons.forEach(btn => {
    btn.addEventListener('click', skip)
});


sliders.forEach(slider => {
    slider.addEventListener('change', handleSliderUpdate)
})

sliders.forEach(slider => {
    slider.addEventListener('mousemove', handleSliderUpdate)
})

let mouseDown = false
progress.addEventListener('mousedown', () => (mouseDown = true))
progress.addEventListener('mouseup', () => (mouseDown = false))

progress.addEventListener('click', handleScrub)
progress.addEventListener('mousemove', (e) => (mouseDown && handleScrub(e)))

fullscreenButton.addEventListener('click', toggleFullscreen)