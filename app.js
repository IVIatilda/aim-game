const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const minEl = document.querySelector('#min')
const secEl = document.querySelector('#sec')
const board = document.querySelector('#board')
const colors = ['#7c6cb7', '#b487be', '#deafd1', '#8dbdc1', '#fa5c17', '#ffd880', '#3caea3', '#ed543b']
let time = 0
let score = 0
let timer

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = +event.target.getAttribute('data-time')
        screens[1].classList.add('up')
        startGame()
    }
})

function startGame() {
    timer = setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        setTime(current)
    }
}

function setTime(value) {
    minEl.innerHTML = Math.trunc(value / 60).toString().padStart(2, '0')
    secEl.innerHTML = (value % 60).toString().padStart(2, '0')
}

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function finishGame() {
    board.innerHTML = `<h1>Счет: <span class"primary">${score}</span></h1>`
    timeEl.classList.add('hide')
    clearInterval(timer)
    const newGameBtn = document.createElement('a')
    newGameBtn.id = 'new-game'
    newGameBtn.innerHTML = 'Играть еще'
    board.append(newGameBtn)
    newGameBtn.addEventListener('click', newGame)
}

function newGame() {
    screens[1].classList.remove('up')
    board.innerHTML = ''
    score = 0
    timeEl.classList.remove('hide')
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 50)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    const color = getRandomColor()

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.left = `${x}px`
    circle.style.top = `${y}px`
    circle.style.background = color
    
    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}

function winTheGame() {
    function kill() {
        const circle = document.querySelector('.circle')
        if (circle) circle.click()
    }

    setInterval(kill, 42)
}