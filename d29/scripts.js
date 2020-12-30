let timerID

const controls = document.querySelector('.timer__controls')
    const buttons = controls.querySelectorAll('.timer__button')
    const minInput = controls.querySelector('[name="customForm"]')

const display = document.querySelector('.display')
    const timeLeft = display.querySelector('.display__time-left')
    const endTime = display.querySelector('.display__end-time')


function startTimer(e) {
    clearInterval(timerID)
    e.preventDefault()

    const time = (this.name != 'customForm')
        ? remainingTime = parseInt(this.dataset.time) * 1000
        : remainingTime = parseInt(this.children.minutes.value) * 1000 * 60
    
    timer(time)
}

function timer(time) {
    let remainingTime = time
    const end = Date.now() + remainingTime

    timeLeft.textContent = formatTime(remainingTime)
    endTime.textContent = `Be back at ${formatTime(end, true)}`
    timerID = setInterval(() => {
        if(remainingTime <= 0) {
            alert('Timer ended!')
            clearInterval(timer)
            timeLeft.textContent = ''
            endTime.textContent = ''
            return
        }

        remainingTime -= 1000
        timeLeft.textContent = formatTime(remainingTime)
    }, 1000)
}

function formatTime(time, hours = false) {
    const currentTime = new Date()
    currentTime.setTime(time)
    
    const firstPart = (hours) ? currentTime.getHours() : currentTime.getMinutes()
    const secondPart = (hours) ? currentTime.getMinutes() : currentTime.getSeconds()

    return `${firstPart}:${(secondPart < 10) ? 0 : ''}${secondPart}`
}

buttons.forEach(button => {
    button.addEventListener('click', startTimer)
})
minInput.addEventListener('submit', startTimer)
